"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { Player } from "./Player"

export function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Create fewer particles on mobile for performance
    const particleCount = window.innerWidth < 768 ? 10 : 20
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 15,
      color: Math.random() > 0.5 ? "primary" : "secondary",
    }))
    setParticles(newParticles)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-black relative overflow-hidden">
      {/* Animated background particles - hidden on mobile for performance */}
      {!isMobile &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className={`particle ${particle.color === "primary" ? "bg-primary/20" : "bg-secondary/20"}`}
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

      {/* Gradient overlays - responsive sizes */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl floating-animation"></div>
      <div
        className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-3xl floating-animation"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl floating-animation"
        style={{ animationDelay: "8s" }}
      ></div>

      <div className={`flex flex-1 overflow-hidden relative z-10 ${isMobile ? "top-20" : ""}`}>
        <Sidebar isMobile={isMobile} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 xl:p-10 relative">
          <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Player isMobile={isMobile} />
    </div>
  )
}
