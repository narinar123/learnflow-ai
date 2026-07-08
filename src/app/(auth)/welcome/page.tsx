import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-700">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-white mt-8">
          Welcome to EduAI
        </h1>
        <p className="text-xl text-white/70 max-w-[400px]">
          Your personalized, AI-driven learning journey begins here.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button asChild size="lg" className="w-full h-14 text-lg">
          <Link href="/signup">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg" className="w-full h-14 text-lg">
          <Link href="/login">
            I already have an account
          </Link>
        </Button>
      </div>
    </div>
  )
}
