import { Shield, CreditCard, Smartphone, Headphones, Award, Users } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Authentic Tickets",
    description: "Every ticket is verified and guaranteed authentic or your money back",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Bank-level security with SSL encryption and fraud protection",
  },
  {
    icon: Smartphone,
    title: "Instant Mobile Delivery",
    description: "Get your tickets instantly via email or mobile app",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Expert support team available around the clock to help you",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you 110% back",
  },
  {
    icon: Users,
    title: "Trusted by Millions",
    description: "Over 50 million tickets sold to happy customers worldwide",
  },
]

export function TrustSignals() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose TicketHub?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing you with the safest, most reliable ticket buying experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Partner Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading venues and partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="h-8 w-24 bg-muted rounded"></div>
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-28 bg-muted rounded"></div>
            <div className="h-8 w-22 bg-muted rounded"></div>
            <div className="h-8 w-26 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
