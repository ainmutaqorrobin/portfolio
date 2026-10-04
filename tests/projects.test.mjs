import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const readJson = (file) =>
    JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'))

const projects = readJson('src/data/projects.json')
const profile = readJson('src/data/profile.json')
const statuses = new Set(['development', 'deprecated', 'live'])

test('projects.json contains the required project fields', () => {
    assert.ok(Array.isArray(projects), 'projects.json must export an array')
    assert.ok(
        projects.length > 0,
        'projects.json should contain at least one project'
    )

    for (const project of projects) {
        assert.match(project.slug, /^[a-z0-9-]+$/, `bad slug: ${project.slug}`)
        assert.equal(typeof project.name, 'string')
        assert.equal(typeof project.date, 'string')
        assert.equal(typeof project.featured, 'boolean')
        assert.equal(typeof project.tagline, 'string')
        assert.ok(Array.isArray(project.stack), 'stack must be an array')
        assert.ok(
            project.stack.length > 0,
            'stack must contain at least one item'
        )
        assert.ok(
            statuses.has(project.status),
            `invalid status: ${project.status}`
        )
        assert.equal(typeof project.githubRepo, 'string')
        assert.equal(typeof project.hostedLink, 'string')
        assert.ok(Array.isArray(project.summary), 'summary must be an array')
        assert.ok(
            project.summary.length > 0,
            'summary must contain at least one paragraph'
        )
        for (const paragraph of project.summary) {
            assert.equal(typeof paragraph, 'string')
        }
    }
})

test('every project has a detail page', () => {
    for (const project of projects) {
        assert.ok(project.caseStudy, `${project.slug} has no caseStudy`)
    }
})

test('project slugs are unique', () => {
    const slugs = projects.map((project) => project.slug)
    assert.equal(new Set(slugs).size, slugs.length)
})

test('project screenshots exist in public/', () => {
    for (const project of projects.filter((p) => p.image)) {
        const file = path.resolve(process.cwd(), 'public', `.${project.image}`)
        assert.ok(fs.existsSync(file), `missing image: ${project.image}`)
    }
})

test('case studies have every section the page renders', () => {
    for (const project of projects.filter((p) => p.caseStudy)) {
        const study = project.caseStudy
        const where = (key) => `${project.slug}: ${key}`
        for (const key of [
            'problem',
            'stackGroups',
            'decisions',
            'deploy',
            'lessons',
        ]) {
            assert.ok(
                Array.isArray(study[key]),
                where(`${key} must be an array`)
            )
        }
        assert.equal(typeof study.headline, 'string')

        const { diagram, flow } = study
        assert.equal(typeof diagram?.title, 'string', where('diagram'))
        const ids = new Set(diagram.nodes.map((node) => node.id))
        assert.equal(ids.size, diagram.nodes.length, where('duplicate node id'))
        const cells = new Set()
        for (const node of diagram.nodes) {
            assert.equal(typeof node.name, 'string')
            assert.equal(typeof node.detail, 'string')
            assert.ok(
                node.col >= 0 && node.col <= diagram.cols - 1,
                where(`${node.id} is outside the grid columns`)
            )
            assert.ok(
                node.row >= 0 && node.row < diagram.rows,
                where(`${node.id} is outside the grid rows`)
            )
            const cell = `${node.row}:${node.col}`
            assert.ok(!cells.has(cell), where(`two boxes share ${cell}`))
            cells.add(cell)
        }
        for (const edge of diagram.edges) {
            assert.ok(
                ids.has(edge.from),
                where(`edge from unknown ${edge.from}`)
            )
            assert.ok(ids.has(edge.to), where(`edge to unknown ${edge.to}`))
        }

        assert.equal(typeof flow?.title, 'string', where('flow'))
        assert.ok(flow.states.length > 0, where('no flow states'))
        assert.equal(new Set(flow.states).size, flow.states.length)
        assert.ok(flow.steps.length > 0, where('no flow steps'))
    }
})

test('every certification links to a verification page', () => {
    for (const cert of profile.certifications) {
        assert.equal(typeof cert.name, 'string')
        assert.equal(typeof cert.issuer, 'string')
        assert.match(cert.url, /^https:\/\//, `${cert.name} has no https link`)
    }
})

test('the resume download exists', () => {
    const file = path.resolve(process.cwd(), 'public', `.${profile.resume.pdf}`)
    assert.ok(fs.existsSync(file), `missing resume: ${profile.resume.pdf}`)
})

test('profile.json work history is newest first', () => {
    assert.ok(profile.workExperience.length > 0)
    for (const job of profile.workExperience) {
        assert.match(job.period, /^[A-Z][a-z]{2} \d{4} - /, job.company)
        assert.ok(job.highlights.length > 0, `${job.company} has no highlights`)
    }
    assert.match(profile.workExperience[0].period, /Present$/)
})
