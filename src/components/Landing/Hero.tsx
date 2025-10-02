"use client"

import { useState } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TypewriterText from "./TypeWriterTxt"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ssp.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />


      <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-md bg-gradient-to-t from-background/10 to-transparent" />


      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <TypewriterText />

          {/* Search Form */}
          <div className="bg-card border border-border rounded-lg p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  placeholder="Artist, team, or event"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="City or venue"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="date" className="pl-10 bg-background border-border" />
              </div>
            </div>
            <Button size="lg" className="w-full md:w-auto px-8">
              <Search className="h-4 w-4 mr-2" />
              Search Events
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              100% Authentic Tickets
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              Instant Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
