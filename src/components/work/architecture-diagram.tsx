import type { CSSProperties } from 'react'

import { DiagramReveal } from '@/components/work/diagram-reveal'
import type { Diagram, DiagramEdge, DiagramNode } from '@/lib/content'
import { cn } from '@/lib/utils'

// Layout in viewBox units; the SVG scales to its container.
const WIDTH = 1000
const NODE_H = 88
const ROW_GAP = 92
const TOP = 52
const NODE_INSET = 14
const ZONE_HEAD = 30
const ZONE_PAD = 14
const LOOP = 46
const STRAIGHT_MIN_GAP = 90
const LABEL_CHAR_W = 6.7
const ZONE_CHAR_W = 8.1

type Point = { x: number; y: number }
type Box = {
    x: number
    y: number
    w: number
    h: number
    cx: number
    cy: number
}
type Side = 'top' | 'bottom' | 'left' | 'right'
type Shape = 'vertical' | 'straight' | 'over' | 'under'

type Plan = {
    edge: DiagramEdge
    from: Box
    to: Box
    shape: Shape
    fromSide: Side
    toSide: Side
    row: number
}

/**
 * Draws a case study's architecture as an SVG: boxes on a grid, curved
 * arrows between them, and dashed zones for hosts, clusters and subnets.
 */
