<template>
  <q-page class="page">
    <div class="box">
      <div class="a">
        <ul class="kind-menu flex">
          <li
            v-for="kindMenu in kindMenus"
            :key="kindMenu.kind"
            class="item"
            @click="activeKind = kindMenu"
          >
            <div>
              {{ kindMenu.kind }}
            </div>
          </li>
        </ul>
      </div>
      <div class="b col">
        <div v-if="activeKind">
          <ul class="product" :key="activeKind.kind">
            <li
              class="product-item"
              v-for="product in activeKind.products"
              :key="product._id"
              @click="handleProductShopping({ productId: product._id, product })"
            >
              <div>
                {{ product.productName }}
              </div>
              <div>
                $ {{ product.price }}
              </div>
              <!-- <div class="flex">
                <span v-if="product.stock === 0">
                  <q-badge transparent align="middle" color="red">
                    已售完
                  </q-badge>
                </span>
                <span v-if="product.stock < product.safetyStock && product.stock !== 0">
                  <q-badge transparent align="middle" color="orange">
                    即將售完
                  </q-badge>
                </span>
                <q-space />
                <span>
                  {{ product.stock }}/{{ product.safetyStock }}
                </span>
              </div> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="isOpenProductShopping"
      ref="dialog"
      persistent
      maximized
    >
      <product-shopping
        :product="product"
        @close="isOpenProductShopping = false"
      />
    </q-dialog>
    <footer-bar
      v-if="$store.state.cart.items.length !== 0"
    />
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  font-size: 22px;
}
.box {
  display: flex;
  height: calc(100vh - 50px);
}
.a {
  padding: 10px;
  width: 240px;
  overflow: scroll;
}
.b {
  padding: 10px;
  border-left: 2px solid #aaa;
}
.kind-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 38px;
  .item {
    display: inline-block;
    margin-bottom: 5px;
    padding: 6px 0;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    color: #0c0101;
    cursor: pointer;
    &:nth-child(2n+1) {
      margin-right: 4%;
    }
    > div {
      &:first-child {
        padding-bottom: 6px;
      }
      &:last-child {
        padding-top: 6px;
      }
    }
    .main-kind-name {
      padding: 0 6px;
      border-bottom: 1px solid #888;
    }
  }
}
.product {
  margin: 0;
  padding: 0;
  list-style: none;
  .product-item {
    display: inline-block;
    vertical-align: top;
    width: 270px;   /* 調大一點 */
    height: 180px;  /* 如果需要固定高度，可以加 */
    font-size: 40px; /* 內容字體加大 */
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
    border-radius: 5px;
    cursor: pointer;
    text-align: right;
    &:hover {
      box-shadow: 2px 3px 5px rgba(0, 0, 0, .5);
    }
  }
}
</style>

<script>
import ProductShopping from './ProductShopping.vue'
import FooterBar from './FooterBar.vue'

export default {
  name: 'PageOrderHome',
  components: {
    ProductShopping,
    FooterBar
  },
  watch: {
    // 改成 function，回傳要監聽的東西
    '$store.state.cart': {
      handler (val) {
        console.log('======val')
        console.log(val)
      },
      deep: true // cart 裡面如果是物件或陣列，記得加 deep
    }
  },
  data () {
    return {
      isOpenProductShopping: false,
      kindMenus: [],
      activeKind: null,
      product: null
    }
  },
  methods: {
    async fetch () {
      try {
        // 取得產品列表
        // const res = await this.axiosInstance.get('http://192.168.18.112:5000/v1/products/list')
        const res = await this.axiosInstance.get('/v1/products/list')
        const products = res.data.products
        // 製作分類列表，將相同分類的產品塞進同一個分類
        const kinds = Object.values(
          products.reduce((acc, item) => {
            if (!acc[item.kind]) {
              acc[item.kind] = { kind: item.kind, products: [] }
            }
            acc[item.kind].products.push(item)
            return acc
          }, {})
        )
        this.kindMenus = kinds
        console.log('=========kinds')
        console.log(kinds)
        this.activeKind = this.kindMenus[0]
      } catch (error) {
        console.log(error)
      }
    },
    handleProductShopping ({ productId, product }) {
      console.log('========productId, product')
      console.log(productId, product)
      this.product = product
      this.isOpenProductShopping = true
    }
  },
  async mounted () {
    await this.fetch()
  }
}
</script>
