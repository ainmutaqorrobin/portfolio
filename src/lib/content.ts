import profile from "@/data/profile.json";
import projects from "@/data/projects.json";

export type ProjectStatus = "development" | "deprecated" | "live";

export type Project = {
  name: string;
  date: string;
  stack: string[];
  status: ProjectStatus;
  githubRepo: string;
  hostedLink: string;
  summary: string;
};

export type WorkExperience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  heroSummary: string;
  availability: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
  };
  about: string[];
  workExperience: WorkExperience[];
  skills: string[];
};

export const siteProfile = profile as Profile;
export const siteProjects = projects as Project[];
