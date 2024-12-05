<script setup>
import { onMounted, useTemplateRef } from "vue";

const props = defineProps({
  path: String,
  model: String,
  image: String,
  material: String,
  onNext: Function,
});

const container = useTemplateRef("container");
const output = useTemplateRef("output");

onMounted(() => {
  const scene = new THREE.Scene(); //场景构建
  const camera = new THREE.PerspectiveCamera(45, 640 / 640, 0.1, 1000); //相机构建
  //创建一个webgl对象
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true, // 设置透明
  });
  // 容器
  const modelContainer = document.createElement("div");
  if (container.value) {
    container.value.appendChild(modelContainer);
  }

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(640, 640);
  renderer.shadowMapEnabled = true; //激活阴影
  //构建一个坐标轴
  const axes = new THREE.AxisHelper(20);
  //scene.add(axes);
  //创建控件并绑定在相机上
  //控制器

  const trackballControls = new THREE.TrackballControls(camera);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 1.0;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  //设置旋转速度
  trackballControls.rotateSpeed = 5;
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  trackballControls.enableDamping = true;
  //是否可以缩放
  trackballControls.enableZoom = true;
  //是否自动旋转
  trackballControls.autoRotate = true;

  //设置相机距离原点的最远距离
  trackballControls.minDistance = 10;
  //设置相机距离原点的最远距离
  trackballControls.maxDistance = 50;
  //是否开启右键拖拽
  trackballControls.enablePan = true;

  const planeGeometry = new THREE.PlaneGeometry(40, 20);
  //const planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  // //转换对光源有渲染的材质
  // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // plane.rotation.x = -0.5 * Math.PI;
  // plane.position.x = 15;
  // plane.position.y = 0;
  // plane.position.x = 0;

  // scene.add(plane);
  // plane.receiveShadow = true;

  //添加材质灯光阴影
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-10, 20, 10);
  spotLight.castShadow = true;

  //创建一个环境灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  //创建一个点灯光
  const pointLight = new THREE.PointLight(0xffffff, 0.9);

  //给模型添加灯光
  camera.add(pointLight);

  scene.add(spotLight);

  // model
  const onProgress = function (xhr) {};
  const onError = function (xhr) {};
  const mtlLoader = new THREE.MTLLoader();

  mtlLoader.setPath(props.path);
  mtlLoader.load(props.material, function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(props.path);
    objLoader.load(
      props.model,
      function (object) {
        // 设置旋转中心点
        object.children[0].geometry.computeBoundingBox();
        object.children[0].geometry.center();

        object.position.y = 1;
        object.rotation.y = 0.2;
        object.scale.set(2, 2, 2);
        // 将模型加入到场景
        scene.add(object);
      },
      onProgress,
      onError
    );
  });
  //渲染视图视角
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;
  camera.lookAt(scene.position);

  if (output.value) {
    output.value.append(renderer.domElement);
  }
  renderScene();

  // 设置颜色
  renderer.setClearColor(0xffffff, 0);
  // 设置分辨率
  renderer.setPixelRatio(window.devicePixelRatio);
  // 设置渲染尺寸
  renderer.setSize(640, 640);
  modelContainer.appendChild(renderer.domElement);
  // 自适应监听
  window.addEventListener("resize", resize, false);

  function renderScene() {
    const clock = new THREE.Clock();
    const delta = clock.getDelta();
    trackballControls.update(delta);
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
  animate();

  // 监听窗口自适应
  function resize() {
    camera.aspect = 640 / 640;
    camera.updateProjectionMatrix();
    renderer.setSize(640, 640);
  }

  // 时刻渲染
  function animate() {
    trackballControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
});
</script>

<template>
  <div ref="container">
    <div ref="output"></div>
  </div>
</template>

<style lang="less" scoped></style>
