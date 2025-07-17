import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { submitDemoRequest } from "@/lib/actions"
import Link from "next/link"

export default function DemoRequestPage({ searchParams }: { searchParams: { success?: string } }) {
  const isSuccess = searchParams.success === "true"

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in Lumina. Our team will contact you within 24 hours to schedule your
              personalized demo.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Request a Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Lumina can transform your parish community. Schedule a personalized demo with our team to explore
            features tailored to your needs.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Parish</CardTitle>
              <CardDescription>
                Help us prepare a demo that's relevant to your parish's specific needs and goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={submitDemoRequest} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" name="name" placeholder="Fr. John Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="pastor@stmarys.org" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parishName">Parish Name *</Label>
                    <Input id="parishName" name="parishName" placeholder="St. Mary's Catholic Church" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Parish Location *</Label>
                    <Input id="location" name="location" placeholder="Austin, TX" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your parish size, current challenges, or specific features you're interested in..."
                    rows={4}
                  />
                </div>

                <Alert>
                  <AlertDescription>
                    Our team will contact you within 24 hours to schedule your personalized demo. We'll show you exactly
                    how Lumina can benefit your specific parish community.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" size="lg">
                  Request Demo
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* What to Expect */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quick Response</h4>
                    <p className="text-gray-600 text-sm">
                      We'll contact you within 24 hours to schedule your demo at a convenient time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Demo</h4>
                    <p className="text-gray-600 text-sm">
                      A 30-45 minute session focused on your parish's specific needs and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Next Steps</h4>
                    <p className="text-gray-600 text-sm">
                      We'll provide a custom proposal and timeline for getting your parish started.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
