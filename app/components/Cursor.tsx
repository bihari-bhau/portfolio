'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0, dx = 0, dy = 0;
  let raf: number;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = dx + 'px';
        dotRef.current.style.top  = dy + 'px';
      }
    };

    const animate = () => {
      rx += (dx - rx) * 0.12;
      ry += (dy - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ringRef.current.style.borderColor = 'rgba(0,229,255,0.45)';
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
        ringRef.current.style.borderColor = 'var(--cyan)';
      }
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef}  className={styles.dot}  />
    </>
  );
}
