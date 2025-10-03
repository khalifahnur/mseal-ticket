"use client";

import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Event } from "@/types/ticket"
import { fetchTickets } from "@/lib/api"
import Image from "next/image";

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

const getEventPopularity = (availableTickets: number, totalTickets: number) => {
  const percentage = (availableTickets / totalTickets) * 100;
  if (percentage < 20) return "Hot";
  if (percentage < 50) return "Trending";
  return "Popular";
};

export function FeaturedEvents() {
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Events</h2>
              <p className="text-muted-foreground text-lg">Loading events...</p>
            </div>
            <Button variant="outline" className="hidden md:flex bg-transparent" disabled>
              View All Events
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="border-border bg-card animate-pulse">
                <div className="w-full h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-8 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground text-lg mb-4">Failed to load events</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no events
  if (!events || events.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground text-lg mb-4">No events available at the moment</p>
            <Button variant="outline" asChild>
              <Link href="/events">Browse All Events</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const featuredEvents = events.slice(0, 4); 

  return (
    <section className="py-16 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground text-lg">Don&apos;t miss these incredible experiences</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/">View All Events</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => {
            const popularity = getEventPopularity(event.availableTickets, event.totalTickets);
            const category = "Sports";
            const eventTitle = `${event.homeTeam} vs ${event.awayTeam}`;
            const price = `From Ksh ${event.ticketPrice.toLocaleString()}`;

            return (
              <Card
                key={event._id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={'/tikiti.jpeg'}
                    alt={eventTitle}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={250}
                    height={350}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        popularity === "Hot"
                          ? "bg-red-500 text-white"
                          : popularity === "Trending"
                            ? "bg-orange-500 text-white"
                            : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {popularity}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-background/80 text-foreground">
                      {category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {eventTitle}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(event.date)} • {formatTime(event.time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{price}</span>
                    <Button size="sm" asChild>
                      <Link href={`/events/${event._id}`}>Get Tickets</Link>
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {event.availableTickets} of {event.totalTickets} tickets available
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}