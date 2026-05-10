// // ============================================================
// // PORTFOLIO DATA — single source of truth
// // Edit this file to update all content across the site
// // ============================================================

// export const personal = {
//   name: 'Shubham Singh',
//   initials: 'SS',
//   role: 'LLM Post-Training Engineer',
//   company: 'Ethara AI',
//   location: 'Gurugram, Haryana, India',
//   email: 'sdr95958@gmail.com',
//   phone: '+91 76438 66040',
//   github: 'https://github.com/bihari-bhau',
//   linkedin: 'https://linkedin.com/in/biharibhau',
//   education: 'B.Tech EEE · 2025',
//   tagline: 'Evaluating AI agents · Benchmarking language models · Shipping full-stack platforms',
//   heroTyping: 'initializing portfolio_v3.sh...',
// };

// export const stats = [
//   { value: 500, suffix: '+', label: 'responses_per_week' },
//   { value: 54,  suffix: '',  label: 'python_libs_benchmarked' },
//   { value: 33,  suffix: '',  label: 'courses_on_skill_hub' },
//   { value: 2,   suffix: '',  label: 'live_deployed_apps' },
// ];

// export const about = [
//   `EEE graduate turned AI engineer. I crossed from <strong>circuits and electrons</strong> into <strong>tokens and embeddings</strong> — not because it was easy, but because the frontier needed builders who understood both the signal and the noise.`,
//   `Currently at <span class="cyan">Ethara AI</span>, I evaluate LLM responses across 6 quality dimensions, benchmark AI coding agents (Claude, GPT, Kimi) using the <span class="cyan">Commit0 framework</span> across 54 Python libraries, and surface multi-turn degradation patterns to inform fine-tuning decisions.`,
//   `Previously at <span class="cyan">KodNest</span> as a Full Stack SDE Intern — built Django/React apps and optimised SQL queries for a <strong>30% improvement</strong> in data retrieval efficiency. Actively seeking full-time roles in backend, full-stack, and AI/ML engineering.`,
// ];

// export const skills = [
//   {
//     category: 'AI / LLM',
//     items: [
//       { label: 'Post-Training Evaluation', hot: true },
//       { label: 'Agent Benchmarking', hot: true },
//       { label: 'RLHF', hot: true },
//       { label: 'Prompt Engineering', hot: false },
//       { label: 'Multi-turn Analysis', hot: false },
//       { label: 'Commit0', hot: false },
//       { label: 'Aider', hot: false },
//     ],
//   },
//   {
//     category: 'Backend / Data',
//     items: [
//       { label: 'Python', hot: true },
//       { label: 'Django REST', hot: true },
//       { label: 'Java', hot: false },
//       { label: 'JDBC / Servlets', hot: false },
//       { label: 'Hibernate ORM', hot: false },
//       { label: 'PostgreSQL', hot: false },
//       { label: 'MySQL', hot: false },
//       { label: 'SQLite', hot: false },
//       { label: 'REST APIs', hot: false },
//     ],
//   },
//   {
//     category: 'Frontend / DevOps',
//     items: [
//       { label: 'React.js', hot: true },
//       { label: 'Next.js', hot: true },
//       { label: 'JavaScript', hot: false },
//       { label: 'HTML5 / CSS3', hot: false },
//       { label: 'Streamlit', hot: false },
//       { label: 'Docker', hot: false },
//       { label: 'Git / GitHub', hot: false },
//       { label: 'Vercel', hot: false },
//       { label: 'Railway', hot: false },
//       { label: 'Linux', hot: false },
//     ],
//   },
// ];

// export const experience = [
//   {
//     company: 'Ethara AI',
//     role: 'LLM Post-Training Intern',
//     location: 'Gurugram, On-site',
//     period: 'Jan 2026 — present',
//     active: true,
//     summary:
//       'Evaluating, benchmarking, and analysing language models to support data-driven post-training and fine-tuning decisions.',
//     bullets: [
//       'Evaluated LLM responses across <strong>6 quality dimensions</strong> (Truthfulness, Instruction Following, Prompt Correctness, Writing Quality, Verbosity, Overall) on a 1–6 rubric — 500+ responses weekly',
//       'Benchmarked AI coding agents (Claude, GPT, Kimi) on Python library reconstruction via <strong>Commit0</strong> — Draft → Lint → Test pipeline across <strong>54 libraries</strong>',
//       'Identified multi-turn response degradation patterns across 8-turn STEM conversations to inform model fine-tuning',
//       'Documented evaluation findings and pattern analyses to support post-training data decisions',
//     ],
//   },
//   {
//     company: 'KodNest',
//     role: 'SDE Intern – Full Stack',
//     location: 'Bangalore, Hybrid',
//     period: 'May 2025 — Jan 2026',
//     active: false,
//     summary:
//       'Built and shipped full-stack features end-to-end inside an Agile engineering team, working across the Java and Python/Django stack.',
//     bullets: [
//       'Developed full-stack applications using Java, Python, Django REST Framework with end-to-end feature integration',
//       'Optimised SQL queries and backend logic — <strong>30% improvement</strong> in data retrieval efficiency',
//       'Agile workflows: Git version control, debugging, code review, iterative development',
//     ],
//   },
//   {
//     company: 'BIPARD',
//     role: 'CCNA Trainee',
//     location: 'Patna, On-site',
//     period: 'June 2025 — August 2025',
//     active: false,
//     summary:
//       'Trained in CCNA (Cisco Certified Network Associate) to build a strong foundation in networking and cybersecurity.',
//     bullets: [
//       'Completed a comprehensive CCNA training program covering network fundamentals, routing protocols, and security concepts',
//       'Gained hands-on experience with Cisco networking devices and protocols',
//       'Prepared for the CCNA certification exam and passed with flying colors',
//     ],
//   },
// ];

