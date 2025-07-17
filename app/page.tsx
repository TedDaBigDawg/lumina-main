import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Users, Church, Shield, Star, MessageSquare } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/db"

async function getHomepageData() {
  try {
    const [parishCount, publicFeedbacks] = await Promise.all([
      prisma.parish.count(),
      prisma.feedback.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ])

    return { parishCount, publicFeedbacks }
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return { parishCount: 0, publicFeedbacks: [] }
  }
}

export default async function HomePage() {
  const { parishCount, publicFeedbacks } = await getHomepageData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Modern Tools for Timeless Missions</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Lumina helps your parish stay organized, engaged, and spiritually connected. Streamline your ministry with
            tools designed specifically for church communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/demo-request">Book a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          {parishCount > 0 && (
            <p className="text-gray-500">
              Trusted by{" "}
              <Link href="/churches" className="font-semibold text-blue-600 hover:text-blue-700">
                {parishCount} parish{parishCount !== 1 ? "es" : ""}
              </Link>{" "}
              and growing
            </p>
          )}
        </div>
      </section>

      {/* What is Lumina Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Lumina?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Lumina is a comprehensive parish management platform that brings your church community together. From event
            planning and volunteer coordination to communication and spiritual resources, Lumina provides everything
            your parish needs to thrive in the digital age while maintaining the personal touch that makes your
            community special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/churches">View Partner Churches</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/feedbacks">Read Community Feedback</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Lumina?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Time-Saving</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automate routine tasks and streamline parish administration, giving you more time for ministry and
                  pastoral care.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect parishioners through events, groups, and communication tools that foster genuine community
                  relationships.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Church className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Church-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built specifically for Catholic parishes with features that respect and enhance traditional church
                  practices and liturgy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enterprise-grade security protects your parish data while maintaining easy access for authorized
                  users.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Feedback Section */}
      {publicFeedbacks.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
              <p className="text-gray-600">Real feedback from parishes using Lumina</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {publicFeedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feedback.message.length > 150 ? `${feedback.message.substring(0, 150)}...` : feedback.message}
                    </p>
                    <div className="font-semibold">{feedback.name || "Anonymous User"}</div>
                    <div className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/feedbacks">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View All Feedback
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How quickly can we get started with Lumina?</AccordionTrigger>
              <AccordionContent>
                Most parishes are up and running within 2-3 weeks. Our team handles the setup and provides comprehensive
                training to ensure a smooth transition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is Lumina suitable for small parishes?</AccordionTrigger>
              <AccordionContent>
                Lumina scales to fit parishes of all sizes. Our pricing and features are designed to benefit both small
                rural parishes and large urban communities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
              <AccordionContent>
                We offer comprehensive support including initial setup, training, ongoing technical support, and regular
                check-ins to ensure you're getting the most from Lumina.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can we import our existing parish data?</AccordionTrigger>
              <AccordionContent>
                Yes! Our team will help you migrate your existing member records, financial data, and other important
                information to ensure continuity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is our parish data secure?</AccordionTrigger>
              <AccordionContent>
                Security is our top priority. We use enterprise-grade encryption, regular backups, and comply with all
                relevant data protection regulations to keep your information safe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Parish?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the growing community of parishes using Lumina to strengthen their communities and streamline their
            ministry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/demo-request">Book a Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-blue-600 border-white hover:bg-white bg-transparent"
            >
              <Link href="/contact">Share Your Feedback</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
