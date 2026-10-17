import { useState } from 'react'
import type { Project } from '../content/projects'

export function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg focus-within:border-cyan-400 motion-reduce:transition-none! motion-reduce:hover:translate-y-0! dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[var(--hero-text-muted)]">
            {project.name.slice(0, 1)}
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.name} 截图`}
            loading="lazy"
            width={640}
            height={360}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-semibold text-[var(--hero-text)]">{project.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--hero-text-muted)]">
          {project.description}
        </p>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`在 GitHub 查看 ${project.name}`}
            className="mt-auto inline-flex w-fit items-center pt-1 text-sm font-medium text-cyan-700 hover:text-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  )
}
