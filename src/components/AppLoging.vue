<template>
  <div v-if="$store.state.user.isLoging" class="loading-box row justify-center items-center">
    <div class="text-h4 bg-white q-px-md q-py-md radius-1">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .4);
  z-index: 9999;
}
</style>

<script>
// https://quasar.dev/quasar-plugins/web-storage#LocalStorage-API
import { LocalStorage } from 'quasar'

export default {
  name: 'AppLoging',
  mounted () {
    const isLoging = LocalStorage.getItem('isLoging')
    if (isLoging) {
      this.$store.dispatch('user/startLoging')
    }
  }
}
</script>
