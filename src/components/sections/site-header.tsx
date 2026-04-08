import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Profile } from "@/lib/content";

export function SiteHeader({ role }: Pick<Profile, "role">) {
  return (
    <SectionReveal>
      <header className="sticky top-4 z-50">
        <div className="rounded-full border border-border/70 bg-background/70 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur xl:px-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Portfolio
              </p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
            <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
              <a className="transition-colors hover:text-foreground" href="#about">
                About
              </a>
              <a className="transition-colors hover:text-foreground" href="#experience">
                Experience
              </a>
              <a className="transition-colors hover:text-foreground" href="#projects">
                Projects
              </a>
              <a className="transition-colors hover:text-foreground" href="#contact">
                Contact
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </SectionReveal>
  );
}
