# Personal Portfolio Starter

This repo gives you:

- a single-page portfolio with these sections: Hero, About Me, Work Experience, Skills & Projects, Contact
- one central project data file at `src/data/projects.json`
- Docker packaging for production deployment
- GitHub Actions CI/CD that tests, builds, pushes an image to Docker Hub, then deploys to your VPS over SSH

## Files You Will Edit Most

- `src/data/profile.json`: your name, role, about text, work history, skills, and contact info
- `src/data/projects.json`: project name, date, stack, status, repo link, and hosted link
- `src/app/page.tsx`: layout structure if you want to change sections later
- `src/app/globals.css`: visual style

## Local Development

Prerequisites:

- Node.js 20+
- npm
- Git

Steps:

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Content

Update your portfolio content inside:

- `src/data/profile.json`
- `src/data/projects.json`

Recommended project status values:

- `development`
- `live`
- `deprecated`

## Docker

Build locally:

```bash
docker build -t portfolio .
```

Run locally:

```bash
docker run -p 3000:3000 portfolio
```

## CI/CD Goal

The workflow in `.github/workflows/ci-cd.yml` does this on every push to `main`:

1. install dependencies
2. run tests
3. build the Next.js app
4. build and push a Docker image to Docker Hub
5. SSH into your VPS
6. pull the latest image
7. restart the container with Docker Compose

## Prerequisites For VPS Deployment

Prepare these before enabling deployment:

1. A VPS with SSH access
2. Docker Engine installed on the VPS
3. Docker Compose installed on the VPS
4. A GitHub repository for this project
5. A Docker Hub account and repository access
6. An Azure VM or other VPS with Docker installed
7. A public IP or domain pointing to your VPS

## One-Time VPS Setup

1. SSH into the server.
2. Create an app directory, for example `/opt/portfolio`.
3. Copy `compose.yml` and `.env` to that directory.
4. Create `.env` from `.env.example` and set the real image name and Docker Hub credentials.
5. Run:

```bash
docker login
docker compose pull
docker compose up -d
```

## GitHub Secrets You Need

Create these repository secrets:

- `DOCKER_USERNAME`
- `DOCKERHUB_TOKEN`
- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_PRIVATE_KEY`
- `VPS_PORT`
- `VPS_APP_DIR`

Notes:

- `DOCKERHUB_TOKEN` should be a Docker Hub access token with read and write access for CI push and VPS pull.
- `VPS_SSH_PRIVATE_KEY` should contain the private key that matches the public key already added to `~/.ssh/authorized_keys` on the VPS.
- `VPS_APP_DIR` should be the directory containing `compose.yml` on the server.

## Recommended Next Steps

1. Update your portfolio content.
2. Run `npm install`.
3. Run `npm test` and `npm run build`.
4. Push to GitHub.
5. Set repository secrets.
6. Prepare the Azure VM and copy `compose.yml` plus `.env` to it.
7. Enable deploys from the `main` branch.

## Optional Improvements

- Add a downloadable resume button
- Add project screenshots
- Add blog posts or case studies
- Add analytics
- Add a contact form backed by an API route or external service
