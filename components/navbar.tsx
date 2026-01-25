"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, LayoutDashboard, Shield, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)

        if (data?.session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", data.session.user.id)
            .single()
          setUserType(profileData?.user_type || null)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("[v0] Error checking user:", error)
        setIsLoading(false)
      }
    }

    checkUser()

    try {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user || null)
      })

      if (authListener?.subscription) {
        return () => {
          authListener.subscription.unsubscribe()
        }
      }
    } catch (error) {
      console.error("[v0] Auth listener error:", error)
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getRoleBadge = () => {
    switch (userType) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 gap-1.5 py-1">
            <Shield className="w-3 h-3" />
            System Admin
          </Badge>
        )
      case "training_center_admin":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 gap-1.5 py-1">
            <Building2 className="w-3 h-3" />
            Center Admin
          </Badge>
        )
      case "student":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 gap-1.5 py-1">
            <User className="w-3 h-3" />
            Student
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">⚓</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MarineHub
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 md:gap-4">
            {!isLoading && (
              <>
                {userType && getRoleBadge()}

                {user ? (
                  <>
                    <Link href="/">
                      <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Browse Training Centers
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <User className="w-4 h-4" />
                          <span className="hidden sm:inline">Account</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            My Bookings
                          </Link>
                        </DropdownMenuItem>
                        {userType === "admin" && (
                          <DropdownMenuItem asChild>
                            <Link href="/admin/dashboard" className="cursor-pointer flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {userType === "training_center_admin" && (
                          <DropdownMenuItem asChild>
                            <Link
                              href="/training-center-admin/dashboard"
                              className="cursor-pointer flex items-center gap-2"
                            >
                              <Building2 className="w-4 h-3" />
                              Center Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href="/my-profile" className="cursor-pointer">
                            Profile Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-destructive cursor-pointer flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
