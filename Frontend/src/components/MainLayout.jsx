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

  return (
    <>
      <div className="flex h-screen flex-col bg-black relative overflow-hidden">
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