import { useState } from 'react'
import { about } from '../content/about'

export function AboutSection() {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="min-w-0">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
              {photoFailed ? (
                <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-[var(--hero-text-muted)]">
                  YC
                </div>
              ) : (
                <img
                  src={about.photo}
                  alt="Young.Chou 的照片"
                  loading="lazy"
                  width={480}
                  height={600}
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--hero-text)] sm:text-4xl">
              关于我
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--hero-text-muted)] sm:text-lg">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-sm font-medium tracking-wide text-cyan-700 dark:text-cyan-300">
            {about.brandTag}
          </span>
        </div>
      </div>
    </section>
  )
}
