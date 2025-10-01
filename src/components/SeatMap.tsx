"use client"

import { useState } from "react"

interface SeatMapProps {
  onSectionSelect: (section: string) => void
}

export function SeatMap({ onSectionSelect }: SeatMapProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
    onSectionSelect(section)
  }

  return (
    <div className="relative bg-secondary/20 rounded-lg p-8 min-h-[400px]">
      {/* Stage */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded text-sm font-medium">
        STAGE
      </div>

      {/* Seating Sections */}
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Lower Bowl Sections */}
        <rect
          x="50"
          y="80"
          width="80"
          height="40"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "lower-left" ? "fill-accent" : "fill-secondary hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("lower-left")}
        />
        <text x="90" y="105" className="fill-foreground text-xs font-medium text-center" textAnchor="middle">
          Lower 100-120
        </text>

        <rect
          x="160"
          y="60"
          width="80"
          height="40"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "lower-center" ? "fill-accent" : "fill-secondary hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("lower-center")}
        />
        <text x="200" y="85" className="fill-foreground text-xs font-medium" textAnchor="middle">
          Lower 121-140
        </text>

        <rect
          x="270"
          y="80"
          width="80"
          height="40"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "lower-right" ? "fill-accent" : "fill-secondary hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("lower-right")}
        />
        <text x="310" y="105" className="fill-foreground text-xs font-medium" textAnchor="middle">
          Lower 141-160
        </text>

        {/* Upper Bowl Sections */}
        <rect
          x="30"
          y="160"
          width="100"
          height="30"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "upper-left" ? "fill-accent" : "fill-muted hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("upper-left")}
        />
        <text x="80" y="180" className="fill-foreground text-xs font-medium" textAnchor="middle">
          Upper 200-240
        </text>

        <rect
          x="150"
          y="140"
          width="100"
          height="30"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "upper-center" ? "fill-accent" : "fill-muted hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("upper-center")}
        />
        <text x="200" y="160" className="fill-foreground text-xs font-medium" textAnchor="middle">
          Upper 241-280
        </text>

        <rect
          x="270"
          y="160"
          width="100"
          height="30"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "upper-right" ? "fill-accent" : "fill-muted hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("upper-right")}
        />
        <text x="320" y="180" className="fill-foreground text-xs font-medium" textAnchor="middle">
          Upper 281-320
        </text>

        {/* General Admission */}
        <rect
          x="120"
          y="220"
          width="160"
          height="50"
          rx="4"
          className={`cursor-pointer transition-colors ${
            selectedSection === "ga" ? "fill-accent" : "fill-card hover:fill-accent/50"
          }`}
          onClick={() => handleSectionClick("ga")}
        />
        <text x="200" y="250" className="fill-foreground text-sm font-medium" textAnchor="middle">
          General Admission
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted rounded"></div>
          <span>Limited</span>
        </div>
      </div>
    </div>
  )
}
