"use client"

import { useState, useEffect, useMemo } from "react"
import { Sidebar } from "./Sidebar"
import { Player } from "./Player"

export function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const particles = useMemo(() => {
    if (typeof window === 'undefined') return []
    const particleCount = window.innerWidth < 768 ? 15 : 30
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      color: Math.random() > 0.5 ? "primary" : "secondary",
    }))
  }, [])

  return (
    <>
      <div className="flex h-screen flex-col bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl [animation:float_12s_ease-in-out_infinite] will-change-transform"></div>
        <div
          className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-3xl [animation:float_12s_ease-in-out_infinite] will-change-transform"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl [animation:float_12s_ease-in-out_infinite] will-change-transform"
          style={{ animationDelay: "8s" }}
        ></div>
        {!isMobile &&
          particles.map((p) => (
            <div
              key={p.id}
              className={`absolute top-0 left-0 rounded-full pointer-events-none will-change-[transform,opacity] [animation:rise_linear_infinite] ${
                p.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
              }`}
              style={{
                '--x': `${p.x}vw`,
                '--y-start': `${p.y}vh`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        <div className={`flex flex-1 overflow-hidden relative z-10 ${isMobile ? "top-20" : ""}`}>
          <Sidebar isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 xl:p-10 relative">
            <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
        <Player isMobile={isMobile} />
      </div>
    </>
  )
}