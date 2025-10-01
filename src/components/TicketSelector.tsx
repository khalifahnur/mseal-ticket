"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TicketType {
  section: string
  price: number
  available: number
  description: string
}

interface TicketSelectorProps {
  ticketTypes: TicketType[]
  onSelectionChange: (selections: Array<{ section: string; quantity: number; price: number }>) => void
}

export function TicketSelector({ ticketTypes, onSelectionChange }: TicketSelectorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const updateQuantity = (section: string, change: number) => {
    const currentQty = quantities[section] || 0
    const newQty = Math.max(0, Math.min(8, currentQty + change)) // Max 8 tickets per section

    const newQuantities = { ...quantities, [section]: newQty }
    if (newQty === 0) {
      delete newQuantities[section]
    }

    setQuantities(newQuantities)

    // Convert to array format for parent component
    const selections = Object.entries(newQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([section, quantity]) => {
        const ticketType = ticketTypes.find((t) => t.section === section)!
        return { section, quantity, price: ticketType.price }
      })

    onSelectionChange(selections)
  }

  return (
    <div className="space-y-4">
      {ticketTypes.map((ticket) => {
        const quantity = quantities[ticket.section] || 0
        const isLowStock = ticket.available < 20

        return (
          <Card key={ticket.section} className="border-border bg-secondary/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium">{ticket.section}</h4>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold">${ticket.price}</span>
                    {isLowStock && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                        Only {ticket.available} left
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(ticket.section, -1)}
                    disabled={quantity === 0}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center font-medium">{quantity}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(ticket.section, 1)}
                    disabled={quantity >= 8 || quantity >= ticket.available}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {quantity > 0 && (
                <div className="text-sm text-muted-foreground">Subtotal: ${(quantity * ticket.price).toFixed(2)}</div>
              )}
            </CardContent>
          </Card>
        )
      })}

      <div className="text-xs text-muted-foreground">Maximum 8 tickets per section. All prices include fees.</div>
    </div>
  )
}
