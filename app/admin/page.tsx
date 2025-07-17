import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, MessageSquare, Calendar, Trash2, Eye, EyeOff, ExternalLink, Star } from "lucide-react"
import { prisma } from "@/lib/db"
import { deleteDemoRequest, deleteFeedback, deleteParish, toggleFeedbackPublic } from "@/lib/actions"
import Link from "next/link"
import { AddParishForm } from "@/components/add-parish-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { requireAuth } from "@/lib/auth"

async function handleLogout() {
  "use server"

  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
  redirect("admin/login")
}

async function getDashboardData() {
  try {
    const [parishes, demoRequests, feedback] = await Promise.all([
      prisma.parish.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.demoRequest.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ])

    return { parishes, demoRequests, feedback }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return { parishes: [], demoRequests: [], feedback: [] }
  }
}

export default async function AdminDashboard() {
  // Ensure user is authenticated
  const session = await requireAuth()


  const { parishes, demoRequests, feedback } = await getDashboardData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lumina Admin Dashboard</h1>
            <p className="text-gray-600">Manage demo requests, feedback, and parish directory</p>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parishes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parishes.length}</div>
              <p className="text-xs text-muted-foreground">{parishes.filter((p) => p.featured).length} featured</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demo Requests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{demoRequests.length}</div>
              <p className="text-xs text-muted-foreground">Pending follow-up</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">All messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Feedback</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.filter((f) => f.isPublic).length}</div>
              <p className="text-xs text-muted-foreground">Visible to public</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="demo-requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="demo-requests">Demo Requests</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="parishes">Parishes</TabsTrigger>
          </TabsList>

          {/* Demo Requests Tab */}
          <TabsContent value="demo-requests">
            <Card>
              <CardHeader>
                <CardTitle>Demo Requests</CardTitle>
                <CardDescription>Parishes interested in learning more about Lumina</CardDescription>
              </CardHeader>
              <CardContent>
                {demoRequests.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      No demo requests yet. When parishes submit requests, they'll appear here.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contact</TableHead>
                        <TableHead>Parish</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="font-medium">{request.name}</div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{request.parishName}</div>
                              {request.message && (
                                <div className="text-sm text-gray-500 mt-1">
                                  {request.message.substring(0, 100)}
                                  {request.message.length > 100 && "..."}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{request.location}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{request.email}</div>
                              {request.phone && <div>{request.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <form action={deleteDemoRequest.bind(null, request.id)} className="inline">
                              <Button variant="ghost" size="sm" type="submit">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </form>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Messages</CardTitle>
                <CardDescription>Messages and suggestions from users</CardDescription>
              </CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <Alert>
                    <AlertDescription>No feedback messages yet. User submissions will appear here.</AlertDescription>
                  </Alert>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Message</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedback.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="max-w-md">
                              {item.message.substring(0, 150)}
                              {item.message.length > 150 && "..."}
                            </div>
                          </TableCell>
                          <TableCell>{item.name || "Anonymous"}</TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-500">{item.email || "No email"}</div>
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={item.isPublic ? "default" : "secondary"}>
                              {item.isPublic ? "Public" : "Private"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <form
                                action={toggleFeedbackPublic.bind(null, item.id, !item.isPublic)}
                                className="inline"
                              >
                                <Button variant="ghost" size="sm" type="submit">
                                  {item.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </form>
                              <form action={deleteFeedback.bind(null, item.id)} className="inline">
                                <Button variant="ghost" size="sm" type="submit">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </form>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parishes Tab */}
          <TabsContent value="parishes">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Parish</CardTitle>
                  <CardDescription>Add a parish to the public directory</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddParishForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parish Directory</CardTitle>
                  <CardDescription>Manage parishes listed in the public directory</CardDescription>
                </CardHeader>
                <CardContent>
                  {parishes.length === 0 ? (
                    <Alert>
                      <AlertDescription>
                        No parishes added yet. Use the form above to add the first parish.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parish</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Website</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Added</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parishes.map((parish) => (
                          <TableRow key={parish.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="font-medium">{parish.name}</div>
                                  {parish.description && (
                                    <div className="text-sm text-gray-500 mt-1">
                                      {parish.description.substring(0, 100)}
                                      {parish.description.length > 100 && "..."}
                                    </div>
                                  )}
                                </div>
                                {parish.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                              </div>
                            </TableCell>
                            <TableCell>{parish.location}</TableCell>
                            <TableCell>
                              {parish.websiteUrl ? (
                                <a
                                  href={parish.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                  Visit <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              ) : (
                                <span className="text-gray-400">None</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={parish.featured ? "default" : "secondary"}>
                                {parish.featured ? "Featured" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(parish.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button asChild variant="ghost" size="sm">
                                  <Link href={`/churches/${parish.slug}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <form action={deleteParish.bind(null, parish.id)} className="inline">
                                  <Button variant="ghost" size="sm" type="submit">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </form>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
