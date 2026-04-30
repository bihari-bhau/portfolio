'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { personal } from '../data/portfolio';

const links = [
  { href: '#about',      label: 'about',     num: '01' },
  { href: '#skills',     label: 'skills',    num: '02' },
  { href: '#experience', label: 'work',      num: '03' },
  { href: '#projects',   label: 'projects',  num: '04' },
  { href: '#education',  label: 'education', num: '05' },
  { href: '#contact',    label: 'contact',   num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section
  useEffect(() => {
    const ids = links.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.bracket}>[</span>
        {personal.initials}
        <span className={styles.bracket}>]</span>
      </div>

      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className={active === l.href.slice(1) ? styles.active : ''}
            >
              <span className={styles.num}>{l.num}·</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.status}>
        <span className={styles.dot} />
        <span>available for hire</span>
      </div>
    </nav>
  );
}
