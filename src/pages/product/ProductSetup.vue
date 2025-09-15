<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-8 col-md-6">
      <div class="text-h5 text-center q-pa-md">
        <div v-if="product">
          產品編輯 - {{ product.productName }}
        </div>
        <div v-else>
          產品新增
        </div>
      </div>
      <div>
        <product-setup-form :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductSetupForm from './ProductSetupForm'

export default {
  name: 'PageProductSetup',
  props: {
  },
  components: {
    ProductSetupForm
  },
  data () {
    return {
      product: null
    }
  },
  watch: {
  },
  methods: {
    async fetch () {
      const { productId } = this.$route.params
      console.log('=======productId')
      console.log(productId)
      const res = await this.axiosInstance.get(`/v1/products/detail/${productId}`)
      const { product } = res.data
      console.log('========123====product')
      console.log(product)
      this.product = product
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
