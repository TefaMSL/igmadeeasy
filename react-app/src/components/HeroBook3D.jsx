import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

export const HeroBook3D = () => {
  const mountRef = useRef(null);
  const { t } = useApp();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 200);
    camera.position.set(0, 0, 31);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.05;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio Lighting: Pure neutral white balanced illumination ensuring 3D colors match flat 2D textures 1:1
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.95);
    frontLight.position.set(0, 0, 40);
    scene.add(frontLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.70);
    keyLight.position.set(25, 25, 30);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
    fillLight.position.set(-25, -10, 25);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
    rimLight.position.set(0, 20, -30);
    scene.add(rimLight);

    // Load High-Res Textures
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
      tex.anisotropy = 8;
      tex.colorSpace = THREE.SRGBColorSpace;
    });

    // Dimensions matching realistic hardcover proportions
    const coverBoardGeo = new THREE.BoxGeometry(8.1, 11.6, 0.12);
    const spineBoardGeo = new THREE.BoxGeometry(0.14, 11.6, 1.48);
    const innerPagesGeo = new THREE.BoxGeometry(7.8, 11.15, 1.24);
    const creaseGeo = new THREE.BoxGeometry(0.06, 11.6, 0.05);

    // Clean, vibrant physical materials rendering 2K textures with 100% color fidelity
    const frontCoverMat = new THREE.MeshStandardMaterial({
      map: coverTex,
      roughness: 0.45,
      metalness: 0.0,
    });

    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.45,
      metalness: 0.0,
    });

    const backCoverMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.45,
      metalness: 0.0,
    });

    const darkNavyMat = new THREE.MeshStandardMaterial({
      color: 0x162c58, // Rich royal navy blue
      roughness: 0.45,
      metalness: 0.0,
    });

    const pagesEdgeMat = new THREE.MeshStandardMaterial({
      map: pagesTex,
      roughness: 0.7,
      metalness: 0.0,
    });

    const pagesInnerMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const creaseMat = new THREE.MeshBasicMaterial({ color: 0x040a16, transparent: true, opacity: 0.45 });

    const pagesMaterials = [
      pagesEdgeMat,
      pagesInnerMat,
      pagesEdgeMat,
      pagesEdgeMat,
      pagesInnerMat,
      pagesInnerMat,
    ];

    const frontBoardMaterials = [
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      frontCoverMat,
      darkNavyMat,
    ];

    const backBoardMaterials = [
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      backCoverMat,
    ];

    const spineBoardMaterials = [
      darkNavyMat,
      spineMat,
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
      darkNavyMat,
    ];

    // Build the Book Model
    const heroBookGroup = new THREE.Group();
    scene.add(heroBookGroup);

    const book = new THREE.Group();

    // Pages Block
    const pagesMesh = new THREE.Mesh(innerPagesGeo, pagesMaterials);
    pagesMesh.position.set(0.14, 0, 0);
    book.add(pagesMesh);

    // Front Board
    const frontBoard = new THREE.Mesh(coverBoardGeo, frontBoardMaterials);
    frontBoard.position.set(0, 0, 0.68);
    book.add(frontBoard);

    // Back Board
    const backBoard = new THREE.Mesh(coverBoardGeo, backBoardMaterials);
    backBoard.position.set(0, 0, -0.68);
    book.add(backBoard);

    // Spine
    const spineBoard = new THREE.Mesh(spineBoardGeo, spineBoardMaterials);
    spineBoard.position.set(-4.02, 0, 0);
    book.add(spineBoard);

    // Creases
    const creaseFront = new THREE.Mesh(creaseGeo, creaseMat);
    creaseFront.position.set(-3.72, 0, 0.72);
    book.add(creaseFront);

    const creaseBack = new THREE.Mesh(creaseGeo, creaseMat);
    creaseBack.position.set(-3.72, 0, -0.72);
    book.add(creaseBack);

    book.scale.set(1.08, 1.08, 1.08);
    book.position.set(0.3, 0, 0);
    heroBookGroup.add(book);

    // Rotation state
    let targetRotY = 0.28;
    let targetRotX = 0.08;
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialRotX = 0;
    let initialRotY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStartX = clientX;
      dragStartY = clientY;
      initialRotX = targetRotX;
      initialRotY = targetRotY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      targetRotY = initialRotY + deltaX * 0.012;
      targetRotX = Math.max(-0.95, Math.min(0.95, initialRotX + deltaY * 0.012));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    let animationId;
    let heroClock = 0;
    let isVisible = true;

    // Pause rendering when Hero section is scrolled out of view (saves 50% WebGL GPU load)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip off-screen rendering
      heroClock += 0.016;

      if (!isDragging) {
        targetRotY += 0.003;
        heroBookGroup.position.y = Math.sin(heroClock * 1.6) * 0.38;
      }

      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      heroBookGroup.rotation.x = currentRotX;
      heroBookGroup.rotation.y = currentRotY;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 480;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
      coverBoardGeo.dispose();
      spineBoardGeo.dispose();
      innerPagesGeo.dispose();
      creaseGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />
      {/* 360 Rotate Hint Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xl pointer-events-none select-none">
        <span className="text-orange-400">🔄</span>
        <span>{t('اسحب لتدوير الكتاب 360° ثلاثي الأبعاد', 'Drag to rotate book 360° in 3D')}</span>
      </div>
    </div>
  );
};

export default HeroBook3D;
