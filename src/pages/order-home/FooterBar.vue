<template>
  <div>
    <div
      class="bar page-padding row q-col-gutter-x-md items-center cursor-pointer"
      @click="handleClick"
    >
      <div class="col-3">
        <q-icon size="xs" name="shopping_cart" class="cursor-pointer" />
        {{ amount }}
      </div>
      <div class="col-6 text-center">
        查看購物車
      </div>
      <div class="col-3 text-right">
        $ {{ total }}
      </div>
    </div>
    <cart
      :isOpen="isOpenCart"
      @close="isOpenCart = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $secondary;
  color: #fff;
  font-size: 16px;
  height: 50px;
  z-index: 2900;
}
</style>

<script>
// import _ from 'lodash'

import Cart from './Cart.vue'

export default {
  name: 'FooterBar',
  components: {
    Cart
  },
  watch: {
    isOpenCart (val) {
      console.log('=========isOpenCart=val')
      console.log(val)
    }
  },
  data () {
    return {
      isOpenCart: false
    }
  },
  computed: {
    amount () {
      const items = this.$store.state.cart.items
      return items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount
      }, 0)
    },
    total () {
      const items = this.$store.state.cart.items
      const total = items.reduce((accumulator, currentValue) => {
        const {
          product,
          // selectTaste,
          // selectIngredients,
          amount
        } = currentValue
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
        return accumulator + result * amount
      }, 0)
      return total
    }
  },
  methods: {
    handleClick () {
      this.isOpenCart = true
    }
  }
}
</script>
