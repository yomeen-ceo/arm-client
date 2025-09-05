<template>
  <div>
    <div>
      <h2 class="text-h5 q-mt-md">
        餐點明細
      </h2>
      <q-card
        class="q-mx-xs"
        v-if="$store.state.cart.items.length === 0"
      >
        <q-card-section>
          你尚未放入任何產品到購物車中。現在開始訂購你最喜歡的餐廳美食吧！
        </q-card-section>
      </q-card>
      <q-card
        class="q-mx-xs"
        v-if="$store.state.cart.items.length !== 0"
      >
        <q-list bordered separator>
          <q-item
            clickable
            v-for="(computedCartItem, computedCartItemIndex) in computedCartItems"
            :key="`computedCartItem-${computedCartItemIndex}`"
            @click="handleOpenCartItem({ item: computedCartItem })"
          >
            <q-item-section class="col-auto">
              <q-item-label class="cart-item">
                <div class="flex items-center q-mr-md">
                  <q-icon
                    class="cursor-pointer"
                    name="remove_circle_outline"
                    @click.stop="handleAmountSubtraction({ item: computedCartItem.srcItem })"
                  />
                  <span
                    class="amount-text d-inline-block"
                    :class="{
                      'amount-text-1': computedAmountStringLength === 1,
                      'amount-text-2': computedAmountStringLength === 2,
                      'amount-text-3': computedAmountStringLength >= 3
                    }"
                    @click.stop
                  >
                    {{ computedCartItem.amount }}
                  </span>
                  <q-icon
                    class="cursor-pointer"
                    name="add_circle_outline"
                    @click.stop="handleAmountAddition({ item: computedCartItem.srcItem })"
                  />
                </div>
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="cart-item" lines="1">
                {{ computedCartItem.name }}
              </q-item-label>
              <q-item-label
                v-if="computedCartItem.infos.length !== 0"
                class="q-gutter-x-sm"
                caption
                lines="1"
              >
                <q-badge
                  outline
                  v-for="(info, infoIndex) in computedCartItem.infos"
                  :key="`computedCartItem-${computedCartItemIndex}-infos-${infoIndex}`"
                  :label="info.label"
                  :color="info.color"
                />
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label  class="cart-item flex items-center">
                <div>
                  $ {{ computedCartItem.total }}
                </div>
                <q-icon
                  size="md"
                  name="delete_forever"
                  color="negative"
                  @click.stop="handleDeleteCartItem({ item: computedCartItem.srcItem })"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
    <product-shopping
      class="product-shopping-fixed"
      :productId="productShoppingSetting.id"
      :isOpen="productShoppingSetting.isOpenProductShopping"
      :srcItem="productShoppingSetting.srcItem"
      @close="handleCloseProductShopping"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-shopping-fixed {
  position: fixed;
  top: 5%;
  right: 10%;
  z-index: 9999; /* 保證在最上層 */
}
.cart-item {
  font-size: 1.2rem;
}
.amount-text {
  text-align: center;
  cursor: auto;
}
.amount-text-1 {
  width: 1.3rem;
}
.amount-text-2 {
  width: 2rem;
}
.amount-text-3 {
  width: 2.5rem;
}
</style>

<script>
// import _ from 'lodash'

import ProductShopping from './ProductShopping.vue'

