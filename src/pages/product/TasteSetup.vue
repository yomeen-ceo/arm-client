<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-8 col-md-6">
      <div class="text-h5 text-center q-pa-md">
        <div v-if="taste">
          口味編輯 - {{ taste.tasteName }}
        </div>
        <div v-else>
          口味新增
        </div>
      </div>
      <div>
        <taste-setup-form :taste="taste" />
      </div>
    </div>
  </div>
</template>

<script>
import TasteSetupForm from './TasteSetupForm'

export default {
  name: 'PageTasteSetup',
  props: {
  },
  components: {
    TasteSetupForm
  },
  data () {
    return {
      taste: this.$route.params.taste
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
