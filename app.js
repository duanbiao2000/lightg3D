let scene, camera, renderer;

const init = () => {
  // 创建场景（Scene）
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // 创建渲染器（Renderer）
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 创建相机（Camera）
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 5000);
  camera.rotation.y = (90 / 180) * Math.PI;
  camera.position.set(0.5, 0, 0);

  // 创建相机控制器（Camera Controls）
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);

  // 创建环境光（Ambient Light）
  const ambientLight = new THREE.AmbientLight(0xaaaaaa, 20);
  scene.add(ambientLight);

  // 加载模型
  const loader = new THREE.GLTFLoader();
  loader.load('scene.gltf', (result) => {
    scene.add(result.scene);
    // renderer.render(scene, camera); //加载一帧
    animate();
  });
};

//递归循环渲染场景Recursive Loop for Render Scene
const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate);
};

init();
