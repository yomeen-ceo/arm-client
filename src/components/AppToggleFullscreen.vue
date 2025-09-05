<template>
  <div class="d-inline-block">
    <q-icon
      size="lg"
      :name="iconName"
      class="cursor-pointer"
      @click="toggle"
    />
  </div>
</template>

<script>
export default {
  name: 'AppToggleFullscreen',
  data () {
    return {
      isFullscreen: false
    }
  },
  computed: {
    iconName () {
      return this.isFullscreen ? 'fullscreen_exit' : 'fullscreen'
    }
  },
  methods: {
    async toggle () {
      this.isFullscreen = !this.isFullscreen
      if (this.isFullscreen) {
        await this.$q.fullscreen.request()
      }
      if (!this.isFullscreen) {
        await this.$q.fullscreen.exit()
      }
    }
  }
}
</script>
