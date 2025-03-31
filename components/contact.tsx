"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { useState, useRef } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formRef.current) return

      // Get form data
      const formData = new FormData(formRef.current)
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const subject = formData.get("subject") as string
      const message = formData.get("message") as string

      // Send data to server-side API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Message sent successfully!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        })

        // Reset form
        formRef.current.reset()

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Get In Touch</h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-1000 ${inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:hello@example.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">New York, NY, USA</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    disabled={isSubmitting}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto group" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Sending...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sent Successfully
                  </div>
                ) : (
                  <div className="flex items-center">
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

