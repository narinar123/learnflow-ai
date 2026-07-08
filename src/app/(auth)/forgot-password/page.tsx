import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, KeyRound } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Forgot Password?</CardTitle>
        <CardDescription className="text-center text-base">
          No worries, we'll send you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          
          <Button className="w-full text-md h-12 mt-2" size="lg">
            Reset Password
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-white/5 pt-6">
        <Link href="/login" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to log in
        </Link>
      </CardFooter>
    </Card>
  )
}
