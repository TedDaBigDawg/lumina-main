import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from a passion to serve the Church and strengthen parish communities through thoughtful technology.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Lumina began with a simple observation: parishes across the world were struggling to manage their
              communities with outdated tools and disconnected systems. Pastors were spending countless hours on
              administrative tasks instead of pastoral care, and parishioners were missing opportunities to connect and
              serve.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded in 2024 by a team of Catholic technologists and parish leaders, Lumina was created to bridge this
              gap. We believe that technology should serve the mission of the Church, not complicate it. Every feature
              we build is designed with the unique needs of Catholic parishes in mind.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, Lumina serves parishes across the globe, helping them build stronger communities, streamline their
              operations, and focus on what matters most: the spiritual growth and care of their people.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower Catholic parishes with technology that strengthens community, simplifies administration, and
              supports spiritual growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Serve the Church</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We exist to serve the Catholic Church and support parishes in their mission to evangelize and care for
                  souls.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Simplify Ministry</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Technology should make ministry easier, not harder. We create tools that are intuitive and
                  purpose-built for parish life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Build Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strong parishes are built on strong relationships. Our platform helps parishioners connect and grow
                  together in faith.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              A dedicated group of Catholics committed to serving the Church through technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Ted Osiobe</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-500">
                  Former parish council member with 10+ years in tech. Passionate about using technology to strengthen
                  faith communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Maria Santos</h3>
                <p className="text-gray-600 mb-2">Head of Product</p>
                <p className="text-sm text-gray-500">
                  Former parish administrator turned product designer. Understands the daily challenges parishes face
                  and designs solutions that work.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fr. James Mitchell</h3>
                <p className="text-gray-600 mb-2">Pastoral Advisor</p>
                <p className="text-sm text-gray-500">
                  Parish priest and technology enthusiast. Ensures our platform serves the pastoral mission and respects
                  Church traditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Modernizing Parish Life</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to see how Lumina can transform your parish community? Let's start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/demo-request">Schedule a Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-blue-600 border-white hover:bg-white bg-transparent"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
