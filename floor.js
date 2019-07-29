window.onload = function() {
  const CONFIG = {
    red: 0xF8ACAC,
    blue: 0x84A3E4,
    lightBlue: 0xA0C6DB,
    green: 0x77CC91,
    yellow: 0xEED18D,
    borderColor: 0x101010,
  }
  const BASIC_GRID = 1;
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
  function createBoxBorder(param) {
    let boxBorder = new THREE.BoxHelper(param.mesh, param.color);
    boxBorder.material.blending = THREE.AdditiveBlending;
    boxBorder.material.transparent = true;
    return boxBorder;
  }

  /**
   * 创建基础元素，场景、相机、渲染器
   */
  // 设置视距比例
  var aspectRatio = window.innerWidth/window.innerHeight;
  // 创建场景
  var scene = new THREE.Scene();
  //设置场景背景色
  // scene.background = new THREE.Color( 0xff0000 );
  //创建相机
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  // 设置相机起始位置
  camera.position.set(0, 20, 10);
  // 创建渲染器
  var renderer = new THREE.WebGLRenderer(
    { antialias: true }
    // { alpha: true }
  );
  // 设置渲染器大小，一般都与窗口大小一致
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 环境颜色
  renderer.setClearColor(0xbfe3dd, 1);
  // 阴影渲染设置
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // 添加方向辅助线
  scene.add( new THREE.AxesHelper(5));
  // 添加网格
  scene.add(new THREE.GridHelper(30, 30));
  // 将渲染器挂载到节点
  document.getElementById("floor").appendChild(renderer.domElement);

  // 视角控制器
  var control = new THREE.OrbitControls(camera, renderer.domElement);
  // control.autoRotate = true;  // 自动旋转
  // control.autoRotateSpeed = 10.0;  // 自动旋转速度
  control.enableDamping = true;  // 阻尼系数是否启用
  control.dampingFactor = 0.5;  // 阻尼系数
  control.enableZoom = true;   // 滚轮缩放
  control.zoomSpeed = 2.0;     // 缩放速度
  control.maxDistance = 200;    // 放大最远距离
  control.minDistance = 1;      // 放大最近距离
  control.enablePan = true;    // camera平移是否启用,默认开启(按住右键)
  control.panSpeed = 0.5;       // camera平移速度
  control.update();

  // 创建组对象
  let group_center = new THREE.Group();
  let group_north = new THREE.Group();
  let group_east = new THREE.Group();
  let group_south = new THREE.Group();
  let group_west = new THREE.Group();

  /**
   * 中部区域组
   */
  let center_geo_0 = createBoxGeo({ width: 2*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_0.position.set(-3*BASIC_GRID, 0*BASIC_GRID, -3*BASIC_GRID);
  let center_border_0 = createBoxBorder({ mesh: center_geo_0, color: CONFIG.borderColor });

  let center_geo_1 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_1.position.set(-1.5*BASIC_GRID, 0, -3*BASIC_GRID);
  let center_border_1 = createBoxBorder({ mesh: center_geo_1, color: CONFIG.borderColor });

  let center_geo_2 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_2.position.set(-0.5*BASIC_GRID, 0, -3*BASIC_GRID);
  let center_border_2 = createBoxBorder({ mesh: center_geo_2, color: CONFIG.borderColor });

  let center_geo_3 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 3*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_3.position.set(0.5*BASIC_GRID, 0, -2.5*BASIC_GRID);
  let center_border_3 = createBoxBorder({ mesh: center_geo_3, color: CONFIG.borderColor });

  let center_geo_4 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 3*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_4.position.set(1.5*BASIC_GRID, 0, -2.5*BASIC_GRID);
  let center_border_4 = createBoxBorder({ mesh: center_geo_4, color: CONFIG.borderColor });

  let center_geo_5 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_5.position.set(2.5*BASIC_GRID, 0, -3*BASIC_GRID);
  let center_border_5 = createBoxBorder({ mesh: center_geo_5, color: CONFIG.borderColor });

  let center_geo_6 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_6.position.set(3.5*BASIC_GRID, 0, -3*BASIC_GRID);
  let center_border_6 = createBoxBorder({ mesh: center_geo_6, color: CONFIG.borderColor });

  let center_geo_7 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.lightBlue });
  center_geo_7.position.set(-3.5*BASIC_GRID, 0, -1.5*BASIC_GRID);
  let center_border_7 = createBoxBorder({ mesh: center_geo_7, color: CONFIG.borderColor });

  let center_geo_8 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.red });
  center_geo_8.position.set(-3.5*BASIC_GRID, 0, -0.5*BASIC_GRID);
  let center_border_8 = createBoxBorder({ mesh: center_geo_8, color: CONFIG.borderColor });

  let center_geo_9 = createBoxGeo({ width: 2*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.red });
  center_geo_9.position.set(-2*BASIC_GRID, 0, -1*BASIC_GRID);
  let center_border_9 = createBoxBorder({ mesh: center_geo_9, color: CONFIG.borderColor });

  let center_geo_10 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 2*BASIC_GRID, color: CONFIG.blue });
  center_geo_10.position.set(-0.5*BASIC_GRID, 0, -1*BASIC_GRID);
  let center_border_10 = createBoxBorder({ mesh: center_geo_10, color: CONFIG.borderColor });

  let center_geo_11 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.red });
  center_geo_11.position.set(0.5*BASIC_GRID, 0, -0.5*BASIC_GRID);
  let center_border_11 = createBoxBorder({ mesh: center_geo_11, color: CONFIG.borderColor });

  let center_geo_12 = createBoxGeo({ width: 1*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.blue });
  center_geo_12.position.set(1.5*BASIC_GRID, 0, -0.5*BASIC_GRID);
  let center_border_12 = createBoxBorder({ mesh: center_geo_12, color: CONFIG.borderColor });

  let center_geo_13 = createBoxGeo({ width: 2*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.blue });
  center_geo_13.position.set(3*BASIC_GRID, 0, -1.5*BASIC_GRID);
  let center_border_13 = createBoxBorder({ mesh: center_geo_13, color: CONFIG.borderColor });

  let center_geo_14 = createBoxGeo({ width: 2*BASIC_GRID, height: 1*BASIC_GRID, depth: 1*BASIC_GRID, color: CONFIG.blue });
  center_geo_14.position.set(3*BASIC_GRID, 0, -0.5*BASIC_GRID);
  let center_border_14 = createBoxBorder({ mesh: center_geo_14, color: CONFIG.borderColor });

  group_center.add(center_geo_0);
  group_center.add(center_border_0);
  group_center.add(center_geo_1);
  group_center.add(center_border_1);
  group_center.add(center_geo_2);
  group_center.add(center_border_2);
  group_center.add(center_geo_3);
  group_center.add(center_border_3);
  group_center.add(center_geo_4);
  group_center.add(center_border_4);
  group_center.add(center_geo_5);
  group_center.add(center_border_5);
  group_center.add(center_geo_6);
  group_center.add(center_border_6);
  group_center.add(center_geo_7);
  group_center.add(center_border_7);
  group_center.add(center_geo_8);
  group_center.add(center_border_8);
  group_center.add(center_geo_9);
  group_center.add(center_border_9);
  group_center.add(center_geo_10);
  group_center.add(center_border_10);
  group_center.add(center_geo_11);
  group_center.add(center_border_11);
  group_center.add(center_geo_12);
  group_center.add(center_border_12);
  group_center.add(center_geo_13);
  group_center.add(center_border_13);
  group_center.add(center_geo_14);
  group_center.add(center_border_14);
  group_center.translateZ(2);
  scene.add(group_center);
  
  /**
   * 南部区域组
   */
  // 创建区块
  let cube = createBoxGeo({width: 3, height: 1, depth: 3, color: 0x84A3E4});
  cube.position.set(0, 0.5, 0);
  let cubeBorder = createBoxBorder({mesh: cube, color: 0x101010});
  group_south.add(cube);
  group_south.add(cubeBorder);
  
  // 创建加载器
  let loader = new THREE.FontLoader();
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
    group_south.add(fontObj);
  })
  
  // 添加区块
  let box1 = createBoxGeo({ width: 1, height: 1, depth: 3, color: 0x84A3E4 });
  box1.position.set(-2, 0.5, 0);
  let box1Border = createBoxBorder({mesh: box1, color: 0x101010});
  group_south.add(box1Border);
  group_south.add(box1);
  
  // 添加区块
  let box2 = createBoxGeo({ width: 1, height: 1, depth: 3, color: 0x84A3E4 });
  box2.position.set(-3, 0.5, 0);
  let box2Border = createBoxBorder({mesh: box2, color: 0x101010});
  group_south.add(box2Border);
  group_south.add(box2);
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
  // 设置边缘线
  let wireframe = lineSegments({ mesh: cmesh.geometry, color: 0xdddddd });
  wireframe.position.set(-5, 0.49, 0);
  group_south.add(cmesh);
  group_south.add(wireframe);
  // 整组偏移
  group_south.translateX(1.5);
  group_south.translateZ(5.5);

  // 添加组到场景中
  scene.add(group_south);

  // 动画
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