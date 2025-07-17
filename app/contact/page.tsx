import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react"
import { submitFeedback } from "@/lib/actions"
import Link from "next/link"

export default function ContactPage({ searchParams }: { searchParams: { success?: string } }) {
  const isSuccess = searchParams.success === "true"

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your message has been received. We'll get back to you as soon as possible.
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about Lumina? Want to share feedback or suggestions? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Start a Conversation</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a parish leader exploring Lumina, a current user with feedback, or someone interested in
              our mission, we're here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@luminaapp.org</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 123-LUMINA</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <p className="text-gray-600">Austin, Texas</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Ready for a Demo?</h3>
              <p className="text-gray-600 mb-4">
                If you're interested in seeing Lumina in action, our demo request form will help us prepare a
                personalized presentation for your parish.
              </p>
              <Button asChild>
                <Link href="/demo-request">Request a Demo</Link>
              </Button>
            </div>
          </div>

          {/* Feedback Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Share your thoughts, questions, or feedback. We read every message and use your input to improve
                  Lumina.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={submitFeedback} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name (Optional)</Label>
                      <Input id="name" name="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isPublic" name="isPublic" />
                    <Label htmlFor="isPublic" className="text-sm">
                      I'm okay with this feedback being shared publicly (anonymously) to help other parishes understand
                      Lumina's benefits
                    </Label>
                  </div>

                  <Alert>
                    <AlertDescription>
                      We typically respond to messages within 24 hours during business days. For urgent matters, please
                      call us directly.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
