import { FeaturedEvents } from "@/components/Landing/FeaturedEvents";
import { Footer } from "@/components/Landing/Footer";
import { Header } from "@/components/Landing/Header";
// import { HeroSection } from "@/components/Landing/Hero";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* <HeroSection /> */}
        <FeaturedEvents />
        {/* <EventCategories /> */}
        {/* <TrustSignals /> */}
      </main>
      <Footer />
    </div>
  )
}
