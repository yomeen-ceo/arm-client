<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-8 col-md-6">
      <div class="text-h5 text-center q-pa-md">
        <div v-if="ingredients">
          配料編輯 - {{ ingredients.ingredientsName }}
        </div>
        <div v-else>
          配料新增
        </div>
      </div>
      <div>
        <ingredients-setup-form :ingredients="ingredients" />
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsSetupForm from './IngredientsSetupForm'

export default {
  name: 'PageIngredientsSetup',
  props: {
  },
  components: {
    IngredientsSetupForm
  },
  data () {
    return {
      ingredients: this.$route.params.ingredients
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
