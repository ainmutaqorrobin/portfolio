import { cn } from '@/lib/utils'

/**
 * The happy path of a case study as a chain of steps, plus the failure case.
 *
 * Each arrow belongs to the step after it, so on wide screens a wrapped line
 * starts with "──▶ step" instead of leaving an arrow pointing at nothing. On
 * phones the chain runs top to bottom: full-width steps with a centred ↓
 * between them, so every arrow lines up whatever each label's length.
 */
export function FlowStrip({
    states,
    failState,
}: {
    states: string[]
    failState?: string
}) {
    return (
        <div className="flex flex-col gap-5 font-mono text-[13px]">
            <ol className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
                {states.map((state, i) => {
                    const done = i === states.length - 1
                    return (
                        <li
                            key={state}
                            className="flex flex-col items-center sm:flex-row"
                        >
                            {i > 0 ? (
                                <span
                                    aria-hidden
                                    className="py-1.5 text-faint sm:px-2.5 sm:py-0"
                                >
                                    <span className="sm:hidden">↓</span>
                                    <span className="hidden sm:inline">
                                        ──▶
                                    </span>
                                </span>
                            ) : null}
                            <span
                                className={cn(
                                    'w-full border px-3.5 py-2.5 text-center sm:w-auto sm:whitespace-nowrap',
                                    done
                                        ? 'border-ok text-ok'
                                        : 'border-line-strong'
                                )}
                            >
                                {state}
                            </span>
                        </li>
                    )
                })}
            </ol>
            {failState ? (
                <div className="flex flex-col gap-2 sm:items-start">
                    <span className="text-[11px] tracking-wider text-faint uppercase">
                        When it goes wrong
                    </span>
                    <span className="border border-dashed border-err px-3.5 py-2.5 text-center text-err sm:text-left">
                        {failState}
                    </span>
                </div>
            ) : null}
        </div>
    )
}
