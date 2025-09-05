<template>
  <div class="q-pa-md q-gutter-sm">
    <q-icon
      v-if="!$store.state.stores.isAudioMuted"
      class="cursor-pointer"
      name="volume_up"
      size="md"
      @click="handleClose"
    />
    <q-icon
      v-if="$store.state.stores.isAudioMuted"
      class="cursor-pointer"
      name="volume_off"
      size="md"
      @click="handleOpen"
    />
  </div>
</template>

<script>
export default {
  name: 'AppAudioSetting',
  methods: {
    handleClose () {
      this.$store.dispatch('stores/setAudioMuted', {
        isMuted: true
      })
    },
    handleOpen () {
      this.$store.dispatch('stores/setAudioMuted', {
        isMuted: false
      })
    }
  }
}
</script>
