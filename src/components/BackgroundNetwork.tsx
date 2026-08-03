import { useEffect, useRef } from "react";

interface Node {
  hue: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  col: number;
  row: number;
  jx: number;
  jy: number;
  size: number;
  hub: boolean;
  ph: number;
  f: number;
  wobA: number;
  dis: number;
  charge: number;
}

interface Pulse {
  a: number;
  b: number;
  start: number;
  dur: number;
}

interface ShootPulse {
  active: boolean;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  start: number;
  dur: number;
  trail: number;
  bright: number;
  energy: number;
  head: number;
  trailW: number;
}

const TEAL_LIGHT = { r: 90, g: 199, b: 190 };
const TEAL = { r: 75, g: 175, b: 167 };
const TEAL_DEEP = { r: 61, g: 143, b: 139 };
const GOLD = { r: 207, g: 162, b: 79 };
const GOLD_SOFT = { r: 216, g: 177, b: 92 };
const HUES = [TEAL_LIGHT, TEAL, TEAL_DEEP, GOLD, GOLD_SOFT];
const PULSE_HEAD = { r: 190, g: 228, b: 222 };
const DEBUG = false;

const REST_DIST = 46;
const MOUSE_RADIUS = 250;
const MOUSE_PUSH = 0.06;
const SPRING_K = 0.0012;
const PAIR_ATTRACT = 0.0008;
const PAIR_REPEL = 0.0014;
const DAMPING = 0.93;
const MAX_SPEED = 1.4;
const TAU = Math.PI * 2;

