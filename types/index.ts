export interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
  image?: string;
  url?: string;
  category?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location' | 'linkedin' | 'github';
  label: string;
  value: string;
  url?: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface AnimationState {
  waveAnimation: number;
  isPlaying: boolean;
}

/** Timeline copy lives in locales (`experience.timeline.{id}`); this is config only. */
export interface TimelineEntry {
  id: string;
  current?: boolean;
  tech: string[];
}

export interface DeployedProject {
  id: string;
  title: string;
  description: string;
  role?: string;
  highlight?: string;
  url: string;
  github?: string;
  /** Public URL under `/public`, e.g. `/images/my-app.webp` */
  image?: string;
  tech: string[];
  category: string;
  featured?: boolean;
}

export interface GithubProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: string[];
}
