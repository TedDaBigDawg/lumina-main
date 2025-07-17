import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"

async function getParish(slug: string) {
  try {
    return await prisma.parish.findUnique({
      where: { slug },
    })
  } catch (error) {
    console.error("Error fetching parish:", error)
    return null
  }
}

export default async function ParishPage({ params }: { params: { slug: string } }) {
  const parish = await getParish(params.slug)

  if (!parish) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">{parish.name}</h1>
              {parish.featured && <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />}
            </div>
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{parish.location}</span>
            </div>
            {parish.featured && (
              <Badge variant="secondary" className="mb-4">
                Featured Parish
              </Badge>
            )}
            {parish.websiteUrl && (
              <Button asChild size="lg">
                <a href={parish.websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit Parish Site
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Parish Details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>About {parish.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {parish.description ? (
                <p className="text-gray-600 leading-relaxed mb-6">{parish.description}</p>
              ) : (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {parish.name} is part of the growing community of parishes using Lumina to enhance their ministry and
                  strengthen their parish community. Through modern tools and thoughtful technology, they're able to
                  focus more on pastoral care and spiritual growth.
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {parish.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Joined Lumina</h3>
                  <p className="text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(parish.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Inspired by {parish.name}?</h2>
          <p className="text-xl text-gray-600 mb-8">
            See how your parish can benefit from the same tools and community that are helping parishes like{" "}
            {parish.name} thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/demo-request">Request a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/churches">View All Parishes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
