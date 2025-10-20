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

