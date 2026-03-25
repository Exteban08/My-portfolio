import type {
  TimelineEntry,
  DeployedProject,
  GithubProject,
  SkillCategory,
} from '@/types';

/** Profile link for empty GitHub tab + footer CTAs */
export const GITHUB_PROFILE_URL = 'https://github.com/Exteban08' as const;

/** Order: most recent first. Timeline copy: locales en/es common.json → experience.timeline.{id} */
export const timeline: TimelineEntry[] = [
  {
    id: 'consultoria-as',
    current: true,
    tech: ['React', 'TypeScript', 'Next.js', 'Django', 'REST APIs', 'AWS'],
  },
  {
    id: 'multiburo',
    tech: ['React', 'Redux', 'TypeScript', 'Ant Design', 'Django', 'REST APIs'],
  },
  {
    id: 'intouchcx',
    tech: [
      'React',
      'Redux',
      'TypeScript',
      'GraphQL',
      'Socket.io',
      'React Native',
      'AWS',
      'Sequelize',
      'Prisma',
    ],
  },
  {
    id: 'zf-suspension',
    tech: [
      'Industrial automation',
      'Monitoring systems',
      'FANUC',
      'Requirements engineering',
    ],
  },
  {
    id: 'zoltek',
    tech: [
      'Project engineering',
      'Manufacturing',
      'Technical documentation',
      'Cross-functional collaboration',
    ],
  },
];

/**
 * Live / deployed work.
 * Cover images: `public/images/<filename>.webp` → `image: '/images/<filename>.webp'`
 */
export const deployedProjects: DeployedProject[] = [
  {
    id: 'eva-protect',
    title: 'EVA Protect',
    description:
      'InsurTech platform focused on personal and asset protection — architecture and product from the ground up.',
    role: 'Co-founder & CTO',
    highlight: 'Co-founder & CTO',
    image: '/images/eva-protect.webp',
    gallery: [
      { src: '/images/dashboard-desktop.webp', captionKey: 'dashboardDesktop' },
      { src: '/images/dashboard-mobile.webp', captionKey: 'dashboardMobile' },
      { src: '/images/gps-desktop.webp', captionKey: 'gpsDesktop' },
      { src: '/images/gps-mobile.webp', captionKey: 'gpsMobile' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'AWS'],
    category: 'InsurTech / SaaS',
    featured: true,
  },
  {
    id: 'yayo-photo-film',
    title: 'Yayo Photo Film',
    description:
      'Photographer portfolio and booking flow with Astro, Supabase-backed media, and a manager area for content updates.',
    url: 'https://yayo-photo-film.vercel.app/',
    image: '/images/yayo-photo-film.webp',
    tech: ['Astro', 'Supabase', 'TypeScript', 'CSS'],
    category: 'Web / Creative',
  },
  {
    id: 'pokeshop',
    title: 'PokeShop',
    description:
      'Storefront-style React + Vite demo: Context state, listing cache, favorites, and per-Pokémon details and costs.',
    url: 'https://pokeshop-ashy.vercel.app/',
    github: 'https://github.com/Exteban08/Pokeshop',
    image: '/images/pokeshop.webp',
    tech: ['React', 'TypeScript', 'useContext', 'Vite'],
    category: 'Frontend',
  },
];

export const githubProjects: GithubProject[] = [];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'Monitor',
    color: 'blue',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Tailwind CSS',
      'Material UI',
      'Ant Design',
      'ShadCN UI',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    color: 'emerald',
    skills: ['Django', 'REST APIs', 'GraphQL', 'Sequelize', 'Prisma'],
  },
  {
    id: 'cloud',
    label: 'Cloud / DevOps',
    icon: 'Cloud',
    color: 'orange',
    skills: [
      'AWS S3',
      'AWS RDS',
      'AWS EC2',
      'AWS CodePipeline',
      'CI/CD',
      'Git',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: 'Smartphone',
    color: 'purple',
    skills: ['React Native'],
  },
  {
    id: 'tools',
    label: 'Tools & Methods',
    icon: 'Wrench',
    color: 'stone',
    skills: ['Git', 'Agile / Scrum', 'Socket.io', 'Problem Solving'],
  },
];
