import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const gitDirectory = resolve(repoRoot, '.git')

if (!existsSync(gitDirectory)) {
    console.log('Skipping git hook setup because .git was not found.')
    process.exit(0)
}

execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    cwd: repoRoot,
    stdio: 'inherit',
})

console.log('Configured git hooks path to .githooks')
