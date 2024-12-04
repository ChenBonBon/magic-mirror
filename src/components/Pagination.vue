<script setup lang="ts">
defineProps<{
  step: number;
  total: number;
  onClick: (newStep: number) => void;
}>();
</script>

<template>
  <div class="pagination" v-if="step <= total">
    <div class="pagination-text">
      <img
        src="/images/pagination/step-3/1.png"
        alt="step-1"
        class="step-1"
        v-if="step === 1 && total === 3"
      />
      <img
        src="/images/pagination/step-3/2.png"
        alt="step-2"
        class="step-2"
        v-else-if="step === 2 && total === 3"
      />
      <img
        src="/images/pagination/step-3/3.png"
        alt="step-3"
        class="step-3"
        v-else-if="step === 3 && total === 3"
      />
      <img
        src="/images/pagination/step-2/1.png"
        alt="step-1"
        class="step-1"
        v-if="step === 1 && total === 2"
      />
      <img
        src="/images/pagination/step-2/2.png"
        alt="step-2"
        class="step-2"
        v-else-if="step === 2 && total === 2"
      />
    </div>
    <div class="pagination-stars">
      <img
        src="/images/pagination/star-active.png"
        alt="star-active"
        class="star"
        v-for="_i in step"
        :key="'star-active' + _i"
        @click="onClick(_i)"
      />
      <img
        src="/images/pagination/star.png"
        alt="star"
        class="star"
        v-for="_i in total - step"
        :key="'star-' + _i"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 62px;
  .step-1,
  .step-2,
  .step-3,
  .step-4 {
    width: 40px;
  }
  .pagination-stars {
    display: flex;
    gap: 35px;
    .star {
      width: 56px;
    }
  }
}
</style>
