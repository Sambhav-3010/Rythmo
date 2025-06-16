"use client"

import { useState } from "react"
import { IoGrid, IoList } from "react-icons/io5"
import { Button } from "@/components/ui/button"

const playlists = [
  {
    id: "1",
    title: "Liked Songs",
    type: "Playlist",
    owner: "You",
    tracks: 123,
    lastPlayed: "2 days ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "2",
    title: "Discover Weekly",
    type: "Playlist",
    owner: "Spotify",
    tracks: 30,
    lastPlayed: "3 days ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "3",
    title: "Daily Mix 1",
    type: "Playlist",
    owner: "Spotify",
    tracks: 50,
    lastPlayed: "1 week ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "4",
    title: "Release Radar",
    type: "Playlist",
    owner: "Spotify",
    tracks: 30,
    lastPlayed: "2 weeks ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "5",
    title: "Top Songs 2023",
    type: "Playlist",
    owner: "Spotify",
    tracks: 100,
    lastPlayed: "1 month ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "6",
    title: "Chill Vibes",
    type: "Playlist",
    owner: "You",
    tracks: 45,
    lastPlayed: "3 days ago",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "7",
    title: "Workout Mix",
    type: "Playlist",
    owner: "You",
    tracks: 32,
    lastPlayed: "Yesterday",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "8",
    title: "Road Trip",
    type: "Playlist",
    owner: "You",
    tracks: 78,
    lastPlayed: "1 week ago",
    image: "/placeholder.svg?height=150&width=150",
  },
]

const albums = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    year: "2020",
    tracks: 14,
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "2",
    title: "Starboy",
    artist: "The Weeknd",
    year: "2016",
    tracks: 18,
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "3",
    title: "Dawn FM",
    artist: "The Weeknd",
    year: "2022",
    tracks: 16,
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "4",
    title: "Blonde",
    artist: "Frank Ocean",
    year: "2016",
    tracks: 17,
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "5",
    title: "Astroworld",
    artist: "Travis Scott",
    year: "2018",
    tracks: 17,
    image: "/placeholder.svg?height=150&width=150",
  },
]

export function LibraryContent() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 rounded-md"
          >
            <IoGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 rounded-md"
          >
            <IoList className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
