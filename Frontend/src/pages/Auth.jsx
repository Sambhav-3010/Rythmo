import { AuthForm } from "@/components/AuthForm"

export default function Auth() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-secondary/10"></div>
      <div className="flex items-center justify-center relative z-10">
        <AuthForm />
      </div>
    </div>
  )
}
