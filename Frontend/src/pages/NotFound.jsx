import { Link } from "react-router-dom"
import { IoHome, IoSearch, IoMusicalNotes, IoSad } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating-animation"></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-animation"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl floating-animation"
        style={{ animationDelay: "8s" }}
      ></div>

      <Card className="glass-card border-primary/30 max-w-md w-full relative z-10">
        <CardContent className="p-8 text-center">
          {/* 404 Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto cosmic-gradient rounded-full flex items-center justify-center glow-animation">
              <IoSad className="text-4xl text-black" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full pulse-animation flex items-center justify-center">
              <span className="text-black font-bold text-sm">!</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-4 text-white">Track Not Found</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have gone off-beat. Let's get you back to the music.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full cosmic-gradient text-black font-bold rounded-2xl py-3 hover:scale-105 transition-all duration-300 neon-glow">
                <IoHome className="mr-2 text-lg" />
                Back to Home
              </Button>
            </Link>

            <div className="flex gap-3">
              <Link to="/search" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full glass-button rounded-xl border-primary/50 hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <IoSearch className="mr-2 text-sm" />
                  Search Music
                </Button>
              </Link>

              <Link to="/discover" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full glass-button rounded-xl border-secondary/50 hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <IoMusicalNotes className="mr-2 text-sm" />
                  Discover
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
