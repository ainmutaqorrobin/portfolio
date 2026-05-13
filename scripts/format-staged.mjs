import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))

function run(command, args, options = {}) {
    return execFileSync(command, args, {
        cwd: repoRoot,
        encoding: 'utf8',
        ...options,
    })
}

const stagedFiles = run('git', [
    'diff',
    '--cached',
    '--name-only',
    '--diff-filter=ACMR',
])
    .split(/\r?\n/)
    .filter(Boolean)
    .map((file) => file.trim())
    .filter((file) => existsSync(resolve(repoRoot, file)))

if (stagedFiles.length === 0) {
    console.log('No staged files to format.')
    process.exit(0)
}

const prettierEntrypoint = resolve(
    repoRoot,
    'node_modules',
    'prettier',
    'bin',
    'prettier.cjs'
)

const repoRelativeFiles = stagedFiles.map((file) =>
    relative(repoRoot, resolve(repoRoot, file)).split(sep).join('/')
)

run(
    process.execPath,
    [prettierEntrypoint, '--ignore-unknown', '--write', ...repoRelativeFiles],
    {
        stdio: 'inherit',
    }
)

run('git', ['add', '--', ...repoRelativeFiles], {
    stdio: 'inherit',
})
