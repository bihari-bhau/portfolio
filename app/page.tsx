import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Skills, Experience, Projects, Education, Contact } from './components/Sections';
import ClientShell from './components/ClientShell';

export default function Page() {
  return (
    <>
      {/* Three.js + Cursor — client-only, lazy, never blocks SSG pre-render */}
      <ClientShell />

      {/* Nav */}
      <Navbar />

      {/* Sections — pre-rendered as static HTML at build time */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(0,229,255,0.08)',
        padding: '1.5rem 2.5rem',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.62rem', letterSpacing: '0.1em',
          color: 'var(--muted2)', maxWidth: '1200px', margin: '0 auto',
          fontFamily: 'var(--mono)',
        }}>
          <span>© 2025 Shubham Singh</span>
          <span>Next.js · Three.js · Framer Motion · Vercel</span>
          <span>[SS] Neural Blueprint v3.0</span>
        </div>
      </footer>
    </>
  );
}
