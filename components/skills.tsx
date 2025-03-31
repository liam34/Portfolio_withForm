"use client"

import { useInView } from "react-intersection-observer"
import { Code, Layout, Database, Figma, GitBranch, Smartphone } from "lucide-react"

const skills = [
  {
    title: "Frontend Development",
    icon: <Code className="h-8 w-8 mb-4 text-primary" />,
    description: "HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    title: "UI/UX Design",
    icon: <Layout className="h-8 w-8 mb-4 text-primary" />,
    description: "Responsive Design, User Experience, Wireframing, Prototyping",
  },
  {
    title: "Backend Integration",
    icon: <Database className="h-8 w-8 mb-4 text-primary" />,
    description: "RESTful APIs, GraphQL, Node.js, Express, MongoDB",
  },
  {
    title: "Design Tools",
    icon: <Figma className="h-8 w-8 mb-4 text-primary" />,
    description: "Figma, Adobe XD, Photoshop, Illustrator",
  },
  {
    title: "Version Control",
    icon: <GitBranch className="h-8 w-8 mb-4 text-primary" />,
    description: "Git, GitHub, GitLab, CI/CD Pipelines",
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-8 w-8 mb-4 text-primary" />,
    description: "React Native, Progressive Web Apps",
  },
]

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">My Skills</h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`bg-card p-6 rounded-lg shadow-sm border transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                {skill.icon}
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

