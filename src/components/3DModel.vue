<script setup lang="ts">
import {
  AmbientLight,
  Clock,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  SpotLight,
  SpotLightHelper,
  WebGLRenderer,
} from "three";
import {
  MTLLoader,
  OBJLoader,
  TrackballControls,
} from "three/examples/jsm/Addons.js";
import { onMounted, ref, useTemplateRef } from "vue";

let scene: Scene | null = null;
let camera: PerspectiveCamera | null = null;
let renderer: WebGLRenderer | null = null;
let trackballControls: TrackballControls | null = null;

const container = useTemplateRef("container");

const percent = ref(0);

async function init() {
  scene = new Scene(); //场景构建
  camera = new PerspectiveCamera(45, 749 / 750, 0.1, 1000); //相机构建
  renderer = new WebGLRenderer({
    antialias: false,
    alpha: true, // 设置透明
  });

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(749, 750);
  renderer.shadowMap.enabled = true; //激活阴影

  trackballControls = new TrackballControls(camera);
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 1.0;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  //设置旋转速度
  trackballControls.rotateSpeed = 5;
  //设置相机距离原点的最远距离
  trackballControls.minDistance = 10;
  //设置相机距离原点的最远距离
  trackballControls.maxDistance = 50;

  const planeGeometry = new PlaneGeometry(40, 20);
  //const planeMaterial = new MeshBasicMaterial({color:0xcccccc});
  const planeMaterial = new MeshLambertMaterial({
    color: 0xffffff,
  });

  //添加材质灯光阴影
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(-10, 20, 10);
  spotLight.castShadow = true;

  //创建一个环境灯光
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  //创建一个点灯光
  const pointLight = new PointLight(0xffffff, 0.9);

  //给模型添加灯光
  camera.add(pointLight);

  scene.add(spotLight);

  const sphereSize = 1;
  const pointLightHelper = new PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  const spotLightHelper = new SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  const onProgress = function (event: ProgressEvent) {
    if (event.lengthComputable) {
      percent.value = (event.loaded / event.total) * 100;
    }
  };

  const mtlLoader = new MTLLoader();
  const materials = await mtlLoader.loadAsync("/models/SanCaiMa.mtl");

  if (materials) {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    const obj = await objLoader.loadAsync("/models/SanCaiMa.obj", onProgress);

    if (obj) {
      // 设置旋转中心点
      obj.children[0].geometry.computeBoundingBox();
      obj.children[0].geometry.center();

      obj.position.y = 1;
      obj.rotation.y = 0.2;
      obj.scale.set(2, 2, 2);
      // 将模型加入到场景
      scene.add(obj);
    }
  }

  camera.position.x = -30;
  camera.position.y = 0;
  camera.position.z = 10;
  camera.lookAt(scene.position);

  renderScene();

  // 设置颜色
  renderer.setClearColor(0xffffff, 0);
  // 设置分辨率
  renderer.setPixelRatio(window.devicePixelRatio);
  // 设置渲染尺寸
  renderer.setSize(749, 750);

  if (container.value) {
    container.value.appendChild(renderer.domElement);
  }
  // 自适应监听
  window.addEventListener("resize", resize, false);

  animate();
}

function renderScene() {
  var clock = new Clock();
  var delta = clock.getDelta();
  if (trackballControls) {
    trackballControls.update(delta);
  }
  requestAnimationFrame(renderScene);
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function resize() {
  if (camera) {
    camera.aspect = 749 / 750;
    camera.updateProjectionMatrix();
  }

  if (renderer) {
    renderer.setSize(749, 750);
  }
}

// 时刻渲染
function animate() {
  if (trackballControls) {
    trackballControls.update();
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

onMounted(() => {
  init();
});
</script>

<template>
  <div ref="container"></div>
  <div class="progress" :style="{ display: percent < 100 ? 'block' : 'none' }">
    <div class="mask"></div>
    <div class="loading">
      <div class="trends" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
