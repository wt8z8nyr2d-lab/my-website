import { profile } from '../content/profile'
import { ThemeToggle } from './ThemeToggle'

const navigation = [
  { href: '#home', label: '首页' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系我' },
]

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-md">
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6"
      >
        <a
          href="#home"
          aria-label="返回首页"
          className="block min-w-0 max-w-[40%] truncate text-base font-semibold text-[var(--hero-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 sm:max-w-none sm:text-lg"
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="flex items-center gap-3 text-sm sm:gap-6 sm:text-base">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[var(--hero-text-muted)] hover:text-[var(--hero-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
