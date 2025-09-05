<template>
  <div>
    <h2 class="text-h5 q-mt-xl">
      推薦餐點
    </h2>
    <q-virtual-scroll
      class="q-px-xs q-py-xs"
      :items="products"
      virtual-scroll-horizontal
    >
      <template v-slot="{ item, index }">
        <q-card
          :key="index"
          class="content-box relative-position"
          :class="{
            'q-mr-md': products.length -1 !== index,
            'q-mr-xs': products.length -1 === index
          }"
          @click="handleProductShopping({ productId: item._id, product: item })"
        >
          <q-card-section class="row">
            <div
              class="products-image q-mr-md"
              :style="{
                'background-image': `url('${item.imageUrl}')`
              }"
            >
            </div>
            <div class="col column">
              <div>
                <span>
                  {{ item.productName }}
                </span>
                <span v-if="item.stock === 0">
                  <img class="absolute-center" src="/statics/soldout.png" width="100" />
                </span>
                <span v-if="item.stock > 0 && item.stock <= item.safetyStock">
                  <img class="almost-soldout absolute-top-left" src="/statics/almost-soldout.png" width="80" />
                </span>
            </div>
              <q-space />
              <div>
                {{ item.kind.mainKind.kind.name }}
              </div>
              <q-space />
              <div class="row">
                <div>
                  $ {{ utils.numeral(item.price).format('0,0') }}
                </div>
                <q-space />
                <div class="text-secondary">
                  + 加入
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </template>
    </q-virtual-scroll>
    <product-shopping
      :productId="productShoppingSetting.id"
      :isOpen="productShoppingSetting.isOpenProductShopping"
      @close="productShoppingSetting.isOpenProductShopping = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.content-box {
  min-width: 14rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.products-image {
  width: 80px;
  height: 80px;
  // border: 1px solid #eee;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.almost-soldout {
  left: -10px;
}
</style>

<script>
import ProductShopping from './ProductShopping.vue'

export default {
  name: 'CartRecommend',
  components: {
    ProductShopping
  },
  data () {
    return {
      productShoppingSetting: {
        id: '',
        isOpenProductShopping: false
      },
      products: []
    }
  },
  methods: {
    addProductListener () {
      const {
        storeId
      } = this.$route.params
      this._dbProductListener = this.db.collection('updateProduct').doc(storeId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            this.fetch()
          }
        })
    },
    removeProductListener () {
      if (this._dbProductListener) {
        this._dbProductListener()
        this._dbProductListener = null
      }
    },
    async fetch () {
      const { storeId } = this.$route.params
      try {
        const res = await this.axiosInstance.get(`/v1/stores/${storeId}/products`)
        const {
          products
        } = res.data
        this.products = products
      } catch (error) {
        console.log(error)
      }
    },
    handleProductShopping ({ productId, product }) {
      if (product.stock === 0) {
        this.$q.notify({
          color: 'warning',
          icon: 'warning',
          message: `${product.productName}已售完`
        })
        return
      }
      this.productShoppingSetting.id = productId
      this.productShoppingSetting.isOpenProductShopping = true
    }
  },
  mounted () {
    this.fetch()
    this.addProductListener()
  },
  beforeDestroy () {
    this.removeProductListener()
  }
}
</script>
