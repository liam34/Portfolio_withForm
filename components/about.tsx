"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="relative rounded-lg overflow-hidden w-full max-w-md mx-auto aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Profile"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Frontend Developer with a passion for creating beautiful user experiences
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm a frontend developer based in New York with 5 years of experience building products for clients around
              the world. I specialize in creating responsive websites and web applications that provide intuitive,
              pixel-perfect user experiences.
            </p>
            <p className="text-muted-foreground mb-6">
              My expertise includes React.js, Next.js, TypeScript, and modern CSS frameworks like Tailwind. I'm
              passionate about clean code, accessibility, and performance optimization.
            </p>
            <Button variant="outline" className="group">
              <FileText className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

