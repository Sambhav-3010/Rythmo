"use client"

import { useState } from "react"
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeat,
  IoShuffle,
  IoVolumeHigh,
  IoVolumeMute,
  IoHeart,
  IoHeartOutline,
  IoShare,
  IoEllipsisHorizontal,
  IoHeadset,
  IoChevronUp,
} from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayer } from "@/components/PlayerProvider"
import { cn } from "@/lib/utils"

export function Player({ isMobile }) {
  const { currentTrack, isPlaying, togglePlayPause } = usePlayer()
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(30)
  const [isLiked, setIsLiked] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleVolumeChange = (value) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (isMobile) {
    return (
      <div className="glass-player relative">
        {/* Mobile compact player */}
        <div className="h-20 flex items-center justify-between px-4 relative z-10">
          {/* Now playing info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentTrack ? (
              <>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden neon-glow">
                    <img
                      src={currentTrack.albumCover || "/placeholder.svg?height=48&width=48"}
                      alt={currentTrack.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-bold truncate">{currentTrack.title}</span>
                  <span className="text-xs text-gray-400 truncate">{currentTrack.artist}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <IoHeadset className="text-xl text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">No track</span>
                  <span className="text-xs text-gray-400">Select music</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn("glass-button rounded-xl w-8 h-8", isLiked && "text-red-500")}
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? <IoHeart className="text-sm" /> : <IoHeartOutline className="text-sm" />}
            </Button>
            <Button
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-2xl cosmic-gradient hover:scale-110 transition-all duration-300 shadow-lg"
            >
              {isPlaying ? (
                <IoPause className="text-lg text-black" />
              ) : (
                <IoPlay className="text-lg text-black ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-button rounded-xl w-8 h-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <IoChevronUp className={cn("text-sm transition-transform", isExpanded && "rotate-180")} />
            </Button>
          </div>
        </div>

        {/* Progress bar for mobile */}
        <div className="px-4 pb-2">
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={(value) => setProgress(value[0])}
            className="w-full h-1"
          />
        </div>

        {/* Expanded mobile controls */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4 border-t border-primary/20">
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="ghost" size="icon" className="glass-button rounded-xl w-10 h-10">
                <IoShuffle className="text-lg" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-button rounded-xl w-10 h-10">
                <IoPlaySkipBack className="text-lg" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-button rounded-xl w-10 h-10">
                <IoPlaySkipForward className="text-lg" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-button rounded-xl w-10 h-10">
                <IoRepeat className="text-lg" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="glass-button rounded-xl w-8 h-8" onClick={toggleMute}>
                {isMuted || volume === 0 ? <IoVolumeMute className="text-sm" /> : <IoVolumeHigh className="text-sm" />}
              </Button>
              <div className="flex-1">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="glass-player h-24 sm:h-28 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>

      {/* Music visualizer bars */}
      {isPlaying && (
        <div className="absolute left-4 top-4 flex items-end gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`music-bar bg-gradient-to-t from-primary to-secondary w-1 rounded-full`} />
          ))}
        </div>
      )}

      {/* Now playing */}
      <div className="flex w-1/4 lg:w-1/3 items-center gap-3 sm:gap-4 relative z-10 min-w-0">
        {currentTrack ? (
          <>
            <div className="relative group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden neon-glow transition-all duration-300 group-hover:scale-105">
                <img
                  src={currentTrack.albumCover || "/placeholder.svg?height=80&width=80"}
                  alt={currentTrack.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 cosmic-gradient rounded-full flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full pulse-animation"></div>
              </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm sm:text-lg font-bold truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentTrack.title}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 truncate">{currentTrack.artist}</span>
              <span className="text-xs text-gray-500 truncate hidden sm:block">{currentTrack.album}</span>
            </div>
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 hover:scale-110",
                  isLiked && "text-red-500 neon-glow-secondary",
                )}
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <IoHeart className="text-sm sm:text-lg" />
                ) : (
                  <IoHeartOutline className="text-sm sm:text-lg" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300 hidden sm:flex"
              >
                <IoShare className="text-sm sm:text-lg" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
              <IoHeadset className="text-2xl sm:text-3xl text-gray-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-lg font-bold">No track selected</span>
              <span className="text-xs sm:text-sm text-gray-400">Choose your vibe</span>
            </div>
          </div>
        )}
      </div>

      {/* Player controls */}
      <div className="flex w-1/2 lg:w-1/3 flex-col items-center gap-3 sm:gap-4 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:scale-110 transition-all duration-300 hidden sm:flex"
          >
            <IoShuffle className="text-sm sm:text-lg lg:text-xl" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="glass-button rounded-xl sm:rounded-2xl w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-all duration-300"
          >
            <IoPlaySkipBack className="text-lg sm:text-xl" />
          </Button>
          <Button
            onClick={togglePlayPause}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl cosmic-gradient hover:scale-110 transition-all duration-300 shadow-2xl neon-glow group"
          >
            {isPlaying ? (
              <IoPause className="text-lg sm:text-xl lg:text-2xl text-black group-hover:scale-110 transition-transform" />
            ) : (
              <IoPlay className="text-lg sm:text-xl lg:text-2xl text-black ml-0.5 group-hover:scale-110 transition-transform" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="glass-button rounded-xl sm:rounded-2xl w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-all duration-300"
          >
            <IoPlaySkipForward className="text-lg sm:text-xl" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:scale-110 transition-all duration-300 hidden sm:flex"
          >
            <IoRepeat className="text-sm sm:text-lg lg:text-xl" />
          </Button>
        </div>

        <div className="flex w-full max-w-md lg:max-w-lg items-center gap-2 sm:gap-3 lg:gap-4">
          <span className="text-xs text-gray-400 w-8 sm:w-10 lg:w-12 text-right font-mono">{formatTime(progress)}</span>
          <div className="flex-1 relative group">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
              className="w-full"
            />
          </div>
          <span className="text-xs text-gray-400 w-8 sm:w-10 lg:w-12 font-mono">{formatTime(180)}</span>
        </div>
      </div>

      {/* Volume and extras */}
      <div className="flex w-1/4 lg:w-1/3 items-center justify-end gap-2 sm:gap-3 lg:gap-4 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300 hidden lg:flex"
        >
          <IoEllipsisHorizontal className="text-sm sm:text-lg" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="glass-button rounded-xl sm:rounded-2xl w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300"
          onClick={toggleMute}
        >
          {isMuted || volume === 0 ? (
            <IoVolumeMute className="text-sm sm:text-lg" />
          ) : (
            <IoVolumeHigh className="text-sm sm:text-lg" />
          )}
        </Button>
        <div className="w-16 sm:w-24 lg:w-32 group hidden sm:block">
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
