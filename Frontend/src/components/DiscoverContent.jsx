"use client"

import { useState } from "react"
import { IoSearch, IoFilter, IoPlay, IoTrendingUp, IoGlobe, IoMusicalNotes } from "react-icons/io5"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const genres = [
  {
    name: "Electronic",
    color: "from-purple-500 to-blue-500",
    tracks: "2.4M",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Hip-Hop",
    color: "from-orange-500 to-red-500",
    tracks: "1.8M",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Indie",
    color: "from-green-500 to-teal-500",
    tracks: "1.2M",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Jazz",
    color: "from-yellow-500 to-orange-500",
    tracks: "890K",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Classical",
    color: "from-indigo-500 to-purple-500",
    tracks: "650K",
    image: "/placeholder.svg?height=150&width=150",
  },
  { name: "Rock", color: "from-red-500 to-pink-500", tracks: "2.1M", image: "/placeholder.svg?height=150&width=150" },
  {
    name: "Ambient",
    color: "from-blue-500 to-cyan-500",
    tracks: "780K",
    image: "/placeholder.svg?height=150&width=150",
  },
  { name: "R&B", color: "from-pink-500 to-purple-500", tracks: "1.5M", image: "/placeholder.svg?height=150&width=150" },
]

const newReleases = [
  {
    id: "1",
    title: "Midnight Echoes",
    artist: "Nova Sound",
    album: "Digital Dreams",
    releaseDate: "2024-01-15",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    title: "Cosmic Journey",
    artist: "Space Waves",
    album: "Interstellar",
    releaseDate: "2024-01-12",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    title: "Urban Dreams",
    artist: "City Lights",
    album: "Neon Nights",
    releaseDate: "2024-01-10",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const trendingArtists = [
  {
    id: "1",
    name: "Luna Waves",
    followers: "2.4M",
    genre: "Electronic",
    image: "/placeholder.svg?height=120&width=120",
  },
  { id: "2", name: "Echo Chamber", followers: "1.8M", genre: "Indie", image: "/placeholder.svg?height=120&width=120" },
  {
    id: "3",
    name: "Neon Dreams",
    followers: "3.1M",
    genre: "Synthwave",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "4",
    name: "Cosmic Harmony",
    followers: "1.5M",
    genre: "Ambient",
    image: "/placeholder.svg?height=120&width=120",
  },
]

export function DiscoverContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover
          </h1>
          <p className="text-gray-400">Explore new music and trending artists</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-80vw">
        <IoSearch className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search for music, artists, or genres..."
          className="glass-card border-0 rounded-2xl pl-12 h-12 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="genres" className="space-y-6">
        <TabsList className="glass-card border-0 rounded-2xl p-1">
          <TabsTrigger value="genres" className="rounded-xl">
            Genres
          </TabsTrigger>
          <TabsTrigger value="new-releases" className="rounded-xl">
            New Releases
          </TabsTrigger>
          <TabsTrigger value="trending" className="rounded-xl">
            Trending
          </TabsTrigger>
          <TabsTrigger value="charts" className="rounded-xl">
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="genres" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoMusicalNotes className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Browse by Genre</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <Card
                key={genre.name}
                className="glass-card border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-all"
              >
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-br ${genre.color} relative flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl font-bold mb-1">{genre.name}</h3>
                      <p className="text-sm opacity-90">{genre.tracks} tracks</p>
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <IoPlay className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new-releases" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoTrendingUp className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">Fresh Releases</h2>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              New
            </Badge>
          </div>

          <div className="space-y-4">
            {newReleases.map((release, index) => (
              <Card key={release.id} className="glass-card border-0 hover:bg-white/10 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden">
                      <img
                        src={release.image || "/placeholder.svg"}
                        alt={release.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">{release.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{release.artist}</p>
                      <p className="text-xs text-gray-500">{release.album}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{release.releaseDate}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        New
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform"
                    >
                      <IoPlay className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoGlobe className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Trending Artists</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArtists.map((artist) => (
              <Card key={artist.id} className="glass-card border-0 group hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden neon-glow">
                      <img
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <IoPlay className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="font-bold mb-1">{artist.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{artist.followers} followers</p>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {artist.genre}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoTrendingUp className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Global Charts</h2>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Top 50 Global</h3>
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                  <div className="text-lg font-bold text-gray-400 w-8">{index + 1}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Track Name {index + 1}</h4>
                    <p className="text-sm text-gray-400">Artist Name</p>
                  </div>
                  <div className="text-sm text-gray-400">3:24</div>
                  <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl">
                    <IoPlay className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
