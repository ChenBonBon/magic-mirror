<script setup lang="ts">
import {
  AmbientLight,
  Color,
  DoubleSide,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { type GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps<{
  width: number;
  height: number;
  url: string;
  bgColor?: string;
}>();

const mounted = ref(false);

// 本地开发路径
// const url = "../public/static/model/model.glb";
// 打包路径
const renderThree = () => {
  // 初始化场景
  const scene = new Scene();
  // 设置场景背景色
  if (props.bgColor) {
    scene.background = new Color(props.bgColor);
  } else {
    scene.background = null;
  }
  // 初始化相机
  const camera = new PerspectiveCamera(
    75,
    props.width / props.height,
    0.1,
    1000
  );
  // 初始化渲染器
  const renderer = new WebGLRenderer({
    // 开启抗锯齿
    antialias: true,
    alpha: true,
  });
  // 设置渲染器大小
  renderer.setSize(props.width, props.height);

  const viewBox = document.getElementById("viewBox") as HTMLElement;

  while (viewBox.firstChild) {
    viewBox.removeChild(viewBox.firstChild);
  }

  // 渲染器追加至节点中
  viewBox.appendChild(renderer.domElement);

  // 初始化射线辅助器
  const rayCaster = new Raycaster();

  // 鼠标控制对象
  const mouse = new Vector2();

  camera.position.z = 5;
  // 添加轨道控制器(控制的是相机)
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置带阻尼的惯性
  controls.enableDamping = true;
  // 设置阻尼系数，系数越小惯性越大
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.enableZoom = false;

  // 初始化模型加载器
  const loader = new GLTFLoader();
  // 初始化模型解压器
  const dracoLoader = new DRACOLoader();
  // 设置解压器使用位置（本地开发路径）
  // dracoLoader.setDecoderPath('../public/static/draco/')
  // 设置解压器使用位置（打包路径）
  dracoLoader.setDecoderPath("/scripts/draco/");
  // 设置模型载入解压器
  loader.setDRACOLoader(dracoLoader);

  // 加载模型
  loader.load(props.url, (gltf: GLTF) => {
    // 聚光灯
    var spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-10, 20, 10);
    spotLight.castShadow = true;

    // 环境光
    var ambientLight = new AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    // 点光源附加到相机
    var pointLight = new PointLight(0xffffff, 5);
    camera.add(pointLight);
    scene.add(spotLight);

    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        // 模型双面渲染
        child.material.side = DoubleSide;
        // 光照是否有阴影
        child.castShadow = true;
        // 是否接收阴影
        child.receiveShadow = true;
        child.frustumCulled = false;
      }
    });

    const model = gltf.scene;
    // 将模型添加至场景中
    scene.add(model);

    // 设置模型加载完毕后大小
    model.scale.set(3.0, 3.0, 3.0);
  });

  const clickEvent = (event: MouseEvent) => {
    // 得到鼠标相对于容器的坐标
    mouse.x = (event.clientX / props.width) * 2 - 1;
    mouse.y = -(event.clientY / props.height) * 2 + 1;

    // 执行射线检测
    rayCaster.setFromCamera(mouse, camera);
  };

  document.addEventListener("click", clickEvent, false);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
};

onMounted(() => {
  mounted.value = true;
  renderThree();
});

watchEffect(() => {
  if (mounted.value) {
    renderThree();
  }
});
</script>

<template>
  <div class="container-three-box">
    <div class="view-box" id="viewBox"></div>
  </div>
</template>

<style lang="less"></style>
