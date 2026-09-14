import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const bgContainer = containerRef.current;
    if (!bgContainer) return;

    const isMobileInitial = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 700);
    camera.position.set(0, 0, 75);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobileInitial,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileInitial ? 1 : 1.15));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    bgContainer.appendChild(renderer.domElement);

    // High-efficiency directional & ambient studio lighting (no heavy per-pixel point lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.35);
    dirLight1.position.set(45, 60, 70);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 0.75);
    dirLight2.position.set(-45, -35, 45);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    rimLight.position.set(0, -50, -50);
    scene.add(rimLight);

    // Shared Geometries & Textures
    const textureLoader = new THREE.TextureLoader();
    const textures = (typeof window !== 'undefined' && window.BOOK_TEXTURES) || {};
    const coverTex = textureLoader.load(textures.cover || '/book-cover-3d.png');
    const spineTex = textureLoader.load(textures.spine || '/book-spine-3d.png');
    const backTex = textureLoader.load(textures.back || '/book-back-3d.png');
    const pagesTex = textureLoader.load(textures.pages || '/book-pages-3d.png');

    [coverTex, spineTex, backTex, pagesTex].forEach((tex) => {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
    });

    const bookGeo = new THREE.BoxGeometry(8.1, 11.6, 1.4);

    // High-performance shared Lambert materials (single draw per face group)
    const frontCoverMat = new THREE.MeshLambertMaterial({ map: coverTex });
    const spineMat = new THREE.MeshLambertMaterial({ map: spineTex });
    const backCoverMat = new THREE.MeshLambertMaterial({ map: backTex });
    const pagesEdgeMat = new THREE.MeshLambertMaterial({ map: pagesTex });

    const bookMaterials = [
      pagesEdgeMat,   // 0: +X (Right pages)
      spineMat,       // 1: -X (Left spine)
      pagesEdgeMat,   // 2: +Y (Top pages)
      pagesEdgeMat,   // 3: -Y (Bottom pages)
      frontCoverMat,  // 4: +Z (Front cover)
      backCoverMat,   // 5: -Z (Back cover)
    ];

    function buildBookMesh(scale = 1) {
      const book = new THREE.Mesh(bookGeo, bookMaterials);
      book.scale.set(scale, scale, scale);
      return book;
    }

    // Ambient Starfield Particles
    const particleCount = isMobileInitial ? 35 : 70;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 160;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 360 - 80;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 70 - 15;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 1.8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // Geometric Polyhedra Wireframes
    const geomGroup = new THREE.Group();
    scene.add(geomGroup);
    const floatingShapes = [];
    const shapeGeo1 = new THREE.IcosahedronGeometry(2.2, 0);
    const shapeGeo2 = new THREE.OctahedronGeometry(2.4, 0);

    for (let i = 0; i < 7; i++) {
      const geo = i % 2 === 0 ? shapeGeo1 : shapeGeo2;
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xf97316 : 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const x = (Math.random() - 0.5) * (isMobileInitial ? 35 : 110);
      const y = (Math.random() - 0.5) * 320 - 80;
      const z = (Math.random() - 0.5) * 40 - 10;
      mesh.position.set(x, y, z);
      geomGroup.add(mesh);
      floatingShapes.push({
        mesh,
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.012,
      });
    }

    // Books Cascade Group
    const booksGroup = new THREE.Group();
    scene.add(booksGroup);
    const floatingBooks = [];

    function populateBooks() {
      while (booksGroup.children.length > 0) {
        booksGroup.remove(booksGroup.children[0]);
      }
      floatingBooks.length = 0;

      const isMobile = window.innerWidth < 768;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleH = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleW = visibleH * camera.aspect;
      const halfW = visibleW / 2;

      const positions = isMobile
        ? [
            { x: -11, y: 26, z: 8, s: 0.85, ry: 0.42, rx: 0.18 },
            { x: 11, y: 15, z: 4, s: 0.82, ry: -0.48, rx: -0.15 },
            { x: -9, y: -25, z: -8, s: 0.75, ry: 0.8, rx: 0.12 },
            { x: 10, y: -65, z: -6, s: 0.8, ry: -0.7, rx: 0.25 },
            { x: -11, y: -105, z: 6, s: 0.84, ry: 0.55, rx: -0.2 },
            { x: 11, y: -150, z: 5, s: 0.82, ry: -0.42, rx: 0.18 },
            { x: -9, y: -200, z: -8, s: 0.76, ry: 0.7, rx: 0.15 },
            { x: 10, y: -250, z: 6, s: 0.84, ry: -0.42, rx: 0.18 },
          ]
        : [
            // Desktop & Laptops: Flanking columns on left & right + subtle depth
            { x: -halfW * 0.55, y: 24, z: 8, s: 1.15, ry: 0.45, rx: 0.15 },
            { x: halfW * 0.58, y: 16, z: 6, s: 1.1, ry: -0.55, rx: -0.2 },
            { x: -halfW * 0.65, y: -10, z: -14, s: 0.95, ry: 0.8, rx: 0.1 },
            { x: halfW * 0.65, y: -40, z: 6, s: 1.12, ry: -0.45, rx: 0.2 },
            { x: -halfW * 0.55, y: -80, z: 7, s: 1.15, ry: 0.6, rx: -0.18 },
            { x: halfW * 0.6, y: -115, z: -12, s: 0.98, ry: -0.55, rx: -0.12 },
            { x: -halfW * 0.62, y: -155, z: 6, s: 1.12, ry: 0.5, rx: -0.22 },
            { x: halfW * 0.58, y: -195, z: 7, s: 1.15, ry: -0.5, rx: 0.15 },
            { x: -halfW * 0.55, y: -240, z: 6, s: 1.12, ry: 0.45, rx: 0.18 },
            { x: halfW * 0.62, y: -280, z: 5, s: 1.1, ry: -0.6, rx: -0.15 },
          ];

      positions.forEach((p) => {
        const book = buildBookMesh(p.s);
        book.position.set(p.x, p.y, p.z);
        book.rotation.set(p.rx, p.ry, 0);
        booksGroup.add(book);

        floatingBooks.push({
          mesh: book,
          baseX: p.x,
          baseY: p.y,
          baseZ: p.z,
          baseRx: p.rx,
          baseRy: p.ry,
          // Multi-axis organic random 3D drift
          rotSpeedX: (Math.random() - 0.5) * 0.006,
          rotSpeedY: (Math.random() > 0.5 ? 1 : -1) * (0.005 + Math.random() * 0.006),
          ampX: 1.8 + Math.random() * 2.5,
          ampY: 2.8 + Math.random() * 3.5,
          ampZ: 1.2 + Math.random() * 2.0,
          freqX: 0.35 + Math.random() * 0.45,
          freqY: 0.55 + Math.random() * 0.5,
          freqZ: 0.3 + Math.random() * 0.35,
          offsetX: Math.random() * Math.PI * 2,
          offsetY: Math.random() * Math.PI * 2,
          offsetZ: Math.random() * Math.PI * 2,
        });
      });
    }

    populateBooks();

    // High-Performance Smooth Scroll (No Forced Reflow)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let targetScrollY = 0;
    let currentCamY = 0;
    let isPageVisible = true;

    let maxScroll = 1;
    const calculateMaxScroll = () => {
      const docH = document.documentElement.scrollHeight || 1;
      const winH = window.innerHeight || 1;
      maxScroll = Math.max(docH - winH, 1);
    };
    calculateMaxScroll();

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleVisibility = () => {
      isPageVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation Loop with Snappy, Silky-Smooth 60/120 FPS Responsiveness
    let animationId;
    let clock = 0;
    const threeClock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isPageVisible) return;
      const delta = Math.min(threeClock.getDelta(), 0.05);
      clock += delta;

      const isMobile = window.innerWidth < 768;

      // Sample scroll position directly each frame for zero-lag 60/120fps sync
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetScrollY = -Math.min(Math.max(scrollY / maxScroll, 0), 1) * 280;

      // Mathematically pure frame-rate independent exponential smoothing (snaps smoothly to scroll with zero lag or speed cuts)
      const scrollLerp = 1 - Math.exp(-18 * delta);
      currentCamY += (targetScrollY - currentCamY) * scrollLerp;
      const camX = targetMouseX * (isMobile ? 2.5 : 5.5);
      const mouseLerp = 1 - Math.exp(-10 * delta);
      camera.position.x += (camX - camera.position.x) * mouseLerp;
      camera.position.y = currentCamY - targetMouseY * (isMobile ? 1.5 : 3);
      camera.lookAt(0, currentCamY, 0);

      // Books organic random multi-harmonic floating in 3D space with continuous steady rotation
      for (let i = 0; i < floatingBooks.length; i++) {
        const b = floatingBooks[i];
        b.mesh.position.x =
          b.baseX + Math.sin(clock * b.freqX + b.offsetX) * (b.ampX * 0.5);
        b.mesh.position.y =
          b.baseY + Math.sin(clock * b.freqY + b.offsetY) * (b.ampY * 0.5);
        b.mesh.position.z =
          b.baseZ + Math.cos(clock * b.freqZ + b.offsetZ) * (b.ampZ * 0.4);

        // Pure uninterrupted continuous Y spin + gentle harmonic pitch and roll tilts
        b.mesh.rotation.y += b.rotSpeedY * (delta * 60);
        b.mesh.rotation.x = b.baseRx + Math.sin(clock * b.freqX + b.offsetX) * 0.12;
        b.mesh.rotation.z = Math.cos(clock * b.freqZ + b.offsetZ) * 0.08;
      }

      // Rotate shapes & particles with random organic pulse
      particles.rotation.y = clock * 0.012;
      particles.rotation.x = Math.sin(clock * 0.2) * 0.05;

      for (let i = 0; i < floatingShapes.length; i++) {
        const s = floatingShapes[i];
        s.mesh.rotation.x += s.rx;
        s.mesh.rotation.y += s.ry;
        s.mesh.position.y += Math.sin(clock * 0.8 + i) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      calculateMaxScroll();
      populateBooks();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (bgContainer.contains(renderer.domElement)) {
        bgContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bookGeo.dispose();
      frontCoverMat.dispose();
      spineMat.dispose();
      backCoverMat.dispose();
      pagesEdgeMat.dispose();
      shapeGeo1.dispose();
      shapeGeo2.dispose();
      pGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform"
      aria-hidden="true"
    />
  );
};

export default Background3D;
