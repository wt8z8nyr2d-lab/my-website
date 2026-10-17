import { profile } from '../content/profile'
import { ParticleCanvas } from './ParticleCanvas'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh scroll-mt-20 items-center justify-center overflow-hidden px-6 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--hero-bg-from),var(--hero-bg-via),var(--hero-bg-to))]"
      />
      <ParticleCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--hero-scrim)]"
      />
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--hero-text)] sm:text-5xl md:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        {profile.role ? (
          <p className="mt-4 text-lg font-medium text-[var(--hero-text-muted)] sm:text-xl md:text-2xl">
            {profile.role}
          </p>
        ) : null}
        {profile.intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--hero-text-muted)] sm:text-lg">
            {profile.intro}
          </p>
        ) : null}
        <a
          href="#projects"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
        >
          查看项目
        </a>
      </div>
    </section>
  )
}
