"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createParish } from "@/lib/actions"
import { useRef } from "react"

export function AddParishForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    try {
      await createParish(formData)
      formRef.current?.reset()
    } catch (error) {
      console.error("Error creating parish:", error)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Parish Name *</Label>
          <Input id="name" name="name" placeholder="St. Mary's Catholic Church" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input id="location" name="location" placeholder="Austin, TX" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
        <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://stmarys.org" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea id="description" name="description" placeholder="Brief description of the parish..." rows={3} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="featured" name="featured" />
        <Label htmlFor="featured" className="text-sm">
          Mark as featured parish (will appear first in directory)
        </Label>
      </div>

      <Button type="submit">Add Parish</Button>
    </form>
  )
}
