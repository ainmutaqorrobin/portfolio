import { Cpu } from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
    siAngular,
    siAnsible,
    siDocker,
    siExpress,
    siFirebase,
    siGrafana,
    siJavascript,
    siJest,
    siKubernetes,
    siMongodb,
    siNatsdotio,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siPostman,
    siPrometheus,
    siReact,
    siTerraform,
    siTypescript,
} from 'simple-icons'

const skillIconMap: Record<string, SimpleIcon> = {
    Angular: siAngular,
    Ansible: siAnsible,
    Docker: siDocker,
    Express: siExpress,
    Firebase: siFirebase,
    Grafana: siGrafana,
    JavaScript: siJavascript,
    Jest: siJest,
    Kubernetes: siKubernetes,
    MongoDB: siMongodb,
    'NATS Streaming': siNatsdotio,
    NestJS: siNestjs,
    'Next.js': siNextdotjs,
    'Node.js': siNodedotjs,
    PostgreSQL: siPostgresql,
    Postman: siPostman,
    Prometheus: siPrometheus,
    React: siReact,
    Terraform: siTerraform,
    TypeScript: siTypescript,
}

function SkillSvgIcon({ icon }: { icon: SimpleIcon }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            aria-label={icon.title}
            className="size-3.5 shrink-0"
            fill="currentColor"
        >
            <title>{icon.title}</title>
            <path d={icon.path} />
        </svg>
    )
}

export function SkillIcon({ skill }: { skill: string }) {
    const icon = skillIconMap[skill]

    if (!icon) {
        return <Cpu className="size-3.5 shrink-0" aria-hidden="true" />
    }

    return <SkillSvgIcon icon={icon} />
}
