<script setup lang="ts"></script>

<template>
  <div class="page-footer">
    <div class="preview-wrapper">
      <img
        src="/images/page-footer/preview-cn.png"
        alt="形象预览"
        class="preview-cn"
      />
    </div>
    <img
      src="/images/page-footer/footer-right-logo.png"
      alt="Footer right logo"
      class="footer-right-logo"
    />
  </div>
</template>

<style lang="less" scoped>
.page-footer {
  position: absolute;
  left: 0;
  bottom: 102px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .preview-wrapper {
    position: relative;
    width: 257px;
    height: 257px;
    background-image: url("/images/page-footer/preview-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: 90px;
    margin-bottom: 10px;
    .preview-cn {
      width: 140px;
      position: absolute;
      top: 65px;
      left: 59px;
    }
  }
  .footer-right-logo {
    width: 204px;
    height: 204px;
    margin-right: 114px;
  }
}
</style>
