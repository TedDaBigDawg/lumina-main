import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies() // No need for `await` here
    const adminSession = cookieStore.get("admin-session")
    return adminSession?.value === "authenticated"
  } catch (error) {
    return false
  }
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/login") // ✅ Instead of throwing
  }
}
