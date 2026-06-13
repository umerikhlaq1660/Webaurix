import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * AIScene - theme-aware interactive Three.js scene with distinct
 * geometry per `variant`. All variants share the same accent colour.
 *
 * variants:
 *   "core"  → wireframe icosahedron AI core + vertex glow   (Generative AI)
 *   "knot"  → rotating torus-knot lattice                    (AI Web/App Dev)
 *   "orbit" → atom-style central node with tilted orbits     (Data Consulting)
 *   "nodes" → connected neural / conversation network        (AI Chatbot)
 */
const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [0.4, 0.71, 0.8];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
};

const AIScene = ({ accent = "#68b5cc", isDark = true, variant = "core" }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const [r, g, b] = hexToRgb(accent);
    const col = new THREE.Color(r, g, b);

    /* ── renderer / scene / camera ── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 6.4;

    const group = new THREE.Group();
    scene.add(group);

    const disposables = [];
    const track = (obj) => { disposables.push(obj); return obj; };
    const updaters = []; // fns called each frame with elapsed time

    /* ── shared ambient particle field ── */
    const FIELD = isMobile ? 200 : 420;
    const fpos = new Float32Array(FIELD * 3);
    for (let i = 0; i < FIELD; i++) {
      const rad = 3.4 + Math.random() * 3.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      fpos[i * 3]     = rad * Math.sin(ph) * Math.cos(th);
      fpos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      fpos[i * 3 + 2] = rad * Math.cos(ph);
    }
    const fieldGeo = track(new THREE.BufferGeometry());
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fpos, 3));
    const fieldMat = track(new THREE.PointsMaterial({
      color: col, size: isMobile ? 0.04 : 0.03,
      transparent: true, opacity: isDark ? 0.45 : 0.34, sizeAttenuation: true,
    }));
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);
    updaters.push((t) => { field.rotation.y = -t * 0.03; field.rotation.x = t * 0.012; });

    /* ════════════════ VARIANT GEOMETRY ════════════════ */
    if (variant === "knot") {
      /* ── AI Web/App: torus-knot lattice ── */
      const geo = track(new THREE.TorusKnotGeometry(1.5, 0.42, isMobile ? 90 : 160, isMobile ? 10 : 18));
      const mat = track(new THREE.MeshBasicMaterial({
        color: col, wireframe: true, transparent: true, opacity: isDark ? 0.5 : 0.42,
      }));
      const knot = new THREE.Mesh(geo, mat);
      group.add(knot);

      const ptsMat = track(new THREE.PointsMaterial({
        color: col, size: isMobile ? 0.05 : 0.04, transparent: true, opacity: 0.85, sizeAttenuation: true,
      }));
      const pts = new THREE.Points(geo, ptsMat);
      group.add(pts);

      updaters.push((t) => {
        knot.rotation.x = t * 0.18;
        knot.rotation.y = t * 0.12;
        pts.rotation.copy(knot.rotation);
      });

    } else if (variant === "orbit") {
      /* ── Data Consulting: wireframe globe sphere ── */

      // main globe (lat/long wireframe)
      const globeGeo = track(new THREE.SphereGeometry(1.95, isMobile ? 22 : 34, isMobile ? 16 : 24));
      const globeMat = track(new THREE.MeshBasicMaterial({
        color: col, wireframe: true, transparent: true, opacity: isDark ? 0.4 : 0.34,
      }));
      const globe = new THREE.Mesh(globeGeo, globeMat);
      group.add(globe);

      // glowing dots on the grid intersections
      const gPtsMat = track(new THREE.PointsMaterial({
        color: col, size: isMobile ? 0.045 : 0.035, transparent: true, opacity: 0.85, sizeAttenuation: true,
      }));
      const globePts = new THREE.Points(globeGeo, gPtsMat);
      group.add(globePts);

      updaters.push((t) => {
        globe.rotation.y = t * 0.22;
        globePts.rotation.copy(globe.rotation);
        const s = 1 + Math.sin(t * 0.9) * 0.025;
        globe.scale.setScalar(s);
        globePts.scale.setScalar(s);
      });

      // faint solid inner sphere for depth
      const innerGeo = track(new THREE.SphereGeometry(1.9, 24, 18));
      const innerMat = track(new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: isDark ? 0.05 : 0.07,
      }));
      group.add(new THREE.Mesh(innerGeo, innerMat));

      // two tilted equator rings circling the globe
      [[Math.PI / 2, 0, 0], [Math.PI / 2.3, 0, Math.PI / 3]].forEach((tilt, idx) => {
        const ringGeo = track(new THREE.TorusGeometry(2.45 + idx * 0.28, 0.012, 8, 150));
        const ringMat = track(new THREE.MeshBasicMaterial({
          color: col, transparent: true, opacity: isDark ? 0.32 : 0.26,
        }));
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.set(tilt[0], tilt[1], tilt[2]);
        group.add(ring);

        // a marker travelling along each ring
        const mGeo = track(new THREE.SphereGeometry(isMobile ? 0.08 : 0.065, 14, 14));
        const mMat = track(new THREE.MeshBasicMaterial({ color: col }));
        const marker = new THREE.Mesh(mGeo, mMat);
        const haloGeo = track(new THREE.SphereGeometry(isMobile ? 0.15 : 0.13, 14, 14));
        const haloMat = track(new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22 }));
        marker.add(new THREE.Mesh(haloGeo, haloMat));

        const pivot = new THREE.Group();
        pivot.rotation.set(tilt[0], tilt[1], tilt[2]);
        pivot.add(marker);
        group.add(pivot);

        const radius = 2.45 + idx * 0.28;
        const speed = 0.55 + idx * 0.18;
        const phase = idx * 2.4;
        updaters.push((t) => {
          marker.position.set(
            Math.cos(t * speed + phase) * radius,
            Math.sin(t * speed + phase) * radius,
            0
          );
        });
      });

    } else if (variant === "nodes") {
      /* ── Chatbot: connected neural / conversation network ── */
      const N = isMobile ? 26 : 44;
      const nodePos = [];
      for (let i = 0; i < N; i++) {
        const rad = 1.2 + Math.random() * 2.4;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        nodePos.push(new THREE.Vector3(
          rad * Math.sin(ph) * Math.cos(th),
          rad * Math.sin(ph) * Math.sin(th),
          rad * Math.cos(ph)
        ));
      }
      // node points
      const nGeo = track(new THREE.BufferGeometry().setFromPoints(nodePos));
      const nMat = track(new THREE.PointsMaterial({
        color: col, size: isMobile ? 0.12 : 0.1, transparent: true, opacity: 0.95, sizeAttenuation: true,
      }));
      const nodes = new THREE.Points(nGeo, nMat);
      group.add(nodes);

      // connecting lines (within threshold)
      const linePts = [];
      const TH = 1.7;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (nodePos[i].distanceTo(nodePos[j]) < TH) {
            linePts.push(nodePos[i], nodePos[j]);
          }
        }
      }
      const lGeo = track(new THREE.BufferGeometry().setFromPoints(linePts));
      const lMat = track(new THREE.LineBasicMaterial({
        color: col, transparent: true, opacity: isDark ? 0.22 : 0.18,
      }));
      const lines = new THREE.LineSegments(lGeo, lMat);
      group.add(lines);

      updaters.push((t) => {
        group.rotation.y = t * 0.12;
        const pulse = 0.7 + Math.sin(t * 1.6) * 0.25;
        nMat.opacity = pulse;
      });

    } else {
      /* ── default "core": Generative AI brain core ── */
      const coreGeo = track(new THREE.IcosahedronGeometry(1.9, 1));
      const coreMat = track(new THREE.MeshBasicMaterial({
        color: col, wireframe: true, transparent: true, opacity: isDark ? 0.55 : 0.45,
      }));
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const shellGeo = track(new THREE.IcosahedronGeometry(1.55, 0));
      const shellMat = track(new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: isDark ? 0.06 : 0.08,
      }));
      group.add(new THREE.Mesh(shellGeo, shellMat));

      const ptsMat = track(new THREE.PointsMaterial({
        color: col, size: isMobile ? 0.06 : 0.05, transparent: true, opacity: 0.9, sizeAttenuation: true,
      }));
      const corePoints = new THREE.Points(coreGeo, ptsMat);
      group.add(corePoints);

      updaters.push((t) => {
        const s = 1 + Math.sin(t * 0.8) * 0.03;
        core.scale.setScalar(s);
        corePoints.scale.setScalar(s);
      });
    }

    /* ── mouse parallax ── */
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener("mousemove", onMove);

    /* ── animation loop ── */
    const clock = new THREE.Clock();
    const baseSpin = prefersReduced ? 0.03 : 0.1;
    const animate = () => {
      const t = clock.getElapsedTime();
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      if (variant !== "nodes") {
        group.rotation.y = t * baseSpin + current.x * 0.5;
        group.rotation.x = current.y * 0.4 + Math.sin(t * 0.3) * 0.06;
      } else {
        group.rotation.x = current.y * 0.3;
      }

      updaters.forEach((fn) => fn(t));
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    /* ── resize ── */
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [accent, isDark, variant]);

  return <div ref={mountRef} className="w-full h-full" style={{ pointerEvents: "none" }} />;
};

export default AIScene;
