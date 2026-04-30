'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import { personal, stats } from '../data/portfolio';

function useTyping(text: string) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    function type() {
      if (i < text.length) {
        setDisplay(text.slice(0, ++i));
        timeout = setTimeout(type, Math.random() * 60 + 30);
      } else {
        timeout = setTimeout(() => { i = 0; setDisplay(''); setTimeout(type, 400); }, 3000);
      }
    }
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, [text]);
  return display;
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const dur = 1800;
      const start = performance.now();
      function step(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className={styles.statVal}>{val.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const typed = useTyping(personal.heroTyping);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.prefix}>{typed}<span className={styles.caret}>_</span></div>

        <h1 className={styles.name}>
          <span
            className={styles.nameLine}
            style={{ transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 8}px)` }}
          >
            SHUBHAM
          </span>
          <span
            className={`${styles.nameLine} ${styles.accent}`}
            style={{ transform: `translate(${mousePos.x * 32}px, ${mousePos.y * 16}px)` }}
          >
            SINGH
          </span>
        </h1>

        <div className={styles.role}>
          <span className={styles.bracket}>&lt;</span>
          {personal.role}
          <span className={styles.bracket}>/&gt;</span>
        </div>

        <p className={styles.sub}>
          {personal.tagline}<br />
          <span className={styles.muted}>@ {personal.company} · {personal.location}</span>
        </p>

        <div className={styles.cta}>
          <a href="#projects" className={styles.btnPrimary}>view_projects()</a>
          <a href={`mailto:${personal.email}`} className={styles.btnGhost}>contact.init()</a>
        </div>
      </div>

      <div className={styles.statsPanel}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <Counter target={s.value} suffix={s.suffix} />
            <span className={styles.statKey}>{s.label}</span>
            {i < stats.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll_down()</span>
      </div>
    </section>
  );
}
