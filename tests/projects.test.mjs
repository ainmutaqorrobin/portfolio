import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve(process.cwd(), "src/data/projects.json");
const rawProjects = fs.readFileSync(projectsPath, "utf8");
const projects = JSON.parse(rawProjects);
const statuses = new Set(["development", "deprecated", "live"]);

test("projects.json contains the required project fields", () => {
  assert.ok(Array.isArray(projects), "projects.json must export an array");
  assert.ok(projects.length > 0, "projects.json should contain at least one project");

  for (const project of projects) {
    assert.equal(typeof project.name, "string");
    assert.equal(typeof project.date, "string");
    assert.ok(Array.isArray(project.stack), "stack must be an array");
    assert.ok(project.stack.length > 0, "stack must contain at least one item");
    assert.ok(statuses.has(project.status), `invalid status: ${project.status}`);
    assert.equal(typeof project.githubRepo, "string");
    assert.equal(typeof project.hostedLink, "string");
  }
});
