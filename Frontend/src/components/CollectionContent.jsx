"use client"

import { useState } from "react"
import { IoHeart, IoAdd, IoPlay, IoGrid, IoList, IoEllipsisHorizontal } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const likedSongs = [
  {
    id: "1",
    title: "Stellar Voyage",
    artist: "Cosmic Dreams",
    album: "Space Odyssey",
    duration: "4:23",
    addedDate: "2 days ago",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    title: "Neon Pulse",
    artist: "Electric Nights",
    album: "City Lights",
    duration: "3:45",
    addedDate: "1 week ago",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    title: "Ocean Breeze",
    artist: "Calm Waters",
    album: "Serenity",
    duration: "5:12",
    addedDate: "2 weeks ago",
    image: "/placeholder.svg?height=50&width=50",
  },
]

const playlists = [
  {
    id: "1",
    title: "Midnight Sessions",
    description: "Perfect for late night coding",
    trackCount: 47,
    duration: "3h 24m",
    image: "/placeholder.svg?height=150&width=150",
    isPrivate: false,
  },
  {
    id: "2",
    title: "Workout Energy",
    description: "High-energy tracks for the gym",
    trackCount: 32,
    duration: "2h 15m",
    image: "/placeholder.svg?height=150&width=150",
    isPrivate: true,
  },
  {
    id: "3",
    title: "Chill Vibes",
    description: "Relaxing tunes for unwinding",
    trackCount: 28,
    duration: "1h 52m",
    image: "/placeholder.svg?height=150&width=150",
    isPrivate: false,
  },
  {
    id: "4",
    title: "Focus Flow",
    description: "Instrumental music for concentration",
    trackCount: 55,
    duration: "4h 8m",
    image: "/placeholder.svg?height=150&width=150",
    isPrivate: false,
  },
]

const recentlyPlayed = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "Synth Master",
    playedAt: "2 hours ago",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    title: "Urban Jungle",
    artist: "City Beats",
    playedAt: "Yesterday",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    title: "Cosmic Dance",
    artist: "Space Groove",
    playedAt: "2 days ago",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function CollectionContent() {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Your Collection
          </h1>
          <p className="text-gray-400">Your saved music and playlists</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className="glass-button rounded-xl"
            onClick={() => setViewMode("grid")}
          >
            <IoGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="glass-button rounded-xl"
            onClick={() => setViewMode("list")}
          >
            <IoList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="playlists" className="space-y-6">
        <TabsList className="glass-card border-0 rounded-2xl p-1">
          <TabsTrigger value="playlists" className="rounded-xl">
            Playlists
          </TabsTrigger>
          <TabsTrigger value="liked" className="rounded-xl">
            Liked Songs
          </TabsTrigger>
          <TabsTrigger value="recent" className="rounded-xl">
            Recently Played
          </TabsTrigger>
          <TabsTrigger value="albums" className="rounded-xl">
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IoHeart className="h-6 w-6 text-pink-400" />
              <h2 className="text-2xl font-bold">Your Playlists</h2>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl">
              <IoAdd className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="glass-card border-0 group hover:bg-white/10 transition-all cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <span className="text-xl font-bold">{playlist.trackCount}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <IoPlay className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold truncate">{playlist.title}</h3>
                        {playlist.isPrivate && (
                          <Badge variant="secondary" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{playlist.trackCount} tracks</span>
                        <span>{playlist.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {playlists.map((playlist) => (
                <Card key={playlist.id} className="glass-card border-0 hover:bg-white/10 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold">{playlist.trackCount}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold truncate">{playlist.title}</h3>
                          {playlist.isPrivate && (
                            <Badge variant="secondary" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{playlist.trackCount} tracks</span>
                          <span>{playlist.duration}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform"
                      >
                        <IoPlay className="h-5 w-5 ml-0.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="glass-button rounded-xl">
                        <IoEllipsisHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="liked" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoHeart className="h-6 w-6 text-pink-400" />
            <h2 className="text-2xl font-bold">Liked Songs</h2>
            <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">
              {likedSongs.length} songs
            </Badge>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="space-y-3">
              {likedSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="text-lg font-bold text-gray-400 w-8">{index + 1}</div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img
                      src={song.image || "/placeholder.svg"}
                      alt={song.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{song.title}</h4>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <div className="text-sm text-gray-400 hidden md:block">{song.album}</div>
                  <div className="text-sm text-gray-400 hidden sm:block">{song.addedDate}</div>
                  <div className="text-sm text-gray-400">{song.duration}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <IoPlay className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <IoEllipsisHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoPlay className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Recently Played</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyPlayed.map((track) => (
              <Card
                key={track.id}
                className="glass-card border-0 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden">
                      <img
                        src={track.image || "/placeholder.svg"}
                        alt={track.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">{track.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                      <p className="text-xs text-gray-500">{track.playedAt}</p>
                    </div>
                    <Button
                      size="icon"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <IoPlay className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoGrid className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">Saved Albums</h2>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoGrid className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No saved albums yet</h3>
            <p className="text-gray-400 mb-6">Start exploring and save your favorite albums</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl">
              Discover Albums
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