export default function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let cols = 1;
    let rows = 1;
    let cellW = vw;
    let cellH = vh;
    let connectMax = 165;

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    const mouse = { x: -9999, y: -9999 };
    let mouseActive = false;
    let rafId = 0;
    let running = false;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = 0;
    let nextPulseAt = 0;
    let nextReorgAt = 0;
    let nextShotAt = 0;
    let shootCount = 0;
    const shootPool: ShootPulse[] = [];
    for (let i = 0; i < 3; i++) {
      shootPool.push({
        active: false,
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0,
        cx: 0,
        cy: 0,
        start: 0,
        dur: 6000,
        trail: 0.4,
        bright: 3,
        energy: 240,
        head: 9,
        trailW: 5,
      });
    }
    const headPt = { x: 0, y: 0 };
    const trailPts: { x: number; y: number }[] = [];
    for (let i = 0; i < 28; i++) trailPts.push({ x: 0, y: 0 });

    function pickCount() {
      const area = vw * vh;
      if (vw < 768) return Math.min(70, Math.max(50, Math.round(area / 9000)));
      if (vw < 1024) return Math.min(100, Math.max(80, Math.round(area / 14000)));
      return Math.min(160, Math.max(120, Math.round(area / 20000)));
    }

    function build() {
      const count = pickCount();
      cols = Math.max(1, Math.round(Math.sqrt((count * vw) / vh)));
      rows = Math.max(1, Math.ceil(count / cols));
      cellW = vw / cols;
      cellH = vh / rows;
      connectMax = Math.max(150, cellW * 1.7);

      nodes = [];
      for (let i = 0; i < count; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols) % rows;
        const hub = Math.random() < 0.08;
        nodes.push({
          hue: Math.random() < 0.75 ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 2),
          x: (c + 0.15 + Math.random() * 0.7) * cellW,
          y: (r + 0.15 + Math.random() * 0.7) * cellH,
          vx: 0,
          vy: 0,
          col: c,
          row: r,
          jx: 0.15 + Math.random() * 0.7,
          jy: 0.15 + Math.random() * 0.7,
          size: hub ? 4.6 + Math.random() * 0.8 : 2 + Math.random() * 1.0,
          hub,
          ph: Math.random() * TAU,
          f: 0.3 + Math.random() * 0.6,
          wobA: 6 + Math.random() * 12,
          dis: 0,
          charge: 0,
        });
      }

      pulses = [];
      nextPulseAt = performance.now() + 4000 + Math.random() * 4000;
      nextReorgAt = performance.now() + 11000 + Math.random() * 5000;
      for (const s of shootPool) s.active = false;
      nextShotAt = performance.now() + (DEBUG ? 2000 : 15000 + Math.random() * 25000);
    }

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) render(performance.now());
    }

    function reorganize(now: number) {
      for (const n of nodes) {
        if (Math.random() < 0.4) {
          n.jx = 0.15 + Math.random() * 0.7;
          n.jy = 0.15 + Math.random() * 0.7;
        }
      }
      pulses.length = 0;
      nextReorgAt = now + 11000 + Math.random() * 5000;
    }

    function getAvoidRect() {
      const els: (Element | null)[] = [document.getElementById("sidebar"), document.querySelector("main")];
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      let found = false;
      for (const el of els) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        x0 = Math.min(x0, r.left);
        y0 = Math.min(y0, r.top);
        x1 = Math.max(x1, r.right);
        y1 = Math.max(y1, r.bottom);
        found = true;
      }
      if (!found) return null;
      return { x0: x0 - 24, y0: y0 - 24, x1: x1 + 24, y1: y1 + 24 };
    }

    function spawnShoot(now: number) {
      const s = shootPool.find((p) => !p.active);
      if (!s) return;

      if (DEBUG) {
        const avoid = getAvoidRect();
        const insideContent = (px: number, py: number) =>
          avoid !== null && px > avoid.x0 && px < avoid.x1 && py > avoid.y0 && py < avoid.y1;
        let x0 = vw / 2;
        let y0 = vh / 2;
        let x1 = x0 + 300;
        let y1 = y0 + 300;
        let cx = (x0 + x1) / 2;
        let cy = (y0 + y1) / 2;
        const margin = 40;
        let placed = false;
        for (let attempt = 0; attempt < 40 && !placed; attempt++) {
          x0 = margin + Math.random() * (vw - margin * 2);
          y0 = margin + Math.random() * (vh - margin * 2);
          if (insideContent(x0, y0)) continue;
          const corner = Math.floor(Math.random() * 4);
          const ax = corner === 1 || corner === 3 ? 1 : -1;
          const ay = corner < 2 ? 1 : -1;
          const jitter = (Math.random() - 0.5) * 0.6;
          const dx = ax * Math.cos(jitter) - ay * Math.sin(jitter);
          const dy = ax * Math.sin(jitter) + ay * Math.cos(jitter);
          const distX = dx > 0 ? vw - x0 : x0;
          const distY = dy > 0 ? vh - y0 : y0;
          const maxTravel = Math.min(distX / Math.abs(dx), distY / Math.abs(dy));
          if (maxTravel < 300) continue;
          const dist = Math.min(300 + Math.random() * 300, maxTravel);
          x1 = x0 + dx * dist;
          y1 = y0 + dy * dist;
          if (insideContent(x1, y1)) continue;
          const curv = (Math.random() < 0.5 ? -1 : 1) * (0.08 + Math.random() * 0.15);
          cx = (x0 + x1) / 2 - dy * dist * curv;
          cy = (y0 + y1) / 2 + dx * dist * curv;
          placed = true;
        }
        s.x0 = x0;
        s.y0 = y0;
        s.x1 = x1;
        s.y1 = y1;
        s.cx = cx;
        s.cy = cy;
        s.start = now;
        s.dur = 6000;
        s.trail = 0.3 + Math.random() * 0.2;
        s.bright = 3;
        s.energy = 240;
        s.head = 8 + Math.random() * 2;
        s.trailW = 4 + Math.random() * 2;
        s.active = true;
        shootCount++;
        console.log(`Shooting Pulse Spawned — Pulse #${shootCount}`);
        return;
      }

      const edge = Math.floor(Math.random() * 4);
      let x0 = 0;
      let y0 = 0;
      let ang = 0;
      if (edge === 0) {
        x0 = Math.random() * vw;
        y0 = 0;
        ang = Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      } else if (edge === 1) {
        x0 = vw;
        y0 = Math.random() * vh;
        ang = Math.PI + (Math.random() - 0.5) * 1.2;
      } else if (edge === 2) {
        x0 = Math.random() * vw;
        y0 = vh;
        ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      } else {
        x0 = 0;
        y0 = Math.random() * vh;
        ang = (Math.random() - 0.5) * 1.2;
      }

      const dist = Math.hypot(vw, vh) * (0.25 + Math.pow(Math.random(), 1.4) * 0.75);
      const dirx = Math.cos(ang);
      const diry = Math.sin(ang);
      const mx = x0 + (dirx * dist) / 2;
      const my = y0 + (diry * dist) / 2;
      const curv = (Math.random() < 0.5 ? -1 : 1) * (0.15 + Math.random() * 0.3);

      s.x0 = x0;
      s.y0 = y0;
      s.x1 = x0 + dirx * dist;
      s.y1 = y0 + diry * dist;
      s.cx = mx - diry * dist * curv;
      s.cy = my + dirx * dist * curv;
      s.start = now;
      s.dur = 4000 + Math.random() * 1000;
      s.trail = 0.1 + Math.random() * 0.15;
      s.bright = 0.75 + Math.random() * 0.55;
      s.energy = 120 + Math.random() * 60;
      s.head = 4;
      s.trailW = 8;
      s.active = true;
    }

    function bezAt(u: number, out: { x: number; y: number }, s: ShootPulse) {
      const v = 1 - u;
      out.x = v * v * s.x0 + 2 * v * u * s.cx + u * u * s.x1;
      out.y = v * v * s.y0 + 2 * v * u * s.cy + u * u * s.y1;
    }

    function spawnPulse(now: number) {
      if (pulses.length >= 2 || nodes.length < 4) return;
      let attempts = 0;
      while (attempts < 20) {
        attempts++;
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b) continue;
        const d = Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y);
        if (d > connectMax || d < 24) continue;
        const dur = Math.max(1400, Math.min(2400, 900 + d * 6));
        pulses.push({ a, b, start: now, dur });
        return;
      }
    }

    function step(now: number, dt: number) {
      const t = now / 1000;
      const mdx = mouseActive ? mouse.x : -9999;
      const mdy = mouseActive ? mouse.y : -9999;

      for (const n of nodes) {
        let k = 0;
        const dxm = n.x - mdx;
        const dym = n.y - mdy;
        const dm2 = dxm * dxm + dym * dym;
        if (mouseActive && dm2 < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dm = Math.sqrt(dm2) || 0.001;
          k = 1 - dm / MOUSE_RADIUS;
          const push = MOUSE_PUSH * k * k;
          n.vx += (dxm / dm) * push * dt;
          n.vy += (dym / dm) * push * dt;
        }
        n.dis += (k - n.dis) * 0.25 * dt;

        const hx = (n.col + n.jx) * cellW;
        const hy = (n.row + n.jy) * cellH;
        const tx = hx + Math.sin(t * n.f + n.ph) * n.wobA;
        const ty = hy + Math.cos(t * n.f * 0.8 + n.ph * 1.3) * n.wobA;
        n.vx += (tx - n.x) * SPRING_K * dt;
        n.vy += (ty - n.y) * SPRING_K * dt;
      }

      const connect2 = connectMax * connectMax;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.dis > 0.02) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.dis > 0.02) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > connect2) continue;
          const d = Math.sqrt(d2) || 0.001;
          const ux = dx / d;
          const uy = dy / d;
          if (d < REST_DIST) {
            const f = (PAIR_REPEL * (REST_DIST - d)) / REST_DIST;
            a.vx -= ux * f * dt;
            a.vy -= uy * f * dt;
            b.vx += ux * f * dt;
            b.vy += uy * f * dt;
          } else {
            const f = PAIR_ATTRACT * (d - REST_DIST) * (1 - d / connectMax);
            a.vx += ux * f * dt;
            a.vy += uy * f * dt;
            b.vx -= ux * f * dt;
            b.vy -= uy * f * dt;
          }
        }
      }

      const damp = Math.pow(DAMPING, dt);
      for (const n of nodes) {
        n.vx *= damp;
        n.vy *= damp;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > MAX_SPEED) {
          n.vx *= MAX_SPEED / sp;
          n.vy *= MAX_SPEED / sp;
        }
        n.x += n.vx * dt;
        n.y += n.vy * dt;
      }

      if (now >= nextPulseAt) {
        spawnPulse(now);
        nextPulseAt = now + 5000 + Math.random() * 4000;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        if ((now - p.start) / p.dur >= 1) pulses.splice(i, 1);
      }

      if (DEBUG) {
        if (now >= nextShotAt) {
          spawnShoot(now);
          nextShotAt = now + 2000;
        }
      } else {
        const anyActive = shootPool.some((p) => p.active);
        if (!anyActive && now >= nextShotAt) {
          spawnShoot(now);
          nextShotAt = now + 15000 + Math.random() * 25000;
        }
      }

      for (const s of shootPool) {
        if (!s.active) continue;
        const u = (now - s.start) / s.dur;
        if (u >= 1) {
          s.active = false;
          if (DEBUG) console.log("Shooting Pulse Destroyed");
          continue;
        }
        const env = Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, u))), 0.8) * s.bright;
        if (env > 0.01) {
          bezAt(Math.min(1, Math.max(0, u)), headPt, s);
          const er = s.energy;
          for (const n of nodes) {
            const dx = n.x - headPt.x;
            const dy = n.y - headPt.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < er * er) {
              const fall = 1 - Math.sqrt(d2) / er;
              const v = env * fall;
              if (v > n.charge) n.charge = v;
            }
          }
        }
      }

      const decay = Math.pow(0.5, dt / 260);
      for (const n of nodes) n.charge *= decay;
    }

    function render(now: number) {
      ctx.clearRect(0, 0, vw, vh);
      const t = now / 1000;

      const glows = [
        { r: 75, g: 175, b: 167, rx: 0.24, ry: 0.3, s: 0.5, a: 0.035 },
        { r: 61, g: 143, b: 139, rx: 0.78, ry: 0.66, s: 0.42, a: 0.028 },
        { r: 216, g: 177, b: 92, rx: 0.52, ry: 0.12, s: 0.56, a: 0.02 },
        { r: 90, g: 199, b: 190, rx: 0.34, ry: 0.88, s: 0.45, a: 0.022 },
      ];
      for (let i = 0; i < glows.length; i++) {
        const g = glows[i];
        const gx = g.rx * vw;
        const gy = g.ry * vh;
        const radius = g.s * Math.max(vw, vh);
        const pulseA = g.a * (0.75 + 0.25 * Math.sin(t * 0.3 + i * 1.7));
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        grad.addColorStop(0, `rgba(${g.r},${g.g},${g.b},${pulseA})`);
        grad.addColorStop(1, `rgba(${g.r},${g.g},${g.b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(gx - radius, gy - radius, radius * 2, radius * 2);
      }

      const connect2 = connectMax * connectMax;
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > connect2) continue;
          const d = Math.sqrt(d2) || 0.001;
          const fade = 1 - d / connectMax;
          const breathe = 0.85 + 0.15 * Math.sin(t * 0.5 + (i + j));
          const dis = Math.max(a.dis, b.dis);
          const glow = (a.charge + b.charge) / 2;
          const alpha = Math.min(0.16, (0.028 + 0.05 * fade) * breathe * (1 - 0.8 * dis) + glow * 0.1);
          if (alpha < 0.006) continue;
          ctx.lineWidth = 0.5 + glow * 1.0;
          const gold = ((a.hue >= 3 ? 1 : 0) + (b.hue >= 3 ? 1 : 0)) / 2;
          const r = Math.round(TEAL.r + (GOLD_SOFT.r - TEAL.r) * gold);
          const g = Math.round(TEAL.g + (GOLD_SOFT.g - TEAL.g) * gold);
          const bl = Math.round(TEAL.b + (GOLD_SOFT.b - TEAL.b) * gold);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const c = HUES[n.hue];
        const ch = n.charge;
        if (ch > 0.04) {
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.04 + ch * 0.12})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * (2.2 + ch * 1.6), 0, TAU);
          ctx.fill();
        }
        if (n.hub) {
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.04)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * 1.9, 0, TAU);
          ctx.fill();
        }
        if (n.dis > 0.15) {
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.05 + n.dis * 0.07})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * 2.2, 0, TAU);
          ctx.fill();
        }
        const alpha = Math.min(0.8, 0.34 + n.dis * 0.3 + ch * 0.3);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size / 2, 0, TAU);
        ctx.fill();
      }

      drawShoot(now);

      if (DEBUG) {
        const activeN = shootPool.reduce((acc, s) => acc + (s.active ? 1 : 0), 0);
        ctx.fillStyle = "rgba(125,255,242,0.95)";
        ctx.font = "12px 'JetBrains Mono', monospace";
        ctx.textBaseline = "top";
        ctx.fillText(`Pulse #${shootCount} | active: ${activeN}`, 16, 28);
      }

      for (const p of pulses) {
        const prog = (now - p.start) / p.dur;
        if (prog >= 1) continue;
        const a = nodes[p.a];
        const b = nodes[p.b];
        const eased = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2;
        const gx = a.x + (b.x - a.x) * eased;
        const gy = a.y + (b.y - a.y) * eased;
        ctx.strokeStyle = `rgba(${TEAL.r},${TEAL.g},${TEAL.b},0.45)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(gx, gy);
        ctx.stroke();
        ctx.lineWidth = 0.7;
        ctx.fillStyle = `rgba(${TEAL.r},${TEAL.g},${TEAL.b},0.1)`;
        ctx.beginPath();
        ctx.arc(gx, gy, 6, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(${TEAL.r},${TEAL.g},${TEAL.b},0.3)`;
        ctx.beginPath();
        ctx.arc(gx, gy, 3, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(${PULSE_HEAD.r},${PULSE_HEAD.g},${PULSE_HEAD.b},0.9)`;
        ctx.beginPath();
        ctx.arc(gx, gy, 1.3, 0, TAU);
        ctx.fill();
      }
    }

    function drawShoot(now: number) {
      for (const s of shootPool) {
        if (!s.active) continue;
        const u = (now - s.start) / s.dur;
        if (u <= 0 || u >= 1) continue;
        const env = Math.pow(Math.sin(Math.PI * u), 0.8) * s.bright;
        if (env <= 0.02) continue;

        const tailU = Math.max(0, u - s.trail);
        const N = trailPts.length;
        for (let i = 0; i < N; i++) {
          const fr = i / (N - 1);
          bezAt(tailU + (u - tailU) * fr, trailPts[i], s);
        }

        ctx.lineCap = "round";
        for (let i = 1; i < N; i++) {
          const a = trailPts[i - 1];
          const b = trailPts[i];
          const fr = i / (N - 1);
          const al = Math.min(1, env * Math.pow(fr, 1.6) * 0.5);
          if (al < 0.004) continue;
          ctx.strokeStyle = `rgba(${TEAL.r},${TEAL.g},${TEAL.b},${al})`;
          ctx.lineWidth = s.trailW * (0.3 + 0.7 * fr);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        for (let i = 1; i < N; i++) {
          const a = trailPts[i - 1];
          const b = trailPts[i];
          const fr = i / (N - 1);
          const al = Math.min(1, env * Math.pow(fr, 1.6) * 0.9);
          if (al < 0.004) continue;
          ctx.strokeStyle = `rgba(${PULSE_HEAD.r},${PULSE_HEAD.g},${PULSE_HEAD.b},${al})`;
          ctx.lineWidth = s.trailW * 0.4 * (0.3 + 0.7 * fr);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        const hx = trailPts[N - 1].x;
        const hy = trailPts[N - 1].y;
        const gRad = DEBUG ? 40 : 9 + env * 2;
        ctx.fillStyle = `rgba(${TEAL.r},${TEAL.g},${TEAL.b},${Math.min(1, env * 0.22)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, gRad, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(${PULSE_HEAD.r},${PULSE_HEAD.g},${PULSE_HEAD.b},${Math.min(1, env * 0.75)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, s.head, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, env * 0.95)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, s.head * 0.45, 0, TAU);
        ctx.fill();

        if (DEBUG) {
          ctx.fillStyle = "rgba(255,70,70,0.95)";
          ctx.beginPath();
          ctx.arc(s.x0, s.y0, 5, 0, TAU);
          ctx.fill();
          ctx.fillStyle = "rgba(255,225,90,0.95)";
          ctx.beginPath();
          ctx.arc(s.x1, s.y1, 5, 0, TAU);
          ctx.fill();
        }
      }
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(2.2, (now - last) / 16.666 || 1);
      last = now;
      step(now, dt);
      render(now);
      if (now >= nextReorgAt) reorganize(now);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (!reduced && !running) {
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onPointerMove(e: PointerEvent) {
      mouseActive = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onPointerLeave() {
      mouseActive = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onReducedChange(e: MediaQueryListEvent) {
      reduced = e.matches;
      if (reduced) {
        stop();
        render(performance.now());
      } else {
        start();
      }
    }

    resize();
    if (reduced) render(performance.now());
    else start();

    if (DEBUG) {
      console.log(
        "BackgroundNetwork canvas:", canvas.width, "x", canvas.height,
        "| viewport:", window.innerWidth, "x", window.innerHeight
      );
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", onReducedChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      mql.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.8,
      }}
    />
  );
}
