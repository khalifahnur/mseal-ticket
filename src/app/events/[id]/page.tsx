import { EventDetail } from "@/components/EventDetail"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"


// Mock event data - in a real app, this would come from an API
const eventData = {
  id: 1,
  title: "Taylor Swift | The Eras Tour",
  artist: "Taylor Swift",
  date: "Saturday, March 15, 2025",
  time: "7:00 PM",
  doors: "6:00 PM",
  venue: "MetLife Stadium",
  address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
  image: "/ssp.jpg",
  description:
    "Experience the magic of Taylor Swift's record-breaking Eras Tour, featuring songs spanning her entire career from debut to Midnights.",
  ageRestriction: "All ages welcome",
  bagPolicy: "Small bags and purses allowed",
  parkingInfo: "Parking available on-site for $40",
  priceRange: "$89 - $450",
  categories: ["Pop", "Concert", "Stadium Tour"],
  ticketTypes: [
    {
      section: "General Admission",
      price: 89,
      available: 234,
      description: "Standing room only, first come first served",
    },
    {
      section: "Lower Bowl",
      price: 189,
      available: 45,
      description: "Seated sections 100-140",
    },
    {
      section: "Upper Bowl",
      price: 129,
      available: 156,
      description: "Seated sections 200-340",
    },
    {
      section: "VIP Package",
      price: 450,
      available: 12,
      description: "Premium seating + exclusive merchandise",
    },
  ],
}

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EventDetail event={eventData} />
      </main>
      <Footer />
    </div>
  )
}
