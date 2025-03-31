"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "Ark Windows and Repairs",
    description: "A fully responsive platform built with Next.js and Tailwind CSS.",
    image: "/arkwindows.png?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    liveLink: "https://arkwindowsltd.ca/",
    githubLink: "#",
  },
  {
    title: "Imaginative Young Minds Day Home",
    description: "A Simple fully responsive Day Home Website",
    image: "/imaginative.png?height=400&width=600",
    tags: ["HTML", "CSS", "Tailwind CSS"],
    liveLink: "https://imaginativeyoungminds.ca/",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description: "A drag-and-drop task management application with user authentication.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Supabase", "dnd-kit"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "OpenWeather API", "Chart.js"],
    liveLink: "#",
    githubLink: "#",
  },
]

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">My Projects</h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all duration-700 hover:shadow-lg ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  {/* <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

