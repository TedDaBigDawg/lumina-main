import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/db"

async function getParishes() {
  try {
    return await prisma.parish.findMany({
      orderBy: [
        { featured: "desc" }, // Featured parishes first
        { name: "asc" },
      ],
    })
  } catch (error) {
    console.error("Error fetching parishes:", error)
    return []
  }
}

export default async function ChurchesPage() {
  const parishes = await getParishes()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Parish Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the growing community of parishes using Lumina to strengthen their communities and streamline their
            ministry.
          </p>
        </div>
      </section>

      {/* Churches Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {parishes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-gray-600 mb-8">
                We're working with parishes to get them set up on Lumina. Check back soon to see our growing community!
              </p>
              <Button asChild>
                <Link href="/demo-request">Be Among the First</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {parishes.length} Parish{parishes.length !== 1 ? "es" : ""} and Growing
                </h2>
                <p className="text-gray-600">Join these forward-thinking parishes in modernizing their ministry.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parishes.map((parish) => (
                  <Card key={parish.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="flex items-center gap-2">
                          {parish.name}
                          {parish.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                        </span>
                        {parish.websiteUrl && <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {parish.location}
                      </CardDescription>
                      {parish.featured && (
                        <Badge variant="secondary" className="w-fit">
                          Featured Parish
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      {parish.description && <p className="text-sm text-gray-600 mb-4">{parish.description}</p>}
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Link href={`/churches/${parish.slug}`}>Learn More</Link>
                        </Button>
                        {parish.websiteUrl && (
                          <Button asChild size="sm" className="flex-1">
                            <a href={parish.websiteUrl} target="_blank" rel="noopener noreferrer">
                              Visit Site
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join This Community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            See how Lumina can help your parish build stronger connections and streamline your ministry.
          </p>
          <Button asChild size="lg">
            <Link href="/demo-request">Request a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
