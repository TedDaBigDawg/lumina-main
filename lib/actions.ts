"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitDemoRequest(formData: FormData) {
  const name = formData.get("name") as string
  const parishName = formData.get("parishName") as string
  const location = formData.get("location") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !parishName || !location || !email) {
    throw new Error("Missing required fields")
  }

  try {
    await prisma.demoRequest.create({
      data: {
        name,
        parishName,
        location,
        phone: phone || null,
        email,
        message: message || null,
      },
    })

    revalidatePath("/admin")
  } catch (error) {
    console.error("Error submitting demo request:", error)
    throw new Error("Failed to submit demo request")
  }

  // Redirect after successful creation (outside try-catch)
  redirect("/demo-request?success=true")
}

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  const isPublic = formData.get("isPublic") === "on"

  if (!message) {
    throw new Error("Message is required")
  }

  try {
    await prisma.feedback.create({
      data: {
        name: name || null,
        email: email || null,
        message,
        isPublic,
      },
    })

    revalidatePath("/admin")
    revalidatePath("/feedbacks")
  } catch (error) {
    console.error("Error submitting feedback:", error)
    throw new Error("Failed to submit feedback")
  }

  // Redirect after successful creation (outside try-catch)
  redirect("/contact?success=true")
}

export async function createParish(formData: FormData) {
  const name = formData.get("name") as string
  const location = formData.get("location") as string
  const description = formData.get("description") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const featured = formData.get("featured") === "on"

  if (!name || !location) {
    throw new Error("Name and location are required")
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    await prisma.parish.create({
      data: {
        name,
        location,
        description: description || null,
        websiteUrl: websiteUrl || null,
        featured,
        slug,
      },
    })

    revalidatePath("/churches")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error creating parish:", error)
    throw new Error("Failed to create parish")
  }
}

export async function updateParish(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const location = formData.get("location") as string
  const description = formData.get("description") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const featured = formData.get("featured") === "on"

  if (!name || !location) {
    throw new Error("Name and location are required")
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    await prisma.parish.update({
      where: { id },
      data: {
        name,
        location,
        description: description || null,
        websiteUrl: websiteUrl || null,
        featured,
        slug,
      },
    })

    revalidatePath("/churches")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error updating parish:", error)
    throw new Error("Failed to update parish")
  }
}

export async function deleteParish(id: string) {
  try {
    await prisma.parish.delete({
      where: { id },
    })

    revalidatePath("/churches")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error deleting parish:", error)
    throw new Error("Failed to delete parish")
  }
}

export async function deleteDemoRequest(id: string) {
  try {
    await prisma.demoRequest.delete({
      where: { id },
    })

    revalidatePath("/admin")
  } catch (error) {
    console.error("Error deleting demo request:", error)
    throw new Error("Failed to delete demo request")
  }
}

export async function deleteFeedback(id: string) {
  try {
    await prisma.feedback.delete({
      where: { id },
    })

    revalidatePath("/admin")
    revalidatePath("/feedbacks")
  } catch (error) {
    console.error("Error deleting feedback:", error)
    throw new Error("Failed to delete feedback")
  }
}

export async function toggleFeedbackPublic(id: string, isPublic: boolean) {
  try {
    await prisma.feedback.update({
      where: { id },
      data: { isPublic },
    })

    revalidatePath("/admin")
    revalidatePath("/feedbacks")
  } catch (error) {
    console.error("Error updating feedback:", error)
    throw new Error("Failed to update feedback")
  }
}
