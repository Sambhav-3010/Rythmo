"use client"

import { useState } from "react"
import { IoPlay, IoStar } from "react-icons/io5"
import { Card, CardContent } from "@/components/ui/card"

export function ArtistDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Artist Dashboard</h1>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-primary/20">
            <IoStar className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Artist Name</h2>
            <p className="text-gray-400">1.2M monthly listeners</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-border pb-2">
        <button
          className={`px-4 py-2 ${activeTab === "overview" ? "border-b-2 border-primary -mb-[9px]" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "analytics" ? "border-b-2 border-primary -mb-[9px]" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "tracks" ? "border-b-2 border-primary -mb-[9px]" : ""}`}
          onClick={() => setActiveTab("tracks")}
        >
          Tracks
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="glass-card border-primary/30">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="text-2xl font-bold">57.8K</div>
            <p className="text-gray-400">Total Plays This Month</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-primary/30">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="text-2xl font-bold">4.2K</div>
            <p className="text-gray-400">New Listeners</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-primary/30">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="text-2xl font-bold">$215.42</div>
            <p className="text-gray-400">Earnings This Month</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8">Top Tracks</h2>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {i}
              </div>
              <div>
                <div className="font-medium">Track Name {i}</div>
                <div className="text-sm text-gray-400">Album Name</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-gray-400 text-sm">45,321 plays</div>
              <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <IoPlay className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
