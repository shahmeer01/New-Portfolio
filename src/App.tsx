import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent, { type Tab } from "./components/MainContent";
import WIOSCaseStudy from "./components/WIOSCaseStudy";
import ProofCaseStudy from "./components/ProofCaseStudy";
import LawmateCaseStudy from "./components/LawmateCaseStudy";
import VectorLabsCaseStudy from "./components/VectorLabsCaseStudy";
import MiniAuraCaseStudy from "./components/MiniAuraCaseStudy";

type Route =
  | { page: "wios" }
  | { page: "proof" }
  | { page: "lawmate" }
  | { page: "vectorlabs" }
  | { page: "miniaura" }
  | { page: "home"; tab: Tab };

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/portfolio/wios") return { page: "wios" };
  if (path === "/portfolio/proof") return { page: "proof" };
  if (path === "/portfolio/law-mate") return { page: "lawmate" };
  if (path === "/portfolio/vector-labs") return { page: "vectorlabs" };
  if (path === "/portfolio/mini-aura") return { page: "miniaura" };
  const hash = window.location.hash.replace(/^#/, "");
  const tab: Tab = hash === "portfolio" || hash === "resume" || hash === "contact" ? hash : "about";
  return { page: "home", tab };
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => getRoute());

  useEffect(() => {
    const onRouteChange = () => setRoute(getRoute());
    window.addEventListener("popstate", onRouteChange);
    return () => window.removeEventListener("popstate", onRouteChange);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans selection:bg-[#ffdb6e]/20 selection:text-white text-[#fafafa] flex justify-center items-start p-4 sm:p-6 md:p-10 lg:p-16 relative isolate z-[1]">

      {/* Premium Dashboard Layout Container */}
      <div className="relative z-10 w-full max-w-[1250px] flex flex-col lg:flex-row gap-6 lg:gap-[30px] lg:items-start">
        
        {/* Left Sidebar Card */}
        <Sidebar />

        {/* Right Main Content Panel Card */}
        <main className="flex-1 min-w-0">
          {route.page === "wios" ? (
            <WIOSCaseStudy />
          ) : route.page === "proof" ? (
            <ProofCaseStudy />
          ) : route.page === "lawmate" ? (
            <LawmateCaseStudy />
          ) : route.page === "vectorlabs" ? (
            <VectorLabsCaseStudy />
          ) : route.page === "miniaura" ? (
            <MiniAuraCaseStudy />
          ) : (
            <MainContent initialTab={route.tab} />
          )}
        </main>

      </div>

    </div>
  );
}
