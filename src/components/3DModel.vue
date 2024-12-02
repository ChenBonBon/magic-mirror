<script setup lang="ts">
import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { onMounted, ref } from "vue";

const scene = ref<THREE.Scene>();
const camera = ref<THREE.PerspectiveCamera>();
const renderer = ref<THREE.WebGLRenderer>();
const trackballControls = ref<TrackballControls>();
const percent = ref(0);

function init() {
  createScene();
  const newCamera = createCamera();
  createRenderer();
  createTrackballControls(newCamera);
  addLight();
}

function createScene() {
  //场景构建
  const _scene = new THREE.Scene();

  scene.value = _scene;

  return _scene;
}

function createCamera() {
  //相机构建
  const _camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.value = _camera;

  return _camera;
}

function createRenderer() {
  //创建一个webgl对象
  const _renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true, // 设置透明
  });

  _renderer.setSize(window.innerWidth, window.innerHeight);
  _renderer.setClearColor(0xeeeeee);
  _renderer.shadowMap.enabled = true; //激活阴影

  renderer.value = _renderer;

  return _renderer;
}

function createTrackballControls(camera: THREE.PerspectiveCamera) {
  const _trackballControls = new TrackballControls(camera);

  // 设置旋转速度
  _trackballControls.rotateSpeed = 5;
  // 设置缩放速度
  _trackballControls.zoomSpeed = 1.0;
  // 设置平移速度
  _trackballControls.panSpeed = 1.0;
  // 是否有惯性
  _trackballControls.staticMoving = true;
  // 惯性的阻尼
  _trackballControls.dynamicDampingFactor = 0.3;
  //设置相机距离原点的最远距离
  _trackballControls.minDistance = 10;
  //设置相机距离原点的最远距离
  _trackballControls.maxDistance = 50;

  trackballControls.value = _trackballControls;

  return _trackballControls;
}

function _createSpotLight() {
  //添加材质灯光阴影
  const _spotLight = new THREE.SpotLight(0xffffff);
  _spotLight.position.set(-10, 20, 10);
  _spotLight.castShadow = true;

  return _spotLight;
}

function _createAmbientLight() {
  //创建一个环境灯光
  const _ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

  return _ambientLight;
}

function _createPointLight() {
  const _pointLight = new THREE.PointLight(0xffffff, 0.9);

  return _pointLight;
}

function addLight() {
  const spotLight = _createSpotLight();
  const ambientLight = _createAmbientLight();
  const pointLight = _createPointLight();

  if (scene.value) {
    scene.value.add(spotLight);
    scene.value.add(ambientLight);
  }

  if (camera.value) {
    camera.value.add(pointLight);
  }
}

function loadModel() {
  const onProgress = function (event: ProgressEvent) {
    if (event.lengthComputable) {
      percent.value = (event.loaded / event.total) * 100;
    }
  };
  const onError = function (err: any) {
    console.error(err);
  };

  const mtlLoader = new MTLLoader();

  mtlLoader.load("/models/SanCaiMa.mtl", function (materials) {
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      "/models/SanCaiMa.obj",
      function (object) {
        // 设置旋转中心点
        object.children[0].geometry.computeBoundingBox();
        object.children[0].geometry.center();

        object.position.y = 1;
        object.rotation.y = 0.2;
        object.scale.set(2, 2, 2);
        // 将模型加入到场景
        if (scene.value) {
          scene.value.add(object);
        }
      },
      onProgress,
      onError
    );
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="percent">{{ percent.toFixed(2) }}<span>% 已经加载</span></div>
  <div class="progress" :style="{ display: percent < 100 ? 'block' : 'none' }">
    <div class="mask"></div>
    <div class="loading">
      <div class="trends" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
