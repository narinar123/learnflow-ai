import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function VerifyOtpPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
        <CardDescription className="text-center text-base">
          We sent a verification code to your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-4">
          {/* Typically this would use an OTP input library, but here's a pure UI mock */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Input 
              key={i} 
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold p-0" 
              maxLength={1} 
              placeholder="-" 
            />
          ))}
        </div>
        
        <Button className="w-full text-md h-12 mt-4" size="lg">
          Verify Account
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center border-t border-white/5 pt-6 gap-2">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email?
        </p>
        <button className="text-sm font-semibold text-primary hover:underline">
          Click to resend
        </button>
      </CardFooter>
    </Card>
  )
}
