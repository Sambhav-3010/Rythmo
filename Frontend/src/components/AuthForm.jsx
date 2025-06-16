import { useState } from "react"
import { IoEye, IoEyeOff, IoHeadset, IoMail, IoLockClosed, IoPerson, IoMic } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("listener")

  return (
    <div className="w-[100vw] sm:max-w-md lg:max-w-lg">
      <Card className="glass-card border-primary/30 overflow-hidden">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 cosmic-gradient rounded-2xl flex items-center justify-center glow-animation">
                <IoHeadset className="text-2xl sm:text-3xl text-black" />
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-secondary rounded-full pulse-animation"></div>
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Rhythmo
          </CardTitle>
          <p className="text-gray-400 text-sm sm:text-base">Your music universe awaits</p>
        </CardHeader>

        <CardContent className="p-8 sm:p-6 lg:p-8">
          <Tabs defaultValue="login" className="space-y-6 sm:space-y-6">
            <TabsList className="grid w-full h-12 grid-cols-2 glass-card border-primary/30 rounded-2xl p-1">
              <TabsTrigger value="login" className="bg-secondary text-black rounded-xl text-sm sm:text-base">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="bg-secondary text-black rounded-xl text-sm sm:text-base">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Email
                  </Label>
                  <div className="relative">
                    <IoMail className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="glass-card border-primary/30 rounded-xl pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm sm:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <IoLockClosed className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="glass-card border-primary/30 rounded-xl pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 h-6 w-6 sm:h-8 sm:w-8 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <IoEye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-xs sm:text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="text-xs sm:text-sm text-primary hover:text-primary/80 p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>

                <Button className="w-full cosmic-gradient text-black font-bold rounded-xl h-10 sm:h-12 text-sm sm:text-base hover:scale-105 transition-all duration-300 neon-glow">
                  Sign In
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">
                    Full Name
                  </Label>
                  <div className="relative">
                    <IoPerson className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="glass-card border-primary/30 rounded-xl pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm sm:text-base">
                    Email
                  </Label>
                  <div className="relative">
                    <IoMail className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="glass-card border-primary/30 rounded-xl pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm sm:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <IoLockClosed className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="glass-card border-primary/30 rounded-xl pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 h-6 w-6 sm:h-8 sm:w-8 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <IoEye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">I want to join as:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={userType === "listener" ? "default" : "outline"}
                      className={`rounded-xl h-14 sm:h-16 flex flex-col gap-1 text-xs sm:text-sm hover:bg-purple-500 ${
                        userType === "listener" ? "cosmic-gradient text-white font-semibold" : "border-primary/30"
                      }`}
                      onClick={() => setUserType("listener")}
                    >
                      <IoHeadset className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Listener</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === "artist" ? "default" : "outline"}
                      className={`rounded-xl h-14 sm:h-16 flex flex-col gap-1 text-xs sm:text-sm hover:bg-cyan-500 ${
                        userType === "artist" ? "cosmic-gradient text-white bg-secondary font-semibold" : "border-primary/30"
                      }`}
                      onClick={() => setUserType("artist")}
                    >
                      <IoMic className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Artist</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-xs sm:text-sm">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-xs sm:text-sm">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <Button className="w-full cosmic-gradient text-black font-bold rounded-xl h-10 sm:h-12 text-sm sm:text-base hover:scale-105 transition-all duration-300 neon-glow">
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/30"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="bg-black px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-4 ">
              <Button
                variant="outline"
                className="hover:bg-gradient-to-br from-primary to-secondary hover:text-black w-full border-primary/30 rounded-xl h-10 sm:h-12 text-xs sm:text-sm"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
