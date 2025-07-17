import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

async function handleLogin(formData: FormData) {
  "use server"

  const password = formData.get("password") as string

  if (!password) {
    redirect("/login?error=missing")
  }

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()

    // Set the admin session cookie
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
    })

    redirect("/admin")
  } else {
    redirect("/login?error=invalid")
  }
}

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter the admin password to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
            </div>

            {error === "invalid" && (
              <Alert variant="destructive">
                <AlertDescription>Invalid password. Please try again.</AlertDescription>
              </Alert>
            )}

            {error === "missing" && (
              <Alert variant="destructive">
                <AlertDescription>Please enter a password.</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
