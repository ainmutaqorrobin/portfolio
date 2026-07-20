import { Cpu } from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
    siAmazonwebservices,
    siAngular,
    siAnsible,
    siBootstrap,
    siBun,
    siCloudflare,
    siDocker,
    siDrizzle,
    siExpo,
    siExpress,
    siFirebase,
    siGit,
    siGithubactions,
    siGnubash,
    siGrafana,
    siJavascript,
    siJest,
    siKnip,
    siKubernetes,
    siLetsencrypt,
    siLucide,
    siMongodb,
    siNatsdotio,
    siNestjs,
    siNextdotjs,
    siNginx,
    siNodedotjs,
    siNpm,
    siOpenai,
    siPostgresql,
    siPostman,
    siPrometheus,
    siRadixui,
    siReact,
    siRedis,
    siShadcnui,
    siSwagger,
    siTailwindcss,
    siTerraform,
    siTypescript,
} from 'simple-icons'

const skillIconMap: Record<string, SimpleIcon> = {
    Angular: siAngular,
    Ansible: siAnsible,
    AWS: siAmazonwebservices,
    'AWS S3': siAmazonwebservices,
    Bash: siGnubash,
    Bootstrap: siBootstrap,
    Bun: siBun,
    Cloudflare: siCloudflare,
    Docker: siDocker,
    Drizzle: siDrizzle,
    Expo: siExpo,
    Express: siExpress,
    Firebase: siFirebase,
    Git: siGit,
    'GitHub Actions': siGithubactions,
    Grafana: siGrafana,
    JavaScript: siJavascript,
    Jest: siJest,
    Knip: siKnip,
    Kubernetes: siKubernetes,
    "Let's Encrypt": siLetsencrypt,
    'Lucide Icons': siLucide,
    MongoDB: siMongodb,
    'NATS Streaming': siNatsdotio,
    NestJS: siNestjs,
    'Next.js': siNextdotjs,
    Nginx: siNginx,
    'Node.js': siNodedotjs,
    npm: siNpm,
    OpenAI: siOpenai,
    PostgreSQL: siPostgresql,
    Postman: siPostman,
    Prometheus: siPrometheus,
    RadixUI: siRadixui,
    React: siReact,
    Redis: siRedis,
    ShadCN: siShadcnui,
    Swagger: siSwagger,
    'Tailwind CSS': siTailwindcss,
    Terraform: siTerraform,
    TypeScript: siTypescript,
}

export function SkillSvgIcon({
    icon,
    className = 'size-3.5 shrink-0',
}: {
    icon: SimpleIcon
    className?: string
}) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            aria-label={icon.title}
            className={className}
            fill="currentColor"
        >
            <title>{icon.title}</title>
            <path d={icon.path} />
        </svg>
    )
}

export function SkillIcon({
    skill,
    className = 'size-3.5 shrink-0',
}: {
    skill: string
    className?: string
}) {
    const icon = skillIconMap[skill]

    if (!icon) {
        return <Cpu className={className} aria-hidden="true" />
    }

    return <SkillSvgIcon icon={icon} className={className} />
}

export { skillIconMap }
