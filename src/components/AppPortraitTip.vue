<template>
  <div class="app-portrait-tip page-vertical-padding page-padding fixed-full">
    <div class="row full-height justify-center items-center">
      <div class="text-center">
        <div>
          本系統不支援直立式畫面
        </div>
        <div>
          請轉為橫向
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-portrait-tip {
  z-index: 4000;
  background-color: #fff;
}
</style>

<script>
export default {
  name: 'AppPortraitTip'
}
</script>
