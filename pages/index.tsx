import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-50 overflow-x-hidden">
      <Navigation />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
