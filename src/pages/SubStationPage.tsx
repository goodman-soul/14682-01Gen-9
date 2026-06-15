import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { InfoSection } from "@/components/InfoSection";
import { ActivityList } from "@/components/ActivityList";
import { BookingBar } from "@/components/BookingBar";
import { PreviewPanel } from "@/components/PreviewPanel";
import { Footer } from "@/components/Footer";

export const SubStationPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <InfoSection />
        <ActivityList />
      </main>
      <Footer />
      <BookingBar />
      <PreviewPanel />
    </div>
  );
};
