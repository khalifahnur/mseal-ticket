import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featuredEvents = [
  {
    id: 1,
    title: "Taylor Swift | The Eras Tour",
    date: "Sat, Mar 15, 2025",
    time: "7:00 PM",
    venue: "MetLife Stadium",
    location: "East Rutherford, NJ",
    image: "/ssp.jpg ",
    price: "From $89",
    category: "Concert",
    popularity: "Hot",
  },
  {
    id: 2,
    title: "Lakers vs Warriors",
    date: "Thu, Mar 20, 2025",
    time: "8:00 PM",
    venue: "Crypto.com Arena",
    location: "Los Angeles, CA",
    image: "/ssp.jpg ",
    price: "From $125",
    category: "Sports",
    popularity: "Trending",
  },
  {
    id: 3,
    title: "Hamilton",
    date: "Fri, Mar 21, 2025",
    time: "8:00 PM",
    venue: "Richard Rodgers Theatre",
    location: "New York, NY",
    image: "/ssp.jpg",
    price: "From $79",
    category: "Theater",
    popularity: "Popular",
  },
  {
    id: 4,
    title: "Ed Sheeran World Tour",
    date: "Sun, Mar 23, 2025",
    time: "7:30 PM",
    venue: "Madison Square Garden",
    location: "New York, NY",
    image: "/ssp.jpg",
    price: "From $95",
    category: "Concert",
    popularity: "Hot",
  },
]

export function FeaturedEvents() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground text-lg">Don't miss these incredible experiences</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <Card
              key={event.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.popularity === "Hot"
                        ? "bg-red-500 text-white"
                        : event.popularity === "Trending"
                          ? "bg-orange-500 text-white"
                          : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {event.popularity}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-background/80 text-foreground">
                    {event.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">
                      {event.venue}, {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{event.price}</span>
                  <Button size="sm" asChild>
                    <Link href={`/events/${event.id}`}>Get Tickets</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
