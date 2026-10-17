export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[50vh] scroll-mt-20 flex-col items-center justify-center gap-4 px-6 py-16 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-[var(--hero-text)] sm:text-4xl">
        联系我
      </h2>
      <p className="max-w-xl text-base text-[var(--hero-text-muted)] sm:text-lg">
        联系方式即将上线，敬请期待。
      </p>
    </section>
  )
}
