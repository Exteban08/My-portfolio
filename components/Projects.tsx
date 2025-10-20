import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectsProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: 'Symphony',
    description:
      'Enterprise collaboration platform with real-time audio processing and advanced analytics dashboard.',
    tech: ['Next.js', 'TypeScript', 'WebRTC', 'Node.js', 'PostgreSQL'],
    year: '2024',
    category: 'Full Stack',
  },
  {
    title: 'Resonance',
    description:
      'AI-powered analytics dashboard with machine learning models for predictive insights and data visualization.',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    year: '2024',
    category: 'AI/ML',
  },
  {
    title: 'Harmony',
    description:
      'Microservices architecture for scalable e-commerce platform with real-time inventory management.',
    tech: ['Docker', 'Kubernetes', 'Go', 'Redis', 'MongoDB'],
    year: '2023',
    category: 'Backend',
  },
  {
    title: 'Cadence',
    description:
      'Music streaming platform with advanced audio processing and social features for creators.',
    tech: ['React Native', 'Node.js', 'WebAudio API', 'Socket.io', 'AWS'],
    year: '2023',
    category: 'Mobile',
  },
];

export default function Projects({
  projects = defaultProjects,
}: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="work" className="py-32 bg-stone-50 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 tracking-tight mb-6">
            {t('projects.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 mx-auto mb-8" />
          <p className="text-xl text-stone-600 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className="bg-white border border-stone-200 transition-all duration-300 hover:border-stone-300 hover:shadow-lg">
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-stone-900/80 flex items-center justify-center transition-all duration-300 ${
                      hoveredProject === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="text-center text-stone-50">
                      <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-light tracking-wide">
                        {t('projects.viewProject')}
                      </p>
                    </div>
                  </div>

                  {/* Project Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-stone-900 text-stone-50 px-3 py-1 text-xs font-light tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Year */}
                  <div className="absolute top-4 right-4">
                    <span className="text-stone-400 text-sm font-light">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-light text-stone-900 tracking-tight mb-4 group-hover:text-stone-700 transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-stone-600 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="bg-stone-100 text-stone-700 px-3 py-1 text-xs font-light tracking-wide rounded-full hover:bg-stone-200 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button className="text-stone-600 hover:text-stone-900 transition-colors duration-200 font-light tracking-wide flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {t('projects.liveDemo')}
                    </button>
                    <button className="text-stone-600 hover:text-stone-900 transition-colors duration-200 font-light tracking-wide flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      {t('projects.source')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="border border-stone-300 text-stone-900 px-8 py-4 rounded-none font-light tracking-wide transition-all duration-200 hover:bg-stone-100 hover:border-stone-400 cursor-pointer">
            {t('projects.viewAllProjects')}
          </button>
        </div>
      </div>
    </section>
  );
}
