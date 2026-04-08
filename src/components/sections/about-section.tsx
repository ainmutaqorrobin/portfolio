import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile } from "@/lib/content";

export function AboutSection({ about }: Pick<Profile, "about">) {
  return (
    <SectionReveal id="about" delay={80}>
      <Card>
        <CardHeader className="gap-3">
          <Badge variant="outline" className="w-fit">
            About Me
          </Badge>
          <CardTitle className="text-3xl sm:text-4xl">
            What I work on and how I approach delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {about.map((paragraph) => (
            <p
              key={paragraph}
              className="rounded-2xl border border-border/60 bg-secondary/35 p-5 text-sm leading-7 text-muted-foreground sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </SectionReveal>
  );
}