export function ArchitectureDiagram({
    diagram,
    id,
}: {
    diagram: Diagram
    id: string
}) {
    const cellW = WIDTH / diagram.cols
    const rowY = (row: number) => TOP + row * (NODE_H + ROW_GAP)
    const height = rowY(diagram.rows - 1) + NODE_H + ZONE_PAD + 40

    const nodes = new Map(diagram.nodes.map((node) => [node.id, node]))
    const boxes = new Map<string, Box>()
    for (const node of diagram.nodes) {
        const w = cellW - NODE_INSET * 2
        const cx = (node.col + 0.5) * cellW
        const y = rowY(node.row)
        boxes.set(node.id, {
            x: cx - w / 2,
            y,
            w,
            h: NODE_H,
            cx,
            cy: y + NODE_H / 2,
        })
    }

    const zones = (diagram.zones ?? []).map((zone) => {
        const inset = zone.inset ?? 0
        const x = zone.col * cellW + 4 + inset
        const y = rowY(zone.row) - ZONE_HEAD - 8
        const bottom =
            rowY(zone.row + zone.rowSpan - 1) + NODE_H + ZONE_PAD - inset
        return {
            label: zone.label,
            x,
            y,
            w: zone.colSpan * cellW - 8 - inset * 2,
            h: bottom - y,
        }
    })

    const plans = diagram.edges.map((edge) => planEdge(edge, nodes, boxes))
    const anchors = spreadAnchors(plans)
    const arrow = `${id}-arrow`
    const arrowAsync = `${id}-arrow-async`

    return (
        <DiagramReveal className="overflow-x-auto">
            <svg
                viewBox={`0 0 ${WIDTH} ${height}`}
                role="img"
                aria-labelledby={`${id}-title ${id}-desc`}
                className="h-auto w-full min-w-[760px]"
            >
                <title id={`${id}-title`}>{diagram.title}</title>
                <desc id={`${id}-desc`}>{describe(diagram)}</desc>
                <defs>
                    <Marker id={arrow} color="#8e8a80" />
                    <Marker id={arrowAsync} color="#ffb224" />
                </defs>

                {zones.map((zone) => (
                    <rect
                        key={zone.label}
                        x={zone.x}
                        y={zone.y}
                        width={zone.w}
                        height={zone.h}
                        rx={6}
                        fill="#1a1a18"
                        fillOpacity={0.45}
                        stroke="#3a3934"
                        strokeDasharray="6 5"
                        className="diagram-zone"
                    />
                ))}

                {plans.map((plan, i) => {
                    const start = anchors.get(`${i}|from`)!
                    const end = anchors.get(`${i}|to`)!
                    const [c1, c2] = controls(plan.shape, start, end)
                    const async = plan.edge.async
                    return (
                        <path
                            key={`${plan.edge.from}-${plan.edge.to}`}
                            d={`M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`}
                            fill="none"
                            stroke={async ? '#ffb224' : '#8e8a80'}
                            strokeOpacity={async ? 0.9 : 0.75}
                            strokeWidth={1.4}
                            pathLength={async ? undefined : 1}
                            markerEnd={`url(#${async ? arrowAsync : arrow})`}
                            markerStart={
                                plan.edge.both
                                    ? `url(#${async ? arrowAsync : arrow})`
                                    : undefined
                            }
                            className={
                                async ? 'diagram-edge-async' : 'diagram-edge'
                            }
                            style={{ '--r': plan.row } as CSSProperties}
                        />
                    )
                })}

                {/* Above the arrows, so a line crossing a zone never strikes its name. */}
                {zones.map((zone) => (
                    <g key={`${zone.label}-label`} className="diagram-zone">
                        <rect
                            x={zone.x + 6}
                            y={zone.y + 6}
                            width={zone.label.length * ZONE_CHAR_W + 14}
                            height={20}
                            fill="#151514"
                        />
                        <text
                            x={zone.x + 12}
                            y={zone.y + 16}
                            dominantBaseline="central"
                            className="fill-faint font-mono text-[11px] tracking-wider uppercase"
                        >
                            {zone.label}
                        </text>
                    </g>
                ))}

                {diagram.nodes.map((node) => (
                    <NodeBox
                        key={node.id}
                        node={node}
                        box={boxes.get(node.id)!}
                    />
                ))}

                {plans.map((plan, i) => {
                    if (!plan.edge.label) return null
                    const start = anchors.get(`${i}|from`)!
                    const end = anchors.get(`${i}|to`)!
                    const [c1, c2] = controls(plan.shape, start, end)
                    const mid = bezierMid(start, c1, c2, end)
                    const w = plan.edge.label.length * LABEL_CHAR_W + 14
                    return (
                        <g
                            key={`${plan.edge.from}-${plan.edge.to}-label`}
                            className="diagram-label"
                            style={{ '--r': plan.row } as CSSProperties}
                        >
                            <rect
                                x={mid.x - w / 2}
                                y={mid.y - 10}
                                width={w}
                                height={20}
                                rx={3}
                                fill="#0f0f0e"
                            />
                            <text
                                x={mid.x}
                                y={mid.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                className={cn(
                                    'font-mono text-[11px]',
                                    plan.edge.async ? 'fill-accent' : 'fill-dim'
                                )}
                            >
                                {plan.edge.label}
                            </text>
                        </g>
                    )
                })}
            </svg>
            <Legend />
        </DiagramReveal>
    )
}

function NodeBox({ node, box }: { node: DiagramNode; box: Box }) {
    return (
        <foreignObject
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            className="diagram-node"
            style={{ '--r': node.row } as CSSProperties}
        >
            <div
                className={cn(
                    'flex h-full flex-col justify-center gap-1 overflow-hidden bg-ink px-3',
                    node.kind === 'store'
                        ? 'border-[3px] border-double'
                        : node.kind === 'external'
                          ? 'border border-dashed'
                          : 'border',
                    node.highlight ? 'border-accent' : 'border-line-strong'
                )}
            >
                <div
                    className={cn(
                        'font-mono text-[13px] leading-tight font-semibold',
                        node.highlight ? 'text-accent' : 'text-fg'
                    )}
                >
                    {node.name}
                </div>
                <div className="text-[12px] leading-snug text-dim">
                    {node.detail}
                </div>
            </div>
        </foreignObject>
    )
}

function Marker({ id, color }: { id: string; color: string }) {
    return (
        <marker
            id={id}
            viewBox="0 0 10 10"
            refX={9}
            refY={5}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
        >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>
    )
}

function Legend() {
    return (
        <ul className="mt-4 flex min-w-[760px] flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-faint">
            <li className="flex items-center gap-2">
                <span className="w-7 border-t border-faint" />
                request
            </li>
            <li className="flex items-center gap-2">
                <span className="w-7 border-t border-dashed border-accent" />
                async · queue · event
            </li>
            <li className="flex items-center gap-2">
                <span className="h-3.5 w-5 border border-dashed border-line-strong" />
                external service
            </li>
            <li className="flex items-center gap-2">
                <span className="h-3.5 w-5 border-[3px] border-double border-line-strong" />
                data store
            </li>
        </ul>
    )
}

function planEdge(
    edge: DiagramEdge,
    nodes: Map<string, DiagramNode>,
    boxes: Map<string, Box>
): Plan {
    const a = nodes.get(edge.from)
    const b = nodes.get(edge.to)
    if (!a || !b) {
        throw new Error(
            `Diagram edge ${edge.from} → ${edge.to} names a missing node`
        )
    }
    const from = boxes.get(a.id)!
    const to = boxes.get(b.id)!
    const row = Math.min(a.row, b.row)

    if (a.row !== b.row) {
        const down = b.row > a.row
        return {
            edge,
            from,
            to,
            row,
            shape: 'vertical',
            fromSide: down ? 'bottom' : 'top',
            toSide: down ? 'top' : 'bottom',
        }
    }

    const gap = Math.abs(to.cx - from.cx) - from.w
    if (!edge.route && gap >= STRAIGHT_MIN_GAP) {
        const right = to.cx > from.cx
        return {
            edge,
            from,
            to,
            row,
            shape: 'straight',
            fromSide: right ? 'right' : 'left',
            toSide: right ? 'left' : 'right',
        }
    }

    // Boxes too close for a straight arrow loop over or under the row.
    const shape = edge.route ?? 'over'
    const side = shape === 'over' ? 'top' : 'bottom'
    return { edge, from, to, row, shape, fromSide: side, toSide: side }
}

/**
 * Several edges leaving the same side of a box would overlap at its centre;
 * spread them along the side, ordered by where each one is heading.
 */
function spreadAnchors(plans: Plan[]) {
    const sides = new Map<
        string,
        { key: string; box: Box; side: Side; toward: number }[]
    >()
    const add = (box: Box, side: Side, key: string, other: Box) => {
        const id = `${box.x},${box.y}|${side}`
        const toward = side === 'top' || side === 'bottom' ? other.cx : other.cy
        const list = sides.get(id) ?? []
        list.push({ key, box, side, toward })
        sides.set(id, list)
    }
    plans.forEach((plan, i) => {
        add(plan.from, plan.fromSide, `${i}|from`, plan.to)
        add(plan.to, plan.toSide, `${i}|to`, plan.from)
    })

    const anchors = new Map<string, Point>()
    for (const list of sides.values()) {
        list.sort((p, q) => p.toward - q.toward)
        list.forEach(({ key, box, side }, k) => {
            const horizontal = side === 'top' || side === 'bottom'
            const span = Math.min(
                (horizontal ? box.w : box.h) * 0.6,
                (list.length - 1) * (horizontal ? 34 : 20)
            )
            const offset =
                list.length === 1
                    ? 0
                    : -span / 2 + (span * k) / (list.length - 1)
            anchors.set(
                key,
                side === 'top'
                    ? { x: box.cx + offset, y: box.y }
                    : side === 'bottom'
                      ? { x: box.cx + offset, y: box.y + box.h }
                      : side === 'left'
                        ? { x: box.x, y: box.cy + offset }
                        : { x: box.x + box.w, y: box.cy + offset }
            )
        })
    }
    return anchors
}

function controls(shape: Shape, a: Point, b: Point): [Point, Point] {
    switch (shape) {
        case 'vertical': {
            const dy = (b.y - a.y) / 2
            return [
                { x: a.x, y: a.y + dy },
                { x: b.x, y: b.y - dy },
            ]
        }
        case 'straight': {
            const dx = (b.x - a.x) / 2
            return [
                { x: a.x + dx, y: a.y },
                { x: b.x - dx, y: b.y },
            ]
        }
        case 'over':
            return [
                { x: a.x, y: a.y - LOOP },
                { x: b.x, y: b.y - LOOP },
            ]
        case 'under':
            return [
                { x: a.x, y: a.y + LOOP },
                { x: b.x, y: b.y + LOOP },
            ]
    }
}

function bezierMid(p0: Point, c1: Point, c2: Point, p3: Point): Point {
    return {
        x: (p0.x + 3 * c1.x + 3 * c2.x + p3.x) / 8,
        y: (p0.y + 3 * c1.y + 3 * c2.y + p3.y) / 8,
    }
}

/** Plain-text version of the diagram for screen readers. */
function describe(diagram: Diagram) {
    const names = new Map(diagram.nodes.map((node) => [node.id, node.name]))
    const parts = diagram.nodes.map((node) => `${node.name}: ${node.detail}.`)
    const links = diagram.edges.map(
        (edge) =>
            `${names.get(edge.from)} ${edge.both ? '↔' : '→'} ${names.get(edge.to)}${
                edge.label ? ` (${edge.label})` : ''
            }.`
    )
    return [...parts, ...links].join(' ')
}
