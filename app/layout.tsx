import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shubham Singh — LLM Engineer',
  description:
    'LLM Post-Training Intern at Ethara AI. Evaluating AI agents, benchmarking language models, shipping full-stack platforms. Based in Gurugram, India.',
  keywords: [
    'Shubham Singh',
    'LLM Engineer',
    'Post-Training',
    'RLHF',
    'Ethara AI',
    'Full Stack Developer',
    'Python',
    'React',
    'Django',
    'AI Evaluation',
    'Benchmarking',
  ],
  authors: [{ name: 'Shubham Singh', url: 'https://github.com/bihari-bhau' }],
  openGraph: {
    title: 'Shubham Singh — LLM Engineer',
    description: 'LLM Post-Training Intern at Ethara AI. Building AI evaluation pipelines and full-stack platforms.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Singh — LLM Engineer',
    description: 'LLM Post-Training Intern at Ethara AI.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