export default {
  name: 'PageCart',
  components: {
    ProductShopping
  },
  data () {
    return {
      productShoppingSetting: {
        id: '',
        isOpenProductShopping: false,
        srcItem: null
      }
    }
  },
  computed: {
    computedCartItems () {
      const { items } = this.$store.state.cart
      console.log('========items')
      console.log(items)
      const computedCartItems = [...items].map((item) => {
        const amount = item.amount
        const total = this.getCartItem(item)
        const infos = this.getCartItemInfos(item)
        return {
          product: item.product,
          srcItem: item,
          name: item.product.productName,
          amount,
          total,
          infos
        }
      })
      console.log('=========computedCartItems')
      console.log(computedCartItems)
      return computedCartItems
    },
    // 回傳 amount 最大長度
    computedAmountStringLength () {
      const { items } = this.$store.state.cart
      let maxLength = 0
      for (let i = 0, length = items.length; i < length; i = i + 1) {
        const length = items[i].amount.toString().length
        if (length > maxLength) {
          maxLength = length
        }
      }
      return maxLength
    }
  },
  watch: {
    '$store.state.cart': {
      handler (val) {
        console.log('=====store.state.cart=val')
        console.log(val)
      },
      deep: true // cart 裡面如果是物件或陣列，記得加 deep
    }
  },
  methods: {
    handleCloseProductShopping () {
      this.productShoppingSetting.id = ''
      this.productShoppingSetting.isOpenProductShopping = false
      this.productShoppingSetting.srcItem = null
      this.$emit('close')
    },
    handleProductShopping ({ productId, srcItem }) {
      this.productShoppingSetting.id = productId
      this.productShoppingSetting.isOpenProductShopping = true
      this.productShoppingSetting.srcItem = srcItem
    },
    getCartItem (item) {
      const {
        product,
        amount
      } = item
      const result = +product.price
      // if (product.taste.length !== 0) {
      //   const findIndex = _.findIndex(product.taste, item => {
      //     return item.value === selectTaste
      //   })
      //   result += +product.taste[findIndex].price
      // }
      // if (product.ingredients.length !== 0) {
      //   for (let i = 0, length = selectIngredients.length; i < length; i = i + 1) {
      //     const selectIngredient = selectIngredients[i]
      //     const findIndex = _.findIndex(product.ingredients, item => {
      //       return item.value === selectIngredient
      //     })
      //     result += +product.ingredients[findIndex].price
      //   }
      // }
      return result * amount
    },
    getCartItemInfos (item) {
      const {
        product,
        selectTaste,
        selectIngredients,
        remark
      } = item
      const infos = []
      const {
        taste,
        ingredients
      } = product
      if (selectTaste) {
        const findItem = taste.find(item => {
          return selectTaste === item.value
        })
        if (findItem) {
          infos.push({
            label: findItem.oneTasteName,
            color: 'secondary-darken-10'
          })
        }
      }
      for (let i = 0, length = selectIngredients.length; i < length; i = i + 1) {
        const selectIngredient = selectIngredients[i]
        const findItem = ingredients.find(ingredient => {
          return selectIngredient === ingredient.value
        })
        if (findItem) {
          infos.push({
            label: findItem.ingredientName,
            color: 'secondary-darken-20'
          })
        }
      }
      if (remark) {
        infos.push({
          label: `備註: ${remark}`,
          color: 'secondary-darken-30'
        })
      }
      return infos
    },
    handleOpenCartItem ({ item }) {
      this.handleProductShopping({
        productId: item.product._id,
        srcItem: item.srcItem
      })
    },
    handleAmountSubtraction ({ item }) {
      const {
        storeId,
        tableId
      } = this.$route.params
      this.$store.dispatch('cart/subtractionItemAmount', {
        storeId,
        tableId,
        item
      })
    },
    handleAmountAddition ({ item }) {
      const {
        storeId,
        tableId
      } = this.$route.params
      const {
        amount
      } = item
      const {
        productName,
        stock
      } = item.product
      if (amount === stock) {
        this.$q.notify({
          color: 'warning',
          icon: 'warning',
          message: `${productName}, 庫存剩 ${stock}`
        })
        return
      }
      this.$store.dispatch('cart/additionItemAmount', {
        storeId,
        tableId,
        item
      })
    },
    handleDeleteCartItem ({ item }) {
      const {
        storeId,
        tableId
      } = this.$route.params
      this.$store.dispatch('cart/deleteCartItem', {
        storeId,
        tableId,
        item
      })
    }
  }
}
</script>
