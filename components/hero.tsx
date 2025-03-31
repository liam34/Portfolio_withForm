"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
      <div
        className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-primary">John Doe</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">Frontend Developer & UI/UX Designer</h2>
        <p className="max-w-lg mx-auto text-lg mb-8">
          I build exceptional digital experiences that are fast, accessible, and visually appealing.
        </p>
        <Button className="animate-bounce">
          View My Work <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  )
}

