import { useState } from "react"
import { IoEye, IoEyeOff, IoHeadset, IoMail, IoLockClosed, IoPerson, IoMic } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import api from "@/lib/api" 

export function AuthForm() {
  const [authForm, setAuthForm] = useState({
    loginEmail: "",
    loginPassword: "",
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    userType: "listener"
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (field) => (e) => {
    setAuthForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { data } = await api.post("/auth/login", {
        methods: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: {
          email: authForm.loginEmail,
          password: authForm.loginPassword
        }
      })
      const dataResponse = await response.json();
      if (dataResponse.ok) {
        navigate("/");
      } else {
        alert(dataResponse.message || "Login failed");
      }
      console.log("Login successful:", dataResponse)
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    try {
      setLoading(true)
      const { data } = await api.post("/auth/signup", {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: {
          email: authForm.signupEmail,
          password: authForm.signupPassword,
          name: authForm.signupName,
          role: authForm.userType
        },
      })
      const dataResponse = await response.json();
      if (dataResponse.ok) {
        navigate("/");
      } else {
        alert(dataResponse.message || "Signup failed");
      }
      console.log("Signup successful:", dataResponse)
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

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

            {/* LOGIN TAB */}
            <TabsContent value="login" className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                  <div className="relative">
                    <IoMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      value={authForm.loginEmail}
                      onChange={handleChange("loginEmail")}
                      placeholder="Enter your email"
                      className="glass-card border-primary/30 rounded-xl pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                  <div className="relative">
                    <IoLockClosed className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={authForm.loginPassword}
                      onChange={handleChange("loginPassword")}
                      placeholder="Enter your password"
                      className="glass-card border-primary/30 rounded-xl pl-10 pr-10 h-12 text-base"
                    />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoEyeOff className="h-4 w-4" /> : <IoEye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Button variant="link" className="text-sm text-primary p-0 h-auto">Forgot password?</Button>
                </div>

                <Button
                  disabled={loading}
                  onClick={handleLogin}
                  className="w-full cosmic-gradient text-black font-bold rounded-xl h-12 text-base neon-glow"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup" className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                  <div className="relative">
                    <IoPerson className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      value={authForm.signupName}
                      onChange={handleChange("signupName")}
                      placeholder="Enter your full name"
                      className="glass-card border-primary/30 rounded-xl pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm sm:text-base">Email</Label>
                  <div className="relative">
                    <IoMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      value={authForm.signupEmail}
                      onChange={handleChange("signupEmail")}
                      placeholder="Enter your email"
                      className="glass-card border-primary/30 rounded-xl pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm sm:text-base">Password</Label>
                  <div className="relative">
                    <IoLockClosed className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={authForm.signupPassword}
                      onChange={handleChange("signupPassword")}
                      placeholder="Create a password"
                      className="glass-card border-primary/30 rounded-xl pl-10 pr-10 h-12 text-base"
                    />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoEyeOff className="h-4 w-4" /> : <IoEye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">I want to join as:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={authForm.userType === "listener" ? "default" : "outline"}
                      onClick={() => setAuthForm((prev) => ({ ...prev, userType: "listener" }))}
                      className={`rounded-xl h-14 flex flex-col gap-1 text-sm ${
                        authForm.userType === "listener" ? "cosmic-gradient text-white font-semibold" : "border-primary/30"
                      }`}
                    >
                      <IoHeadset className="h-5 w-5" />
                      <span>Listener</span>
                    </Button>

                    <Button
                      type="button"
                      variant={authForm.userType === "artist" ? "default" : "outline"}
                      onClick={() => setAuthForm((prev) => ({ ...prev, userType: "artist" }))}
                      className={`rounded-xl h-14 flex flex-col gap-1 text-sm ${
                        authForm.userType === "artist" ? "cosmic-gradient text-white font-semibold" : "border-primary/30"
                      }`}
                    >
                      <IoMic className="h-5 w-5" />
                      <span>Artist</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-sm">Terms of Service</Button>{" "}
                    and{" "}
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-sm">Privacy Policy</Button>
                  </Label>
                </div>

                <Button
                  disabled={loading}
                  onClick={handleSignup}
                  className="w-full cosmic-gradient text-black font-bold rounded-xl h-12 text-base neon-glow"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
