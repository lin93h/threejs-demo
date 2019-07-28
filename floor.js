window.onload = function() {
  // 实例box几何
  function createBoxGeo(param) {
    let geometry = new THREE.BoxGeometry(param.width, param.height, param.depth);
    let material = new THREE.MeshBasicMaterial({ color: param.color });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
  
  // 不规则几何边缘线
  function lineSegments(param) {
    let edges = new THREE.EdgesGeometry(param.mesh);
    let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: param.color}));
    return line;
  }

  // 立方体边缘线
  function customBoxBorder(param) {
    let boxBorder = new THREE.BoxHelper(param.mesh, param.color);
    // boxBorder.material.color.setHex( color );
    boxBorder.material.blending = THREE.AdditiveBlending;
    boxBorder.material.transparent = true;
    return boxBorder;
  }
  var group = new THREE.Group();
  var aspectRatio = window.innerWidth/window.innerHeight;
  var scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xff0000 ); //设置场景背景色
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 8, 5);
  // 创建场景
  var renderer = new THREE.WebGLRenderer(
    { antialias: true }
    // { alpha: true }
  );  
  renderer.setClearColor(0xbfe3dd, 1);
  scene.add( new THREE.AxesHelper( 5 ) );
  scene.add(new THREE.GridHelper(20, 20))
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("floor").appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  let loader = new THREE.FontLoader();
  
  // 创建区块
  let cube = createBoxGeo({width: 3, height: 1, depth: 3, color: 0x84A3E4});
  cube.position.set(0, 0.5, 0);
  let cubeBorder = customBoxBorder({mesh: cube, color: 0x101010});
  group.add(cube);
  group.add(cubeBorder);

  // 添加字体
  loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {
    let fontG = new THREE.TextGeometry("aaaaaa", {
      font: font,
      size: 0.5,
      height: 0.1,
    })
    fontG.rotateX(-Math.PI*0.5);
    let fontM = new THREE.MeshBasicMaterial({color: 0x000000});
    let fontObj = new THREE.Mesh(fontG, fontM);
    fontObj.position.set(0,1,0);
    scene.add(fontObj);
  })
  
  // 添加区块
  let box1 = createBoxGeo({ width: 1, height: 1, depth: 3, color: 0x84A3E4 });
  box1.position.set(-2, 0.5, 0);
  let box1Border = customBoxBorder({mesh: box1, color: 0x101010});
  group.add(box1Border);
  group.add(box1);
  
  // 添加区块
  let box2 = createBoxGeo({ width: 1, height: 1, depth: 3, color: 0x84A3E4 });
  box2.position.set(-3, 0.5, 0);
  let box2Border = customBoxBorder({mesh: box2, color: 0x101010});
  group.add(box2Border);
  group.add(box2);
  //====================//
  // 用threebsp创建几何组合
  let cylinderGeometry = new THREE.BoxGeometry(3,1,3);
  let boxGeometry = new THREE.BoxGeometry(1,1,1);

  // 创建材质
  let materials = new THREE.MeshBasicMaterial({wireframe: true});

  // 创建Mesh
  let cylinder = new THREE.Mesh(cylinderGeometry,materials);
  let cbox = new THREE.Mesh(boxGeometry, materials);
  cylinder.position.set(-5, 0.5, 0)
  cbox.position.set(-6, 0.5, -1);
  let cylinderBSP = new ThreeBSP(cylinder);
  let boxBSP = new ThreeBSP(cbox);
  let result = cylinderBSP.subtract(boxBSP);

  // 将BSP对象转化为Mesh对象
  let cmesh = result.toMesh();
  cmesh.geometry.computeFaceNormals();
  cmesh.geometry.computeVertexNormals();

  // 重新为mesh赋一个材质
  cmesh.material = new THREE.MeshBasicMaterial({color: 0xF8ACAC});
  
  let wireframe = lineSegments({ mesh: cmesh.geometry, color: 0xdddddd })
  wireframe.position.set(-5, 0.49, 0);
  group.add(cmesh);
  scene.add( wireframe );

  scene.add(group);
  
  var control = new THREE.OrbitControls(camera, renderer.domElement);
  // control.autoRotate = true;  // 自动旋转
  // control.autoRotateSpeed = 10.0;  // 自动旋转速度
  control.enableDamping = true;  // 阻尼系数是否启用
  control.dampingFactor = 0.5;  // 阻尼系数
  control.enableZoom = true;   // 滚轮缩放
  control.zoomSpeed = 2.0;     // 缩放速度
  control.maxDistance = 20;    // 放大最远距离
  control.minDistance = 1;      // 放大最近距离
  control.enablePan = true;    // camera平移是否启用,默认开启(按住右键)
  control.panSpeed = 0.5;       // camera平移速度
  control.update();

  function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
  }
  animate();

  // 窗口大小改变更新相机和渲染器参数
  window.onresize = function() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
}