// export const projects = [
//   {
//     index: '01',
//     tag: 'AI Evaluation · Deployed',
//     title: 'LLM EVALUATOR',
//     desc: 'Streamlit tool to evaluate and compare LLM responses across 5 RLHF-inspired quality dimensions. Weighted scoring: IF×0.25, Truth×0.25, Correctness×0.20, Writing×0.15, Verbosity×0.15. Auto-logs to JSONL, surfaces multi-turn degradation after 5+ entries.',
//     stack: ['Python', 'Streamlit', 'JSONL', 'RLHF'],
//     links: [{ label: '$ live_demo →', href: '#' }, { label: '$ github →', href: 'https://github.com/bihari-bhau' }],
//     featured: true,
//   },
//   {
//     index: '02',
//     tag: 'Ed-Tech · Live',
//     title: 'BIHAR SKILL HUB',
//     desc: 'Full-stack ed-tech platform for students in Bihar — 33 courses across 11 skill categories. JWT auth, course enrollment, user profiles, Razorpay payment gateway. Deployed on Vercel + Railway with CI/CD.',
//     stack: ['React', 'Django REST', 'PostgreSQL', 'Razorpay', 'Vercel', 'Railway'],
//     links: [{ label: '$ visit_site →', href: 'https://biharskillhub.co.in' }, { label: '$ github →', href: 'https://github.com/bihari-bhau' }],
//     featured: true,
//   },
//   {
//     index: '03',
//     tag: 'AI Benchmarking · Ethara AI',
//     title: 'COMMIT0 BENCH',
//     desc: 'Benchmarked Claude, GPT, and Kimi on reconstructing Python libraries from stubs using Commit0. 3-stage pipeline (Draft → Lint → Test) across 54 libraries, measuring unit test pass rates.',
//     stack: ['Python', 'Commit0', 'Aider', 'pytest', 'AST'],
//     links: [{ label: '$ github →', href: 'https://github.com/bihari-bhau' }],
//     featured: false,
//   },
//   {
//     index: '04',
//     tag: 'RLHF · Post-Training',
//     title: 'VINDEX',
//     desc: 'LLM response A/B evaluator on STEM prompts across 6 quality dimensions with weighted scoring. Directly informing real post-training evaluation work at Ethara AI.',
//     stack: ['Python', 'LLM APIs', 'Annotation', 'RLHF'],
//     links: [{ label: '$ github →', href: 'https://github.com/bihari-bhau' }],
//     featured: false,
//   },
//   {
//     index: '05',
//     tag: 'Full Stack · RLHF Dataset',
//     title: 'RLHF-EVAL',
//     desc: 'Production-grade RLHF dataset builder. React/TypeScript frontend, FastAPI backend, PostgreSQL with Alembic migrations, JSONL export, pairwise comparison, Docker Compose.',
//     stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
//     links: [{ label: '$ github →', href: 'https://github.com/bihari-bhau/rlhf-eval' }],
//     featured: false,
//   },
//   {
//     index: '06',
//     tag: 'Automation · n8n',
//     title: 'LEAD SNIPER',
//     desc: 'n8n workflow: monitors GitHub stargazers → enriches profiles → IF filter logic → LLM-generated outreach pitches → auto-delivers to Slack/Discord.',
//     stack: ['n8n', 'GitHub API', 'LLM', 'Slack'],
//     links: [{ label: '$ github →', href: 'https://github.com/bihari-bhau' }],
//     featured: false,
//   },
// ];

// export const education = [
//   {
//     period: '2021 – 2025',
//     degree: 'B.Tech — Electrical & Electronics Engineering',
//     institution: 'Sershah Engineering College, Bihar',
//   },
// ];

// export const certifications = [
//   { label: 'Java Full Stack Development', href: 'https://www.yourcertification.com' },
//   { label: 'PCAP – Python Certified Associate', href: 'https://drive.google.com/file/d/1YYEeULCTBjSIhsodsOjSegzuIFs5m5CQ/view?usp=sharing' },
//   { label: 'Google Data Analytics', href: 'https://drive.google.com/file/d/1-hMl9arFbEPAx_e6SMWE7Ez9a2a8Yg6c/view?usp=sharing' },
//   { label: 'Cisco Cybersecurity', href: 'https://drive.google.com/file/d/1D5xAn3TQyKyXeEaAesvO1yNnV8A82bIt/view?usp=sharing' },
//   { label: 'CCNA – Cisco Certified Network Associate', href: 'https://drive.google.com/drive/folders/1slvZNueNIbZu3GzCsxabxQ0vj09QmTeX?usp=drive_link' },
// ];
