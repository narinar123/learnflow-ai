import React from "react"
import { ShieldCheck } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-black overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/30 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px]" />
      
      {/* Left side - Branding/Marketing */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">EduAI</span>
        </div>
        
        <div className="space-y-6 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Unlock the power of AI in your learning journey.
          </h1>
          <p className="text-lg text-white/70">
            Join thousands of students and institutions worldwide who are transforming their education with our enterprise-grade AI platform.
          </p>
        </div>
        
        <div className="text-sm text-white/50">
          © {new Date().getFullYear()} EduAI. All rights reserved.
        </div>
      </div>

      {/* Right side - Form area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
