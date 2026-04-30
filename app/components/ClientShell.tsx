'use client';

import dynamic from 'next/dynamic';

// ssr: false is ONLY allowed inside 'use client' components
const NodeBackground = dynamic(() => import('./NodeBackground'), {
  ssr: false,
  loading: () => null,
});

const Cursor = dynamic(() => import('./Cursor'), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell() {
  return (
    <>
      <NodeBackground />
      <Cursor />
    </>
  );
}
