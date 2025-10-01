"use client"

import { useState } from "react"
import { Calendar, MapPin, Clock, Users, Shield, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SeatMap } from "./SeatMap"
import { TicketSelector } from "./TicketSelector"

interface EventDetailProps {
  event: {
    id: number
    title: string
    artist: string
    date: string
    time: string
    doors: string
    venue: string
    address: string
    image: string
    description: string
    ageRestriction: string
    bagPolicy: string
    parkingInfo: string
    priceRange: string
    categories: string[]
    ticketTypes: Array<{
      section: string
      price: number
      available: number
      description: string
    }>
  }
}

export function EventDetail({ event }: EventDetailProps) {
  const [selectedTickets, setSelectedTickets] = useState<Array<{ section: string; quantity: number; price: number }>>(
    [],
  )
  const [showSeatMap, setShowSeatMap] = useState(false)

  const totalPrice = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Header */}
          <div className="relative">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-white/20 text-white">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{event.title}</h1>
              <p className="text-lg opacity-90">{event.artist}</p>
            </div>
          </div>

          {/* Event Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Event Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-muted-foreground">Show starts at {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">Doors open {event.doors}</p>
                    <p className="text-sm text-muted-foreground">Arrive early for best experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{event.ageRestriction}</p>
                    <p className="text-sm text-muted-foreground">Age requirements</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="font-medium mb-1">Bag Policy</h4>
                  <p className="text-sm text-muted-foreground">{event.bagPolicy}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Parking</h4>
                  <p className="text-sm text-muted-foreground">{event.parkingInfo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seat Map */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Interactive Seat Map</CardTitle>
              <p className="text-muted-foreground">Click on sections to see available seats and pricing</p>
            </CardHeader>
            <CardContent>
              <SeatMap onSectionSelect={(section) => console.log("Selected section:", section)} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Range */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Tickets from</p>
                <p className="text-3xl font-bold text-accent">{event.priceRange.split(" - ")[0]}</p>
                <p className="text-sm text-muted-foreground">All fees included</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                100% Authentic Guarantee
              </div>
            </CardContent>
          </Card>

          {/* Ticket Selection */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Select Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <TicketSelector ticketTypes={event.ticketTypes} onSelectionChange={setSelectedTickets} />
            </CardContent>
          </Card>

          {/* Checkout Summary */}
          {selectedTickets.length > 0 && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{ticket.section}</p>
                      <p className="text-sm text-muted-foreground">Qty: {ticket.quantity}</p>
                    </div>
                    <p className="font-medium">${(ticket.quantity * ticket.price).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">All fees included</p>
                </div>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Secure SSL Checkout
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Customer Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="font-medium">4.8</span>
                <span className="text-muted-foreground">(2,847 reviews)</span>
              </div>
              <div className="space-y-3">
                <div className="border-l-2 border-accent pl-3">
                  <p className="text-sm">"Amazing show! Seats were exactly as described."</p>
                  <p className="text-xs text-muted-foreground mt-1">- Sarah M.</p>
                </div>
                <div className="border-l-2 border-accent pl-3">
                  <p className="text-sm">"Easy purchase, instant delivery. Highly recommend!"</p>
                  <p className="text-xs text-muted-foreground mt-1">- Mike R.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
