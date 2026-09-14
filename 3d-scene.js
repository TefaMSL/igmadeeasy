// ========================================================
// IG Made Easy — Comprehensive 3D Experience (Three.js)
// 1. Hero Interactive 3D Hardcover Book (360° Drag & Rotate)
// 2. Full-Page Dynamic Cascade ("طوفان الكتب") across Mobile & Desktop
// 60/120 FPS High-Performance Engine with 2K HD Physical Textures
// ========================================================

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is not loaded. 3D features will be disabled.');
    return;
  }

  // ── Shared Physical Geometries & Materials ──
  const textureLoader = new THREE.TextureLoader();
  const textures = window.BOOK_TEXTURES || {};
  const coverTex = textureLoader.load(textures.cover || 'book-cover-3d.png');
  const spineTex = textureLoader.load(textures.spine || 'book-spine-3d.png');
  const backTex  = textureLoader.load(textures.back  || 'book-back-3d.png');
  const pagesTex = textureLoader.load(textures.pages || 'book-pages-3d.png');

  [coverTex, spineTex, backTex, pagesTex].forEach(tex => {
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 8;
    if (THREE.sRGBEncoding !== undefined) {
      tex.encoding = THREE.sRGBEncoding;
    }
  });

  // Physical Dimensions
  const coverBoardGeo = new THREE.BoxGeometry(8.1, 11.6, 0.12);
  const spineBoardGeo = new THREE.BoxGeometry(0.14, 11.6, 1.48);
  const innerPagesGeo = new THREE.BoxGeometry(7.8, 11.15, 1.24);
  const creaseGeo     = new THREE.BoxGeometry(0.06, 11.6, 0.05);

  const frontCoverMat = new THREE.MeshStandardMaterial({
    map: coverTex,
    roughness: 0.45,
    metalness: 0.0
  });

  const spineMat = new THREE.MeshStandardMaterial({
    map: spineTex,
    roughness: 0.45,
    metalness: 0.0
  });

  const backCoverMat = new THREE.MeshStandardMaterial({
    map: backTex,
    roughness: 0.45,
    metalness: 0.0
  });

  const navyBoardMat = new THREE.MeshStandardMaterial({
    color: 0x162c58,
    roughness: 0.45,
    metalness: 0.0
  });

  const pagesEdgeMat = new THREE.MeshStandardMaterial({
    map: pagesTex,
    roughness: 0.60,
    metalness: 0.0
  });

  const pagesInnerMat = new THREE.MeshBasicMaterial({ color: 0xF8FAFC });
  const creaseMat = new THREE.MeshBasicMaterial({ color: 0x060E1E, transparent: true, opacity: 0.35 });

  const pagesMaterials = [
    pagesEdgeMat,
    pagesInnerMat,
    pagesEdgeMat,
    pagesEdgeMat,
    pagesInnerMat,
    pagesInnerMat
  ];

  const frontBoardMaterials = [
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    frontCoverMat,
    navyBoardMat
  ];

  const backBoardMaterials = [
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    backCoverMat
  ];

  const spineBoardMaterials = [
    navyBoardMat,
    spineMat,
    navyBoardMat,
    navyBoardMat,
    navyBoardMat,
    navyBoardMat
  ];

  function buildBookMesh(scale = 1) {
    const book = new THREE.Group();

    // 1. Pages block
    const pagesMesh = new THREE.Mesh(innerPagesGeo, pagesMaterials);
    pagesMesh.position.set(0.14, 0, 0);
    book.add(pagesMesh);

    // 2. Front Hardcover Board
    const frontBoard = new THREE.Mesh(coverBoardGeo, frontBoardMaterials);
    frontBoard.position.set(0, 0, 0.68);
    book.add(frontBoard);

    // 3. Back Hardcover Board
    const backBoard = new THREE.Mesh(coverBoardGeo, backBoardMaterials);
    backBoard.position.set(0, 0, -0.68);
    book.add(backBoard);

    // 4. Spine Casing
    const spineBoard = new THREE.Mesh(spineBoardGeo, spineBoardMaterials);
    spineBoard.position.set(-4.02, 0, 0);
    book.add(spineBoard);

    // 5. Crease indents
    const creaseFront = new THREE.Mesh(creaseGeo, creaseMat);
    creaseFront.position.set(-3.72, 0, 0.72);
    book.add(creaseFront);

    const creaseBack = new THREE.Mesh(creaseGeo, creaseMat);
    creaseBack.position.set(-3.72, 0, -0.72);
    book.add(creaseBack);

    book.scale.set(scale, scale, scale);
    return book;
  }

  // ── High-Performance Shared Single-Mesh Book for Background Stream (90% draw call reduction) ──
  const cascadeBookGeo = new THREE.BoxGeometry(8.1, 11.6, 1.4);
  const cascadeFrontCoverMat = new THREE.MeshLambertMaterial({ map: coverTex });
  const cascadeSpineMat      = new THREE.MeshLambertMaterial({ map: spineTex });
  const cascadeBackCoverMat  = new THREE.MeshLambertMaterial({ map: backTex });
  const cascadePagesEdgeMat  = new THREE.MeshLambertMaterial({ map: pagesTex });

  const cascadeMaterials = [
    cascadePagesEdgeMat,  // 0: +X (Right pages)
    cascadeSpineMat,      // 1: -X (Left spine)
    cascadePagesEdgeMat,  // 2: +Y (Top pages)
    cascadePagesEdgeMat,  // 3: -Y (Bottom pages)
    cascadeFrontCoverMat, // 4: +Z (Front cover)
    cascadeBackCoverMat,  // 5: -Z (Back cover)
  ];

  function buildCascadeBookMesh(scale = 1) {
    const book = new THREE.Mesh(cascadeBookGeo, cascadeMaterials);
    book.scale.set(scale, scale, scale);
    return book;
  }

  // Theme check
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';


  // ========================================================
  // PART 1: HERO INTERACTIVE 3D HARDCOVER BOOK (360° ROTATION)
  // ========================================================
  function initHeroBook() {
    const heroContainer = document.getElementById('hero-3d-canvas-container');
    if (!heroContainer) return;

    const width = heroContainer.clientWidth || 480;
    const height = heroContainer.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 200);
    camera.position.set(0, 0, 31);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.05;
    if (renderer.outputEncoding !== undefined) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    if (renderer.outputColorSpace !== undefined) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    heroContainer.appendChild(renderer.domElement);

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

    // Create the Hero 3D Book
    const heroBookGroup = new THREE.Group();
    scene.add(heroBookGroup);

    const heroBook = buildBookMesh(1.08);
    // Center book pivot
    heroBook.position.set(0.3, 0, 0);
    heroBookGroup.add(heroBook);

    // Rotation & Interactive State: slightly angled to proudly showcase cover + spine
    let targetRotY = 0.28;
    let targetRotX = 0.08;
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialRotX = 0;
    let initialRotY = 0;
    let dragMoved = false;

    let hoverTiltX = 0;
    let hoverTiltY = 0;

    // Mouse drag controls
    heroContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialRotX = targetRotX;
      initialRotY = targetRotY;
      heroContainer.classList.add('grabbing');
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
          dragMoved = true;
        }
        targetRotY = initialRotY + deltaX * 0.012;
        targetRotX = Math.max(-0.95, Math.min(0.95, initialRotX + deltaY * 0.012));
      } else {
        const rect = heroContainer.getBoundingClientRect();
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          hoverTiltY = normX * 0.35;
          hoverTiltX = -normY * 0.25;
        } else {
          hoverTiltX = 0;
          hoverTiltY = 0;
        }
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        heroContainer.classList.remove('grabbing');
      }
    });

    // Touch drag controls
    heroContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragMoved = false;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
        initialRotX = targetRotX;
        initialRotY = targetRotY;
      }
    }, { passive: true });

    heroContainer.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
          dragMoved = true;
        }
        targetRotY = initialRotY + deltaX * 0.014;
        targetRotX = Math.max(-0.95, Math.min(0.95, initialRotX + deltaY * 0.014));
      }
    }, { passive: true });

    heroContainer.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click handler: if user tapped without dragging, open Lightbox Gallery
    heroContainer.addEventListener('click', (e) => {
      if (!dragMoved && typeof window.openLightbox === 'function') {
        window.openLightbox(0);
      }
    });

    // Zoom indicator click handler
    const zoomBtn = document.getElementById('hero-zoom-indicator');
    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof window.openLightbox === 'function') {
          window.openLightbox(0);
        }
      });
    }

    // Resize hero canvas
    function onHeroResize() {
      const w = heroContainer.clientWidth || 480;
      const h = heroContainer.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onHeroResize);

    // Hero Animation Loop (Paused when scrolled out of view to free 50% GPU load)
    let heroClock = 0;
    let isHeroVisible = true;
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        isHeroVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      heroObserver.observe(heroContainer);
    }

    function animateHero() {
      requestAnimationFrame(animateHero);

      if (!isHeroVisible) return; // Skip off-screen rendering

      heroClock += 0.016;

      // When idle (not dragging), subtle auto-orbit & wave float
      if (!isDragging) {
        targetRotY += 0.0035; // gentle slow orbit
        heroBookGroup.position.y = Math.sin(heroClock * 1.6) * 0.42;
      }

      // Smooth inertia damping
      const effTargetX = targetRotX + hoverTiltX;
      const effTargetY = targetRotY + hoverTiltY;
      currentRotX += (effTargetX - currentRotX) * 0.08;
      currentRotY += (effTargetY - currentRotY) * 0.08;

      heroBookGroup.rotation.x = currentRotX;
      heroBookGroup.rotation.y = currentRotY;

      renderer.render(scene, camera);
    }
    animateHero();
  }


  // ========================================================
  // PART 2: FULL-PAGE DYNAMIC CASCADE ("طوفان الكتب")
  // Responsive Frustum Alignment across Mobile & Desktop
  // ========================================================
  function initBackgroundStream() {
    const bgContainer = document.getElementById('three-canvas-container');
    if (!bgContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 700);
    camera.position.set(0, 0, 75);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const isMobileInitial = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileInitial ? 1 : 1.15));
    if (renderer.outputEncoding !== undefined) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    bgContainer.appendChild(renderer.domElement);

    // Multi-light Studio Environment (Fast Directional & Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.35);
    dirLight1.position.set(45, 60, 70);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xF97316, 0.75);
    dirLight2.position.set(-45, -35, 45);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0x93C5FD, 0.6);
    rimLight.position.set(0, -50, -50);
    scene.add(rimLight);

    // Ambient Starfield Particles
    const particleCount = isMobileInitial ? 40 : 85;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 160;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 360 - 100;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 70 - 15;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.025,
        z: (Math.random() - 0.5) * 0.015
      });
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xF97316,
      size: 1.8,
      transparent: true,
      opacity: isDark() ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // Geometric Polyhedra Wireframes
    const geomGroup = new THREE.Group();
    scene.add(geomGroup);
    const floatingShapes = [];
    const shapeGeo1 = new THREE.IcosahedronGeometry(2.2, 0);
    const shapeGeo2 = new THREE.OctahedronGeometry(2.4, 0);

    for (let i = 0; i < 8; i++) {
      const geo = i % 2 === 0 ? shapeGeo1 : shapeGeo2;
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xF97316 : 0x0284C7,
        wireframe: true,
        transparent: true,
        opacity: isDark() ? 0.28 : 0.16
      });
      const mesh = new THREE.Mesh(geo, mat);
      const x = (Math.random() - 0.5) * (isMobileInitial ? 35 : 110);
      const y = (Math.random() - 0.5) * 320 - 80;
      const z = (Math.random() - 0.5) * 40 - 10;
      mesh.position.set(x, y, z);
      geomGroup.add(mesh);
      floatingShapes.push({
        mesh,
        rx: (Math.random() - 0.5) * 0.012,
        ry: (Math.random() - 0.5) * 0.014
      });
    }

    // Books Cascade
    const booksGroup = new THREE.Group();
    scene.add(booksGroup);
    const floatingBooks = [];

    function addCascadeBook(x, y, z, scale, ry, rx, rz) {
      const book = buildCascadeBookMesh(scale);
      book.position.set(x, y, z);
      book.rotation.set(rx, ry, rz);
      booksGroup.add(book);

      floatingBooks.push({
        mesh: book,
        baseX: x,
        baseY: y,
        baseZ: z,
        baseRx: rx,
        baseRy: ry,
        baseRz: rz,
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
    }

    // Frustum-Based Dynamic Positioning
    function populateBooks() {
      // Clear existing books
      while (booksGroup.children.length > 0) {
        booksGroup.remove(booksGroup.children[0]);
      }
      floatingBooks.length = 0;

      const isMobile = window.innerWidth < 768;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleH = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleW = visibleH * camera.aspect;
      const halfW = visibleW / 2;

      if (isMobile) {
        // MOBILE PHONES: Perfectly bounded inside phone screen (-halfW to +halfW)
        // With halfW ≈ 17.5, x positions stay comfortably between -13 and +13
        const mPositions = [
          // Hero header & top area (Y: +30 to 0)
          { x: -11, y:  26, z:  8, s: 0.95, ry:  0.42, rx:  0.18, rz: -0.12 },
          { x:  11, y:  20, z:  4, s: 0.92, ry: -0.48, rx: -0.15, rz:  0.10 },
          { x:  -9, y:   6, z: -8, s: 0.82, ry:  0.80, rx:  0.12, rz:  0.22 },
          { x:  10, y:  -8, z: -6, s: 0.86, ry: -0.70, rx:  0.25, rz: -0.15 },

          // Problem section (Y: -25 to -60)
          { x: -11, y: -30, z:  6, s: 0.94, ry:  0.55, rx: -0.20, rz:  0.14 },
          { x:  11, y: -45, z:  5, s: 0.92, ry: -0.42, rx:  0.18, rz: -0.12 },
          { x:  -8, y: -60, z: -10,s: 0.80, ry:  1.05, rx:  0.10, rz:  0.20 },

          // Bento & Features (Y: -75 to -125)
          { x:  10, y: -78, z:  7, s: 0.95, ry: -0.52, rx: -0.14, rz:  0.12 },
          { x: -11, y: -95, z:  5, s: 0.92, ry:  0.40, rx:  0.22, rz: -0.15 },
          { x:   9, y:-115, z: -8, s: 0.84, ry: -0.38, rx:  0.16, rz: -0.10 },

          // Comparison & Ages (Y: -135 to -180)
          { x: -11, y:-138, z:  6, s: 0.94, ry:  0.48, rx: -0.22, rz:  0.10 },
          { x:  11, y:-156, z:  5, s: 0.90, ry: -0.60, rx:  0.14, rz: -0.18 },
          { x:  -9, y:-175, z: -10,s: 0.82, ry:  0.95, rx:  0.12, rz:  0.15 },

          // Sample & Reviews (Y: -195 to -240)
          { x:  11, y:-198, z:  7, s: 0.95, ry: -0.48, rx: -0.12, rz:  0.16 },
          { x: -10, y:-218, z:  4, s: 0.90, ry:  0.65, rx: -0.15, rz:  0.10 },

          // FAQ & Order (Y: -250 to -290)
          { x:  10, y:-252, z:  6, s: 0.94, ry: -0.42, rx:  0.18, rz: -0.12 },
          { x: -11, y:-272, z:  5, s: 0.92, ry:  0.50, rx: -0.20, rz:  0.14 }
        ];

        mPositions.forEach(p => addCascadeBook(p.x, p.y, p.z, p.s, p.ry, p.rx, p.rz));
      } else {
        // DESKTOP & LAPTOPS: Balanced across screen width, flanking cards + floating through depth
        const xFlank = Math.min(Math.max(halfW * 0.58, 26), 46);

        const dPositions = [
          { x: -xFlank * 0.92, y:  26, z:   8, s: 1.22, ry:  0.45, rx:  0.15, rz: -0.10 },
          { x:  xFlank * 0.95, y:  16, z:   6, s: 1.18, ry: -0.55, rx: -0.20, rz:  0.12 },
          { x: -xFlank * 1.10, y: -25, z: -14, s: 1.05, ry:  0.80, rx:  0.10, rz:  0.22 },
          { x:  xFlank * 1.05, y: -55, z:   6, s: 1.18, ry: -0.45, rx:  0.20, rz: -0.12 },
          { x: -xFlank * 0.92, y: -90, z:   7, s: 1.20, ry:  0.60, rx: -0.18, rz:  0.14 },
          { x:  xFlank * 0.96, y:-125, z: -12, s: 1.00, ry: -0.55, rx: -0.12, rz:  0.14 },
          { x: -xFlank * 1.05, y:-165, z:   6, s: 1.18, ry:  0.50, rx: -0.22, rz:  0.10 },
          { x:  xFlank * 0.95, y:-205, z:   7, s: 1.20, ry: -0.50, rx:  0.15, rz:  0.18 },
          { x: -xFlank * 0.92, y:-245, z:   6, s: 1.18, ry:  0.45, rx:  0.18, rz: -0.12 },
          { x:  xFlank * 1.02, y:-285, z:   5, s: 1.15, ry: -0.60, rx: -0.15, rz:  0.15 }
        ];

        dPositions.forEach(p => addCascadeBook(p.x, p.y, p.z, p.s, p.ry, p.rx, p.rz));
      }
    }

    populateBooks();

    // Mouse & Scroll Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let targetScrollY = 0;
    let currentCamY = 0;
    let isPageVisible = true;

    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
    });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    let maxScroll = 1;
    function calculateMaxScroll() {
      const docH = document.documentElement.scrollHeight || 1;
      const winH = window.innerHeight || 1;
      maxScroll = Math.max(docH - winH, 1);
    }
    calculateMaxScroll();

    // Window Resize Handler
    function onBgResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      calculateMaxScroll();
      populateBooks();
    }
    window.addEventListener('resize', onBgResize);

    // Theme sync
    function updateThemeColors() {
      const dark = isDark();
      ambientLight.intensity = dark ? 0.9 : 1.15;
      dirLight1.intensity = dark ? 1.2 : 1.35;
      pMaterial.opacity = dark ? 0.75 : 0.50;
      floatingShapes.forEach(s => {
        s.mat.opacity = dark ? 0.35 : 0.20;
      });
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        setTimeout(updateThemeColors, 50);
      });
    }

    // Animation Loop with Snappy, Silky-Smooth 60/120 FPS Responsiveness
    let clock = 0;
    const threeClock = new THREE.Clock();

    function animateBg() {
      requestAnimationFrame(animateBg);

      if (!isPageVisible) return;
      const delta = Math.min(threeClock.getDelta(), 0.05);
      clock += delta;

      const isMobile = window.innerWidth < 768;

      // Sample scroll position directly each frame for zero-lag sync
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

      // Books organic random multi-harmonic floating in 3D space
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
        b.mesh.rotation.z = b.baseRz + Math.cos(clock * b.freqZ + b.offsetZ) * 0.08;
      }

      // Polyhedra rotation
      for (let i = 0; i < floatingShapes.length; i++) {
        const s = floatingShapes[i];
        s.mesh.rotation.x += s.rx;
        s.mesh.rotation.y += s.ry;
      }

      // GPU-native particle rotation (Zero CPU-GPU memory bus buffer upload overhead)
      particles.rotation.y = clock * 0.012;
      particles.rotation.x = Math.sin(clock * 0.2) * 0.05;

      renderer.render(scene, camera);
    }
    animateBg();
  }

  // Initialize both when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHeroBook();
      initBackgroundStream();
    });
  } else {
    initHeroBook();
    initBackgroundStream();
  }
})();
