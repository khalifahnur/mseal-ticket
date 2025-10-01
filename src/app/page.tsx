import { EventCategories } from "@/components/EventCategories";
import { FeaturedEvents } from "@/components/FeaturedEvents";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/Hero";
import { TrustSignals } from "@/components/TrustSignal";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedEvents />
        {/* <EventCategories /> */}
        {/* <TrustSignals /> */}
      </main>
      <Footer />
    </div>
  )
}
