import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <About />
    </div>
  );
}
