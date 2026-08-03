import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";

dotenv.config({
  path: ".env.local",
});
console.log("API Loaded:", !!process.env.RESEND_API_KEY);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "shahmeertalib5960@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

function validateContact(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter your full name.";
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length < 2 || subject.length > 200) {
    errors.subject = "Please enter a subject.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Please enter your message.";
  }

  return { errors, values: { name, email, subject, message } };
}

app.post("/api/contact", contactRateLimiter, async (req, res) => {
  try {
    const { errors, values } = validateContact(req.body || {});

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    if (!resend) {
      return res.status(500).json({ success: false, message: "Contact service is not configured." });
    }

    const submittedAt = new Date();
    const formattedDate = submittedAt.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "short",
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: values.email,
      subject: `New Portfolio Message — ${values.subject}`,
      text: [
        `You received a new message from your portfolio contact form.`,
        ``,
        `Full Name: ${values.name}`,
        `Email Address: ${values.email}`,
        `Subject: ${values.subject}`,
        ``,
        `Message:`,
        values.message,
        ``,
        `Submission Date & Time: ${formattedDate}`,
      ].join("\n"),
    });

 /*   await resend.emails.send({
  from: FROM_EMAIL,
  to: [values.email],
  subject: "Thanks for reaching me out",
  html: `
    <h2>Thank you for contacting me!</h2>

    <p>Hi ${values.name},</p>

    <p>I have received your message successfully.</p>

    <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>

    <br>

    <p>Best Regards,</p>
    <p><strong>Muhammad Shahmeer Talib</strong></p>
  `,
});*/


    if (error) {
      console.error("Resend send error:", error);
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact endpoint error:", err);
    return res.status(500).json({ success: false });
  }
});

const distDir = path.join(__dirname, "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distDir, "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
