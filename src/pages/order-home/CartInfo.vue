<template>
  <q-card class="cart-info q-mx-xs q-mt-xl">
    <q-card-section>
      <div class="flex q-mb-sm">
        <div>
          小計
        </div>
        <q-space />
        <div>
          $ {{ this.total }}
        </div>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="flex q-mb-sm">
        <div>
          總金額
        </div>
        <q-space />
        <div>
          $ {{ this.total }}
        </div>
      </div>
      <div
        class="items-center q-mb-sm"
        :class="{
          column: $q.screen.lt.sm,
          row: $q.screen.gt.xs
        }"
      >
        <label
          for="paymentAmount"
          class="link-text q-mr-md"
          :class="{
            'q-mb-sm': $q.screen.lt.sm
          }"
        >
          付款金額
        </label>
        <q-space />
        <input
          id="paymentAmount"
          ref="paymentInput"
          class="text-input"
          type="number"
          v-model.number="paymentAmount"
          @input="$emit('input-payment-amount', { paymentAmount })"
          @keyup.enter="submit"
        />
      </div>
      <div
        v-if="$store.state.stores.store"
        class="flex q-mb-sm"
      >
        <div>
          找零
        </div>
        <q-space />
        <div>
          <span v-if="makeChangeAmount === null" class="text-negative">
            金額不足
          </span>
          <span v-if="makeChangeAmount !== null">
            {{ makeChangeAmount }}
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.cart-info {
  font-size: 1.2rem;
}
.link-text {
  text-decoration: underline;
  color: $negative;
}
.text-input {
  padding: 3px 10px;
  outline: none;
  border: 1px solid #ddd;
}
</style>

<script>
// import _ from 'lodash'

export default {
  name: 'CartInfo',
  data () {
    return {
      iCoin: 0,
      paymentAmount: null,
      taxId: ''
    }
  },
  watch: {
    totalResult (newValue) {
      // 輸入的 iCoin 不能超過總金額
      console.log('============totalResult newValue')
      console.log(newValue)
    }
  },
  computed: {
    total () {
      const items = this.$store.state.cart.items
      const total = items.reduce((accumulator, currentValue) => {
        const {
          product,
          selectTaste,
          selectIngredients,
          amount
        } = currentValue
        console.log('======product,selectTaste,selectIngredients')
        console.log(product, selectTaste, selectIngredients)
        const result = +product.price
        // if (product.taste.length !== 0) {
        //   const findIndex = _.findIndex(product.taste, item => {
        //     return item.value === selectTaste
        //   })
        //   console.log('========findIndex')
        //   console.log(findIndex)
        //   result += +product.taste[findIndex].price
        //   console.log('=====result')
        //   console.log(result)
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
      return Math.round(total)
    },
    serviceCharge () {
      if (!this.$store.state.stores.store) {
        return 0
      }
      return Math.round(this.total * this.$store.state.stores.store.serviceCharge / 100)
    },
    totalResult () {
      return this.total
    },
    makeChangeAmount () {
      const { totalResult, paymentAmount } = this
      if (paymentAmount === null) {
        return null
      }
      if ((paymentAmount - totalResult) < 0) {
        return null
      }
      return Math.round(paymentAmount - totalResult)
    }
  },
  methods: {
    isFloat ({ number }) {
      return number.toString().indexOf('.') !== -1
    },
    submit () {
      // 驗證 paymentAmount
      if (
        this.paymentAmount === '' ||
        this.paymentAmount === null ||
        isNaN(this.paymentAmount) ||
        Number(this.paymentAmount) === 0
      ) {
        this.$q.notify({
          type: 'negative',
          message: '請輸入有效的付款金額'
        })
        return
      }
      console.log('送出囉 ✅')
      // 這裡可以接你原本的送出流程
    }
  },
  mounted () {
    // 畫面一出現就 focus
    this.$nextTick(() => {
      this.$refs.paymentInput.focus()
    })
  }
}
</script>
