import Link from "next/link"
import { Music, Trophy, Theater, Mic, Calendar, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Concerts",
    icon: Music,
    count: "2,847",
    href: "/concerts",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    name: "Sports",
    icon: Trophy,
    count: "1,523",
    href: "/sports",
    color: "bg-green-500/10 text-green-400",
  },
  {
    name: "Theater",
    icon: Theater,
    count: "892",
    href: "/theater",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    name: "Comedy",
    icon: Mic,
    count: "456",
    href: "/comedy",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    name: "Festivals",
    icon: Calendar,
    count: "234",
    href: "/festivals",
    color: "bg-pink-500/10 text-pink-400",
  },
  {
    name: "Family",
    icon: Star,
    count: "678",
    href: "/family",
    color: "bg-orange-500/10 text-orange-400",
  },
]

export function EventCategories() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find exactly what you&apos;re looking for with our organized event categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} events</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
