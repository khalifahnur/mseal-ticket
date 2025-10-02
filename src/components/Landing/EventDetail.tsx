"use client";

import { Calendar, MapPin, Clock, Users, Shield, Info} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/ticket";
import Image from "next/image";

interface EventDetailProps {
  event: Event;
  onCheckout: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (timeString: string) => {
  if (timeString.includes(':')) {
    return timeString;
  }
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const defaultEventDetails = {
  bagPolicy: "Small bags and purses allowed. Large bags and backpacks are subject to search.",
  parkingInfo: "Parking available at the venue. Pre-booking recommended for guaranteed spots.",
  ageRestriction: "All ages welcome",
  description: "Don't miss this exciting match between two top teams. Experience the thrill of live sports action!",
  doors: "1 hour before match"
};

export default function EventDetails({ 
  event, 
  onCheckout 
}: EventDetailProps) {
  const serviceFee = event.ticketPrice * 0.1;
  const ticketPrice = event.ticketPrice;
  const totalPrice = ticketPrice + serviceFee;


  const categories = ["Sports", "Football", "KPL"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative">
            <Image
              src={'/tikiti.jpeg'}
              alt={"tickets img"}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              width={800}
              height={400}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-white/20 text-white">
                    {category}
                  </Badge>
                ))}
                <Badge variant="secondary" className="bg-green-500 text-white">
                  {event.availableTickets} Tickets Left
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
                {event.homeTeam} vs {event.awayTeam}
              </h1>
              <p className="text-lg opacity-90">Sportpesa League</p>
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Match Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{formatDate(event.date)}</p>
                    <p className="text-sm text-muted-foreground">Kickoff at {formatTime(event.time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">Gates open {defaultEventDetails.doors}</p>
                    <p className="text-sm text-muted-foreground">Arrive early for best experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">{defaultEventDetails.ageRestriction}</p>
                    <p className="text-sm text-muted-foreground">Age requirements</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground">{defaultEventDetails.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Home Team:</span> {event.homeTeam}
                  </div>
                  <div>
                    <span className="font-medium">Away Team:</span> {event.awayTeam}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="font-medium mb-1">Bag Policy</h4>
                  <p className="text-sm text-muted-foreground">{defaultEventDetails.bagPolicy}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Parking</h4>
                  <p className="text-sm text-muted-foreground">{defaultEventDetails.parkingInfo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Checkout */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Get Your Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">General Admission</span>
                  <span className="font-medium">Ksh {ticketPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>Ksh {serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Ksh {totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">All fees included</p>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={onCheckout}
                disabled={event.availableTickets === 0}
              >
                {event.availableTickets === 0 ? "Sold Out" : "Buy Tickets Now"}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Secure SSL Checkout
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}