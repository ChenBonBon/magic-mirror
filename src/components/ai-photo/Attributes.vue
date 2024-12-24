<script setup lang="ts">
import { ref } from "vue";
import Cursor from "../Cursor.vue";

export type Gender = "Man" | "Woman";
export type Pose = "pose1" | "pose2";

const props = defineProps<{
  gender: Gender;
  pose: Pose;
  animation?: boolean;
  onClick: () => void;
  onChangeGender: (gender: Gender) => void;
  onChangePose: (pose: Pose) => void;
}>();

const clicked = ref(false);

function handleClick() {
  clicked.value = true;

  props.onClick();
}
</script>

<template>
  <div class="attributes" @click="handleClick">
    <div
      :class="['attribute-wrapper', props.gender === 'Man' ? 'active' : '']"
      @click="onChangeGender('Man')"
    >
      <img src="/images/ai-photo/boy.png" class="attribute" />
    </div>
    <div
      :class="['attribute-wrapper', props.gender === 'Woman' ? 'active' : '']"
      @click="onChangeGender('Woman')"
    >
      <img src="/images/ai-photo/girl.png" class="attribute" />
    </div>
    <div
      :class="['attribute-wrapper', props.pose === 'pose1' ? 'active' : '']"
      @click="onChangePose('pose1')"
    >
      <img src="/images/ai-photo/half.png" class="attribute" />
    </div>
    <div
      :class="['attribute-wrapper', props.pose === 'pose2' ? 'active' : '']"
      @click="onChangePose('pose2')"
    >
      <img src="/images/ai-photo/full.png" class="attribute" />
    </div>
    <cursor v-show="!clicked && animation" class="cursor" />
  </div>
</template>

<style lang="less" scoped>
.attributes {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  position: absolute;
  top: 1048px;
  left: 62px;
  .attribute-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 101px;
    height: 101px;
    background-image: url("/images/ai-photo/attribute-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    border: 10px solid transparent;
    border-radius: 50%;
    &.active {
      border-color: #ffffff;
    }
    .attribute {
      height: 75px;
    }
  }
  .cursor {
    top: 25%;
    left: 30%;
    width: 200px;
    height: 200px;
  }
}
</style>
