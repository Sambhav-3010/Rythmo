"use client"

import { createContext, useContext, useState } from "react"

const PlayerContext = createContext(undefined)

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState({
    id: "1",
    title: "Cosmic Dreams",
    artist: "Luna Waves",
    album: "Stellar Journey",
    albumCover: "/placeholder.svg?height=64&width=64",
    duration: 240,
    url: "#",
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState([])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const addToQueue = (track) => {
    setQueue([...queue, track])
  }

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentTrack(queue[0])
      setQueue(queue.slice(1))
    }
  }

  const playPrevious = () => {
    console.log("Play previous")
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        setCurrentTrack,
        togglePlayPause,
        addToQueue,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
