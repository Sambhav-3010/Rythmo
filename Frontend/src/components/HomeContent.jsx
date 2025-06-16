"use client"

import { useState, useEffect } from "react"
import {
  IoPlay,
  IoTrendingUp,
  IoTime,
  IoStar,
  IoCompass,
  IoHeart,
  IoMic,
  IoMusicalNotes,
  IoHeadset,
  IoRocket,
} from "react-icons/io5"

const trendingTracks = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "Cyber Pulse",
    genre: "Synthwave",
    plays: "2.4M",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    gradient: "from-purple-500 via-pink-500 to-cyan-500",
  },
  {
    id: "2",
    title: "Digital Ocean",
    artist: "Wave Collective",
    genre: "Ambient",
    plays: "1.8M",
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    gradient: "from-blue-500 via-teal-500 to-purple-500",
  },
  {
    id: "3",
    title: "Cosmic Beats",
    artist: "Space Vibes",
    genre: "Electronic",
    plays: "3.1M",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "4",
    title: "Midnight Flow",
    artist: "Dark Harmony",
    genre: "Chill",
    plays: "1.9M",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
]

const featuredPlaylists = [
  {
    id: "1",
    title: "Midnight Vibes",
    description: "Perfect for late night sessions",
    trackCount: 42,
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    mood: "Chill",
    color: "primary",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: "2",
    title: "Energy Boost",
    description: "High-energy tracks to power your day",
    trackCount: 38,
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    mood: "Energetic",
    color: "secondary",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "3",
    title: "Focus Flow",
    description: "Instrumental beats for concentration",
    trackCount: 55,
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
    mood: "Focus",
    color: "primary",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "4",
    title: "Retro Wave",
    description: "80s inspired electronic music",
    trackCount: 29,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    mood: "Retro",
    color: "secondary",
    gradient: "from-pink-500 to-purple-500",
  },
]

// Enhanced Card Component
const Card = ({ children, className, ...props }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className, ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

// Enhanced Button Component
const Button = ({ children, className, variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-out transform"
  const sizeClasses = {
    default: "px-6 py-3 text-base",
    icon: "p-3",
    lg: "px-8 py-4 text-lg"
  }
  const variantClasses = {
    default: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-purple-500/25",
    outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105",
    ghost: "text-white hover:bg-white/10 hover:scale-105"
  }
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Badge Component
const Badge = ({ children, className, variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300"
  const variantClasses = {
    default: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30",
    outline: "border border-white/20 text-white/80"
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}

export function EnhancedSoundWaveHome() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePlayClick = (track) => {
    console.log("Playing:", track.title)
    // Handle play functionality here
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-purple-900/30 via-slate-800/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-700 transform hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 animate-fade-in">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <IoStar className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Featured Today
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent block animate-slide-up">
                  Discover Your
                </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block animate-slide-up delay-200">
                  Sound Universe
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed animate-fade-in delay-400">
                Explore millions of tracks, create your perfect playlists, and dive into a universe of music that adapts to your every mood and moment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-600">
                <Button size="lg" className="group hover:shadow-2xl hover:shadow-purple-500/30">
                  <IoRocket className="mr-2 text-xl group-hover:animate-bounce" />
                  Start Listening
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <IoHeadset className="mr-2 text-xl group-hover:animate-pulse" />
                  Explore Genres
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Trending Section */}
        <div className="animate-fade-in delay-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <IoTrendingUp className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Trending Now
            </h2>
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-200 border-orange-500/30 animate-pulse">
              🔥 Hot
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {trendingTracks.map((track, index) => (
              <Card
                key={track.id}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-purple-400/60 animate-fade-in`}
                style={{ animationDelay: `${1000 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(track.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handlePlayClick(track)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-40 z-10`}></div>
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-full h-48 lg:h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 z-20 ${
                      hoveredCard === track.id ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
                    }`}>
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-125 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                      >
                        <IoPlay className="text-2xl ml-1" />
                      </Button>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">
                        {track.plays} plays
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 truncate group-hover:text-purple-300 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 mb-4 truncate">{track.artist}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={`bg-gradient-to-r ${track.gradient} bg-opacity-20 text-white border-white/20`}>
                        {track.genre}
                      </Badge>
                      <div className="flex items-center gap-2 text-gray-500">
                        <IoMusicalNotes className="text-purple-400" />
                        <span className="text-xs">Trending</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Playlists Section */}
        <div className="animate-fade-in delay-1200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <IoTime className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Curated for You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {featuredPlaylists.map((playlist, index) => (
              <Card
                key={playlist.id}
                className={`group hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/60 animate-fade-in`}
                style={{ animationDelay: `${1400 + index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <div className={`w-full h-40 bg-gradient-to-br ${playlist.gradient} rounded-3xl flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-300 shadow-xl`}>
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-black text-white">{playlist.trackCount}</span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-purple-500/50"
                    >
                      <IoPlay className="text-xl ml-0.5" />
                    </Button>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors">
                    {playlist.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {playlist.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className={`bg-gradient-to-r ${playlist.gradient} bg-opacity-20 text-white border-white/20`}>
                      {playlist.mood}
                    </Badge>
                    <span className="text-sm text-gray-500">{playlist.trackCount} tracks</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-fade-in delay-1600">
          {[
            { icon: IoCompass, title: "Explore New Music", desc: "Discover trending artists and genres", gradient: "from-purple-500 to-pink-500" },
            { icon: IoHeart, title: "Your Collection", desc: "Saved tracks & playlists", gradient: "from-red-500 to-pink-500" },
            { icon: IoMic, title: "Creator Studio", desc: "Upload your music", gradient: "from-blue-500 to-purple-500" }
          ].map((action, index) => (
            <Card 
              key={index}
              className="p-8 hover:bg-white/10 transition-all duration-500 group cursor-pointer hover:scale-105 hover:border-purple-400/60"
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl group-hover:shadow-purple-500/30`}>
                  <action.icon className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-400">{action.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1200 { animation-delay: 1.2s; }
        .delay-1400 { animation-delay: 1.4s; }
        .delay-1600 { animation-delay: 1.6s; }
        `}
      </style>
    </div>
  )
}