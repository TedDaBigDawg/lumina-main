import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/db"

async function getPublicFeedbacks() {
  try {
    return await prisma.feedback.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 20, // Limit to 20 most recent
    })
  } catch (error) {
    console.error("Error fetching public feedbacks:", error)
    return []
  }
}

export default async function FeedbacksPage() {
  const feedbacks = await getPublicFeedbacks()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Community Feedback</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what parishes and users are saying about their experience with Lumina. Real feedback from real
            communities.
          </p>
        </div>
      </section>

      {/* Feedbacks Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Public Feedback Yet</h3>
              <p className="text-gray-600 mb-8">
                Be the first to share your experience with Lumina! Your feedback helps other parishes understand the
                benefits.
              </p>
              <Button asChild>
                <Link href="/contact">Share Your Feedback</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {feedbacks.length} Public Review{feedbacks.length !== 1 ? "s" : ""}
                </h2>
                <p className="text-gray-600">Authentic feedback from our parish community</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feedback.message}</p>
                      <div className="mt-auto">
                        <div className="font-semibold text-gray-900">{feedback.name || "Anonymous User"}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Want to share your experience with Lumina? We'd love to hear from you!
                </p>
                <Button asChild>
                  <Link href="/contact">Leave Feedback</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
