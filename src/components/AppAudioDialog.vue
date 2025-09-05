<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="volume_up" color="primary" text-color="white" />
          <span class="q-ml-sm">
            是否要開啟音效 ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup @click="handleClose" />
          <q-btn flat label="開啟音效" color="primary" v-close-popup @click="handleOpen" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppAudioDialog',
  data () {
    return {
      confirm: true
    }
  },
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
