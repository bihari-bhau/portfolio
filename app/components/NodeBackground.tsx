'use client';

import { useEffect, useRef } from 'react';

// Dynamically loaded — Three.js only runs on client, never SSR
export default function NodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderer: any, scene: any, camera: any;
    let nodes: any[] = [];
    let edgeGroup: any;
    let particles: any;
    let animId: number;
    let THREE: any;

    async function init() {
      // Dynamic import — Three.js is code-split and lazy loaded
      THREE = await import('three');

      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;

      // Grid
      const grid = new THREE.GridHelper(200, 40, 0x003344, 0x001a2a);
      grid.position.y = -20;
      scene.add(grid);

      // Nodes
      const nodeGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const nodeGroup = new THREE.Group();
      for (let i = 0; i < 80; i++) {
        const mesh = new THREE.Mesh(
          nodeGeo,
          new THREE.MeshBasicMaterial({ color: 0x00e5ff })
        );
        const s = 80;
        mesh.position.set(
          (Math.random() - 0.5) * s,
          (Math.random() - 0.5) * s * 0.5,
          (Math.random() - 0.5) * s * 0.6
        );
        mesh.userData.vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.015
        );
        nodes.push(mesh);
        nodeGroup.add(mesh);
      }
      scene.add(nodeGroup);

      // Edges
      edgeGroup = new THREE.Group();
      scene.add(edgeGroup);

      // Particles
      const pCount = 200;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i++) pos[i] = (Math.random() - 0.5) * 120;
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      particles = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.12, transparent: true, opacity: 0.3 })
      );
      scene.add(particles);

      // Mouse
      let mx = 0, my = 0;
      window.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      let frame = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        frame++;

        nodes.forEach(n => {
          n.position.add(n.userData.vel);
          (['x','y','z'] as const).forEach(ax => {
            const lim = ax === 'x' ? 40 : ax === 'y' ? 20 : 30;
            if (Math.abs(n.position[ax]) > lim) n.userData.vel[ax] *= -1;
          });
        });

        if (frame % 8 === 0) {
          while (edgeGroup.children.length) edgeGroup.remove(edgeGroup.children[0]);
          const threshold = 18;
          const mat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.12 });
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const d = nodes[i].position.distanceTo(nodes[j].position);
              if (d < threshold) {
                const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
                const line = new THREE.Line(geo, mat.clone());
                line.material.opacity = (1 - d / threshold) * 0.18;
                edgeGroup.add(line);
              }
            }
          }
        }

        particles.rotation.y += 0.0004;
        camera.position.x += (mx * 8 - camera.position.x) * 0.05;
        camera.position.y += (-my * 4 - camera.position.y) * 0.05;
        nodeGroup.rotation.x = window.scrollY * 0.0003;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    init();
    return () => { cancelAnimationFrame(animId); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}