'use client';

import styles from './Sections.module.css';
import { about, skills, experience, projects, education, certifications, personal } from '../data/portfolio';
import { useReveal } from './useReveal';

/* ─────────────────────────────────────────
   Shared reveal wrapper — hooks at top level
   ───────────────────────────────────────── */
function Reveal({ delay = 0, children, className = '' }: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────── */
export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.tag}>// section_01</div>
      <h2 className={styles.title}>about<span className={styles.blink}>_</span></h2>
      <div className={styles.aboutGrid}>

        <Reveal>
          <div>
            {about.map((p, i) => (
              <p key={i} className={styles.aboutP} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.card}>
          <div className={styles.cardHeader}>// identity.json</div>
          <div className={styles.jsonBlock}>
            {[
              ['"name"',        `"${personal.name}"`],
              ['"role"',        '"LLM Post-Training Intern"'],
              ['"company"',     `"${personal.company}"`],
              ['"location"',    `"${personal.location}"`],
              ['"education"',   `"${personal.education}"`],
              ['"phone"',       `"${personal.phone}"`],
              ['"email"',       `"${personal.email}"`],
              ['"open_to_work"','true'],
            ].map(([k, v], i) => (
              <div key={i} className={styles.jsonLine}>
                <span className={styles.jsonKey}>{k}</span>:{' '}
                {k === '"open_to_work"'
                  ? <span className={styles.jsonBool}>{v}</span>
                  : <span className={styles.jsonStr}>{v}</span>}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SKILLS — each block is its own component
   ───────────────────────────────────────── */
function SkillBlock({ category, items, delay }: {
  category: string;
  items: { label: string; hot: boolean }[];
  delay: number;
}) {
  // Hook at top level of this component — ✅ valid
  const { ref, visible } = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`${styles.skillBlock} ${styles.reveal} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.skillHeader}>◈ {category}</div>
      <div className={styles.tagRow}>
        {items.map(item => (
          <span key={item.label} className={`${styles.tag} ${item.hot ? styles.hot : ''}`}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.tag}>// section_02</div>
      <h2 className={styles.title}>skills<span className={styles.blink}>_</span></h2>
      <div className={styles.skillsGrid}>
        {skills.map((cat, i) => (
          <SkillBlock
            key={cat.category}
            category={cat.category}
            items={cat.items}
            delay={i * 100}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   EXPERIENCE — each job is its own component
   ───────────────────────────────────────── */
function ExpCard({ job, delay, isLast }: {
  job: typeof experience[0];
  delay: number;
  isLast: boolean;
}) {
  const { ref, visible } = useReveal(delay);
  return (
    <div className={styles.timelineItem}>
      <div className={styles.dot} />
      {!isLast && <div className={styles.connector} />}
      <div
        ref={ref}
        className={`${styles.expCard} ${styles.reveal} ${visible ? styles.visible : ''}`}
      >
        <div className={styles.expMeta}>
          <span className={styles.expPeriod}>{job.period}</span>
          <span className={`${styles.badge} ${!job.active ? styles.done : ''}`}>
            {job.active ? 'active' : 'completed'}
          </span>
        </div>
        <div className={styles.expCompany}>{job.company}</div>
        <div className={styles.expRole}>{job.role} · {job.location}</div>
        <p className={styles.expDesc}>{job.summary}</p>
        <ul className={styles.bullets}>
          {job.bullets.map((b, bi) => (
            <li key={bi} dangerouslySetInnerHTML={{ __html: b }} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.tag}>// section_03</div>
      <h2 className={styles.title}>experience<span className={styles.blink}>_</span></h2>
      <div className={styles.timeline}>
        {experience.map((job, ji) => (
          <ExpCard
            key={job.company}
            job={job}
            delay={ji * 120}
            isLast={ji === experience.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECTS — each card is its own component
   ───────────────────────────────────────── */
function ProjectCard({ project, delay }: {
  project: typeof projects[0];
  delay: number;
}) {
  const { ref, visible } = useReveal(delay);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    e.currentTarget.style.transform =
      `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) translateZ(4px)`;
    e.currentTarget.style.transition = 'transform 0.05s ease-out';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(600px) rotateY(0) rotateX(0) translateZ(0)';
    e.currentTarget.style.transition = 'transform 0.4s ease-out';
  };

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${project.featured ? styles.featured : ''} ${styles.reveal} ${visible ? styles.visible : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.pcNum}>{project.index}</div>
      <div className={styles.pcTag}>{project.tag}</div>
      <h3 className={styles.pcTitle}>{project.title}</h3>
      <p className={styles.pcDesc}>{project.desc}</p>
      <div className={styles.pcStack}>
        {project.stack.map(s => <span key={s}>{s}</span>)}
      </div>
      <div className={styles.pcLinks}>
        {project.links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={styles.pcLink}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.tag}>// section_04</div>
      <h2 className={styles.title}>projects<span className={styles.blink}>_</span></h2>
      <div className={styles.projectsGrid}>
        {projects.map((p, pi) => (
          <ProjectCard key={p.index} project={p} delay={pi * 60} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   EDUCATION & CERTS
   ───────────────────────────────────────── */
export function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.tag}>// section_05</div>
      <h2 className={styles.title}>education &amp; certs<span className={styles.blink}>_</span></h2>
      <div className={styles.eduGrid}>

        <Reveal className={styles.eduCard}>
          {education.map(ed => (
            <div key={ed.degree}>
              <div className={styles.eduYear}>{ed.period}</div>
              <div className={styles.eduDegree}>{ed.degree}</div>
              <div className={styles.eduInst}>{ed.institution}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className={styles.certsCard}>
          <div className={styles.cardHeader}>// certifications[]</div>
          <ul className={styles.certList}>
            {certifications.map(cert => (
              <li key={cert}>
                <span className={styles.certDot}>◆</span>
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT
   ───────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.tag}>// section_06</div>
      <h2 className={styles.title}>contact<span className={styles.blink}>_</span></h2>
      <div className={styles.contactGrid}>

        <Reveal>
          <div className={styles.contactHead}>
            <span>let's</span>
            <span className={styles.cyan}>build()</span>
            <span>together</span>
          </div>
          <p className={styles.contactSub}>
            Open to full-time roles in backend, full-stack, and AI/ML-adjacent engineering.
            Based in Gurugram — available remotely or on-site.
          </p>
        </Reveal>

        <Reveal delay={120} className={styles.contactLinks}>
          {[
            { type: '// email',    val: personal.email,                    href: `mailto:${personal.email}` },
            { type: '// phone',    val: personal.phone,                    href: `tel:${personal.phone.replace(/\s/g,'')}` },
            { type: '// linkedin', val: 'linkedin.com/in/biharibhau',      href: personal.linkedin },
            { type: '// github',   val: 'github.com/bihari-bhau',          href: personal.github },
          ].map(link => (
            <a key={link.type} href={link.href} target="_blank" rel="noreferrer" className={styles.contactLink}>
              <span className={styles.clType}>{link.type}</span>
              <span className={styles.clVal}>{link.val}</span>
              <span className={styles.clArrow}>→</span>
            </a>
          ))}
        </Reveal>

      </div>
    </section>
  );
}
