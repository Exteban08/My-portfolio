import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import {
  deployedProjects,
  githubProjects,
  GITHUB_PROFILE_URL,
} from '@/data/portfolio';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectCardCover from '@/components/ProjectCardCover';

type Tab = 'live' | 'github';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const { t } = useLanguage();

  return (
    <section
      id="work"
      className="py-32 bg-stone-50 dark:bg-stone-900 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight mb-6">
            {t('projects.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-8" />
          <p className="text-xl text-stone-600 dark:text-stone-400 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
            {(
              [
                { key: 'live', label: t('projects.liveProjects') },
                { key: 'github', label: t('projects.githubProjects') },
              ] as { key: Tab; label: string }[]
            ).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-light tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Live Projects ── */}
        {activeTab === 'live' && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {deployedProjects.map(project => (
              <div
                key={project.id}
                className={`group flex flex-col bg-white dark:bg-stone-800 border transition-all duration-300 hover:shadow-lg dark:hover:shadow-stone-900/50 ${
                  project.featured
                    ? 'border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500'
                    : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                <ProjectCardCover image={project.image} title={project.title}>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-stone-900/90 dark:bg-stone-50/95 text-stone-50 dark:text-stone-900 px-3 py-1 text-xs font-light tracking-wider backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </ProjectCardCover>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Co-founder badge */}
                  {project.highlight && (
                    <span className="inline-block border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-xs px-2.5 py-1 font-light tracking-widest uppercase mb-3 w-fit">
                      {project.highlight}
                    </span>
                  )}

                  <h3 className="text-2xl font-light text-stone-900 dark:text-stone-50 tracking-tight mb-3 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 px-3 py-1 text-xs font-light tracking-wide rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide flex items-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('projects.visitSite')}
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide flex items-center gap-2 text-sm"
                      >
                        <Github className="w-4 h-4" />
                        {t('projects.source')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── GitHub Projects ── */}
        {activeTab === 'github' && (
          <>
            {githubProjects.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map(project => (
                  <div
                    key={project.id}
                    className="group bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-md transition-all duration-200 p-6 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-light tracking-wider text-stone-500 dark:text-stone-400 uppercase border border-stone-200 dark:border-stone-700 px-2 py-0.5">
                        {project.category}
                      </span>
                      <Github className="w-4 h-4 text-stone-400 dark:text-stone-500 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-200" />
                    </div>

                    <h3 className="text-lg font-light text-stone-900 dark:text-stone-50 tracking-tight mb-2 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map(tech => (
                        <span
                          key={tech}
                          className="bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-0.5 text-xs font-light rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide flex items-center gap-2 text-sm"
                    >
                      <Github className="w-4 h-4" />
                      {t('projects.viewOnGithub')}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-20 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
                <Github className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-6" />
                <h3 className="text-xl font-light text-stone-700 dark:text-stone-300 mb-3">
                  {t('projects.githubEmptyTitle')}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 font-light max-w-md mx-auto leading-relaxed mb-8">
                  {t('projects.githubEmptySubtitle')}
                </p>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-50 px-6 py-3 font-light tracking-wide hover:bg-stone-100 dark:hover:bg-stone-700 hover:border-stone-400 transition-all duration-200 text-sm"
                >
                  <Github className="w-4 h-4" />
                  {t('projects.visitGithub')}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
