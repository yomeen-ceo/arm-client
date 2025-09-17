<template>
  <div>
    <q-layout view="lHh lpr lff">
      <q-page-container>
        <router-view />
      </q-page-container>

      <app-loging />
    </q-layout>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  name: 'ShowLayout',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
