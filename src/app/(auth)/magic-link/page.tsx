import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function MagicLinkPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Passwordless Sign In</CardTitle>
        <CardDescription className="text-center text-base">
          Enter your email and we'll send a magic link to sign you in instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          
          <Button className="w-full text-md h-12 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-0" size="lg">
            Send Magic Link
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
