import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#121212] font-sans selection:bg-[#ffdb6e]/20 selection:text-white text-[#fafafa] flex justify-center items-start p-4 sm:p-6 md:p-10 lg:p-16">
      
      {/* Premium Dashboard Layout Container */}
      <div className="w-full max-w-[1250px] flex flex-col lg:flex-row gap-6 lg:gap-[30px] lg:items-start">
        
        {/* Left Sidebar Card */}
        <Sidebar />

        {/* Right Main Content Panel Card */}
        <main className="flex-1 min-w-0">
          <MainContent />
        </main>

      </div>

    </div>
  );
}
