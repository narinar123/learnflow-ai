import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { BookOpen, Briefcase, GraduationCap } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="w-full animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">What brings you to EduAI?</h2>
        <p className="text-white/70">Select your role so we can personalize your experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Role: Student */}
        <button className="group text-left border border-white/10 bg-background/40 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">I'm a Student</h3>
              <p className="text-sm text-white/60">I want to learn new skills with AI.</p>
            </div>
          </div>
        </button>

        {/* Role: Trainer */}
        <button className="group text-left border border-white/10 bg-background/40 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">I'm a Trainer</h3>
              <p className="text-sm text-white/60">I want to create courses and teach.</p>
            </div>
          </div>
        </button>

        {/* Role: Institution */}
        <button className="group text-left border border-white/10 bg-background/40 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">I represent an Institution</h3>
              <p className="text-sm text-white/60">I want to manage my organization's learning.</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" className="px-12" asChild>
          <Link href="/dashboard">Continue</Link>
        </Button>
      </div>
    </div>
  )
}
