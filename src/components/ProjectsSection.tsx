import { projects } from '../content/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--hero-text)] sm:text-4xl">
          项目
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--hero-text-muted)] sm:text-lg">
          我参与和构建过的一些项目。
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
