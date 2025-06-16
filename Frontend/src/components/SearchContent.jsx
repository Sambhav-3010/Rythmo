"use client"

import { useState } from "react"
import { IoSearch, IoPlay } from "react-icons/io5"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const genres = [
  { name: "Pop", color: "bg-pink-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Hip-Hop", color: "bg-orange-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Rock", color: "bg-red-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Electronic", color: "bg-purple-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "R&B", color: "bg-blue-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Indie", color: "bg-green-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Jazz", color: "bg-yellow-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Classical", color: "bg-teal-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Metal", color: "bg-gray-500", image: "/placeholder.svg?height=150&width=150" },
  { name: "Country", color: "bg-amber-500", image: "/placeholder.svg?height=150&width=150" },
]

const mockResults = {
  songs: [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "2",
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:35",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "3",
      title: "Starboy",
      artist: "The Weeknd",
      album: "Starboy",
      duration: "3:50",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "4",
      title: "Die For You",
      artist: "The Weeknd",
      album: "Starboy",
      duration: "4:20",
      image: "/placeholder.svg?height=50&width=50",
    },
  ],
  artists: [
    { id: "1", name: "The Weeknd", followers: "85.5M", image: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Drake", followers: "65.8M", image: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Ariana Grande", followers: "80.2M", image: "/placeholder.svg?height=100&width=100" },
  ],
  albums: [
    {
      id: "1",
      title: "After Hours",
      artist: "The Weeknd",
      year: "2020",
      image: "/placeholder.svg?height=150&width=150",
    },
    { id: "2", title: "Starboy", artist: "The Weeknd", year: "2016", image: "/placeholder.svg?height=150&width=150" },
    { id: "3", title: "Dawn FM", artist: "The Weeknd", year: "2022", image: "/placeholder.svg?height=150&width=150" },
  ],
  playlists: [
    {
      id: "1",
      title: "This Is The Weeknd",
      owner: "Spotify",
      tracks: "50 tracks",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "2",
      title: "The Weeknd Radio",
      owner: "Spotify",
      tracks: "50 tracks",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "3",
      title: "The Weeknd Essentials",
      owner: "Apple Music",
      tracks: "25 tracks",
      image: "/placeholder.svg?height=150&width=150",
    },
  ],
}

export function SearchContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>

      <form onSubmit={handleSearch} className="relative">
        <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="What do you want to listen to?"
          className="h-12 rounded-full bg-white pl-10 text-black dark:bg-spotifyLight dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {hasSearched ? (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Songs */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Songs</h2>
                <Button variant="link" className="text-gray-400 hover:text-white">
                  Show all
                </Button>
              </div>

              <div className="rounded-md bg-spotifyLight p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-spotifyLight text-left text-sm text-gray-400">
                      <th className="pb-3 pl-4">#</th>
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Album</th>
                      <th className="pb-3 text-right pr-4">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.songs.map((song, index) => (
                      <tr key={song.id} className="group hover:bg-spotifyLight/50">
                        <td className="py-2 pl-4 w-12">{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={song.image || "/placeholder.svg"}
                              alt={song.title}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">{song.title}</p>
                              <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-gray-400">{song.album}</td>
                        <td className="text-right text-gray-400 pr-4">{song.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Artists */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Artists</h2>
                <Button variant="link" className="text-gray-400 hover:text-white">
                  Show all
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {mockResults.artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="group relative bg-spotifyLight hover:bg-spotifyLight/80 border-none transition-all"
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <img
                          src={artist.image || "/placeholder.svg"}
                          alt={artist.name}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full bg-spotifyGreen text-black shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                        >
                          <IoPlay className="h-5 w-5 ml-0.5" />
                        </Button>
                      </div>
                      <h3 className="font-bold">{artist.name}</h3>
                      <p className="text-sm text-gray-400">Artist • {artist.followers} followers</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Albums */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Albums</h2>
                <Button variant="link" className="text-gray-400 hover:text-white">
                  Show all
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {mockResults.albums.map((album) => (
                  <Card
                    key={album.id}
                    className="group relative bg-spotifyLight hover:bg-spotifyLight/80 border-none transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={album.image || "/placeholder.svg"}
                          alt={album.title}
                          width={150}
                          height={150}
                          className="rounded-md"
                        />
                        <Button
                          size="icon"
                          className="absolute bottom-2 right-2 rounded-full bg-spotifyGreen text-black shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                        >
                          <IoPlay className="h-5 w-5 ml-0.5" />
                        </Button>
                      </div>
                      <h3 className="font-bold line-clamp-1">{album.title}</h3>
                      <p className="text-sm text-gray-400">
                        {album.year} • {album.artist}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="songs">
            <div className="rounded-md bg-spotifyLight p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-spotifyLight text-left text-sm text-gray-400">
                    <th className="pb-3 pl-4">#</th>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Album</th>
                    <th className="pb-3 text-right pr-4">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.songs.map((song, index) => (
                    <tr key={song.id} className="group hover:bg-spotifyLight/50">
                      <td className="py-2 pl-4 w-12">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.image || "/placeholder.svg"}
                            alt={song.title}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{song.title}</p>
                            <p className="text-sm text-gray-400">{song.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-400">{song.album}</td>
                      <td className="text-right text-gray-400 pr-4">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="artists">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {mockResults.artists.map((artist) => (
                <Card
                  key={artist.id}
                  className="group relative bg-spotifyLight hover:bg-spotifyLight/80 border-none transition-all"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-spotifyGreen text-black shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                      >
                        <IoPlay className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-bold">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist • {artist.followers} followers</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="albums">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {mockResults.albums.map((album) => (
                <Card
                  key={album.id}
                  className="group relative bg-spotifyLight hover:bg-spotifyLight/80 border-none transition-all"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={album.image || "/placeholder.svg"}
                        alt={album.title}
                        width={150}
                        height={150}
                        className="rounded-md"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 rounded-full bg-spotifyGreen text-black shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                      >
                        <IoPlay className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-bold line-clamp-1">{album.title}</h3>
                    <p className="text-sm text-gray-400">
                      {album.year} • {album.artist}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {mockResults.playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="group relative bg-spotifyLight hover:bg-spotifyLight/80 border-none transition-all"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={playlist.image || "/placeholder.svg"}
                        alt={playlist.title}
                        width={150}
                        height={150}
                        className="rounded-md"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 rounded-full bg-spotifyGreen text-black shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                      >
                        <IoPlay className="h-5 w-5 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-bold line-clamp-1">{playlist.title}</h3>
                    <p className="text-sm text-gray-400">
                      By {playlist.owner} • {playlist.tracks}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Browse all</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className={`group relative aspect-square overflow-hidden rounded-lg ${genre.color} transition-transform hover:scale-[1.02]`}
              >
                <div className="absolute inset-0 p-4">
                  <h3 className="text-2xl font-bold">{genre.name}</h3>
                </div>
                <div className="absolute -bottom-2 -right-2 h-24 w-24 rotate-[25deg]">
                  <img
                    src={genre.image || "/placeholder.svg"}
                    alt={genre.name}
                    width={150}
                    height={150}
                    className="rounded shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
