<template>
  <div class="q-gutter-sm text-right q-mt-xl">
    <q-btn
      class="text-weight-regular"
      color="grey-3"
      text-color="grey-9"
      label="繼續選購"
      @click="$emit('close')"
    />
    <!-- <span
      v-if="this.totalResult !== 0 && isAllIcoin"
      class="d-inline-block vertical-bottom relative-position"
    >
      <q-btn
        class="text-weight-regular"
        color="grey-3"
        text-color="grey-9"
        label="全額用 iCoin 支付"
        @click="handleAllICoinPay"
        :disable="total === 0"
      />
      <div
        v-if="total === 0"
        class="absolute-full cursor-not-allowed"
        @click="handleTotalZero"
      >
      </div>
    </span> -->
    <span class="d-inline-block vertical-bottom relative-position">
      <q-btn
        class="text-weight-regular"
        color="grey-3"
        text-color="grey-9"
        label="現金結帳"
        @click="handleToCashPay"
        :disable="total === 0 || paymentAmount < totalResult || paymentAmount === '' || paymentAmount === null || isNaN(paymentAmount)"
      />
      <div
        v-if="total === 0"
        class="absolute-full cursor-not-allowed"
        @click="handleTotalZero"
      >
      </div>
    </span>
    <!-- <span class="d-inline-block vertical-bottom relative-position">
      <q-btn
        color="secondary"
        label="行動支付"
        @click="handleMobilePay"
        :disable="isMobilePayRunning || total === 0 || isAllIcoin"
      />
      <div
        v-if="total === 0"
        class="absolute-full cursor-not-allowed"
        @click="handleTotalZero"
      >
      </div>
    </span> -->
    <q-dialog v-model="isOpen" persistent>
      <q-card style="min-width: 800px">
        <!-- 標題 -->
        <q-card-section class="text-center bg-grey-2">
          <div class="text-h2 text-bold">結帳確認</div>
        </q-card-section>

        <!-- 明細 -->
        <q-card-section>
          <div class="text-h3 q-mb-sm">總金額: {{ totalResult }}</div>
          <div class="text-h3 q-mb-sm">付款金額: {{ paymentAmount }}</div>
          <div class="text-h3">找零: {{ paymentAmount - totalResult }}</div>
        </q-card-section>

        <!-- 底部兩顆大按鈕 -->
        <q-card-actions class="q-pa-md row no-wrap">
          <q-btn
            label="取消"
            color="negative"
            class="col-6 text-h4"
            unelevated
            @click="isOpen = false"
          />
          <q-btn
            label="送出"
            color="primary"
            class="col-6 text-h4"
            unelevated
            @click="handleSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.my-checkout-dialog .q-dialog__title {
  font-size: 24px;
  font-weight: bold;
}
.my-checkout-dialog .q-dialog__actions .q-btn {
  flex: 1; /* 平分 */
  font-size: 18px; /* 放大字體 */
  padding: 16px 0; /* 增高 */
  margin: 0 4px; /* 中間留一點間距 */
}
</style>

<script>
// import { Loading } from 'quasar'
// import _ from 'lodash'

export default {
  name: 'CartActions',
  props: {
    iCoin: {
      type: Number
    },
    paymentAmount: {
      type: Number
    },
    taxId: {
      type: String
    }
  },
  data () {
    return {
      isMobilePayRunning: false,
      isOpen: false
    }
  },
  watch: {
  },
  computed: {
    isAllIcoin () {
      return this.iCoin === this.totalResult
    },
    total () {
      const items = this.$store.state.cart.items
      const total = items.reduce((accumulator, currentValue) => {
        const {
          product,
          amount
        } = currentValue
        const result = +product.price
        return accumulator + result * amount
      }, 0)
      return total
    },
    // serviceCharge () {
    //   if (!this.$store.state.stores.store) {
    //     return 0
    //   }
    //   return Math.round(this.total * this.$store.state.stores.store.serviceCharge / 100)
    // },
    totalResult () {
      return this.total
    }
  },
  methods: {
    handleTotalZero () {
      this.$q.notify({
        color: 'warning',
        icon: 'check_circle',
        message: '金額為 0，無法結帳。'
      })
    },
    handleToCashPay () {
      this.isOpen = true
    },
    async handleSubmit () {
      console.log('okokok')
      console.log('======this.$store.state.cart')
      console.log(this.$store.state.cart)
      const items = this.$store.state.cart.items
      const newItems = []
      for (let i = 0, length = items.length; i < length; i = i + 1) {
        const product = items[i].product
        const ingredients = product.ingredients
        const selectIngredients = items[i].selectIngredients
        const taste = product.taste
        const selectTaste = items[i].selectTaste
        const SI = ingredients.filter(item => selectIngredients.includes(item.value))
        const ST = taste.find(item => item.value === selectTaste)
        newItems.push({
          amount: items[i].amount,
          product: items[i].product,
          ingredients: SI,
          taste: ST
        })
      }
      const totalResult = this.totalResult
      const paymentAmount = this.paymentAmount
      const order = {
        newItems,
        totalResult,
        paymentAmount
      }
      try {
        // const res = await this.axiosInstance.post('http://192.168.18.112:5000/v1/orders/create', {
        //   order
        // })
        const res = await this.axiosInstance.post('/v1/orders/create', {
          order
        })
        const orderData = res.data
        console.log('======orderData')
        console.log(orderData)
        this.$store.dispatch('cart/clearItem')
        this.$emit('close')
        this.$q.notify({
          color: 'positive',
          message: '點餐已完成'
        })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: '操作失敗!'
        })
        console.log(error)
      }
    }
    // handleToCashPay () {
    //   this.$q.dialog({
    //     class: 'my-checkout-dialog',
    //     title: '<span style="font-size: 24px; font-weight: bold;">結帳確認</span>',
    //     html: true,
    //     message: `
    //       <h4>
    //         <div>
    //           總金額: ${this.totalResult}
    //         </div>
    //         <div>
    //           付款金額: ${this.paymentAmount}
    //         </div>
    //         <div>
    //           找零: ${this.paymentAmount - this.totalResult}
    //         </div>
    //       </h4>
    //     `,
    //     cancel: {
    //       label: '取消',
    //       color: 'negative',
    //       unelevated: true,
    //       class: 'full-width q-pa-md text-h4'
    //     },
    //     ok: {
    //       label: '送出',
    //       color: 'positive',
    //       unelevated: true,
    //       class: 'full-width q-pa-md text-h4'
    //     },
    //     actionsClass: 'row no-wrap',
    //     persistent: true
    //   }).onOk(async () => {
    //     const items = this.$store.state.cart.items.map(item => {
    //       return {
    //         product: item.product._id,
    //         selectTaste: item.selectTaste,
    //         selectTwoTaste: item.selectTwoTaste,
    //         selectIngredients: item.selectIngredients,
    //         remark: item.remark,
    //         amount: item.amount
    //       }
    //     })
    //     const body = {
    //       items,
    //       paymentAmount: this.paymentAmount
    //     }
    //     if (this.taxId) {
    //       body.taxId = this.taxId
    //     }
    //     try {
    //       await this.axiosInstance.post(
    //         `/v1/stores/${storeId}/orders/createByStore`,
    //         body
    //       )
    //     } catch (error) {
    //       this.$q.notify({
    //         color: 'negative',
    //         icon: 'warning',
    //         message: '操作失敗!'
    //       })
    //       console.log(error)
    //       return
    //     }
    //     this.$store.dispatch('cart/clearItem', {
    //       storeId
    //     })
    //     this.$emit('close')
    //     this.$q.notify({
    //       color: 'positive',
    //       message: '點餐已完成'
    //     })
    //   })
    // },
    // async handleMobilePay () {
    //   if (this.isMobilePayRunning === true) {
    //     return
    //   }
    //   const {
    //     storeId,
    //     tableId
    //   } = this.$route.params
    //   const items = this.$store.state.cart.items.map(item => {
    //     return {
    //       product: item.product._id,
    //       selectTaste: item.selectTaste,
    //       selectIngredients: item.selectIngredients,
    //       amount: item.amount
    //     }
    //   })
    //   this.isMobilePayRunning = true
    //   const body = {
    //     storeId,
    //     tableId,
    //     items,
    //     iCoin: this.iCoin
    //   }
    //   // 如果沒登入
    //   if (!this.$store.state.user.isLoggedIn) {
    //     this.$store.dispatch('local/initLocalUid', {
    //       storeId
    //     })
    //     body.localUid = this.$store.state.local.localUid
    //   }
    //   const res = await this.axiosInstance.post('http://192.168.18.112:5000/v1/mypay/createOrder', body)
    //   const { url, orderId, creationTime } = res.data
    //   if (!url) {
    //     this.isMobilePayRunning = false
    //     console.log('not found url')
    //     return
    //   }
    //   if (!this.$store.state.user.isLoggedIn) {
    //     this.$store.dispatch('localOrders/addItem', {
    //       storeId,
    //       tableId,
    //       orderId,
    //       creationTime
    //     })
    //   }
    //   this.utils.setTransaction({
    //     storeId,
    //     tableId,
    //     url,
    //     orderId,
    //     i18nLocale: this.i18n.locale
    //   })
    //   // 清除購物車的 items
    //   this.$store.dispatch('cart/clearItem', {
    //     storeId,
    //     tableId
    //   })
    //   location.href = url
    // },
    // async handleAllICoinPay () {
    //   // 如果沒登入
    //   if (!this.$store.state.user.isLoggedIn) {
    //     return
    //   }
    //   if (!this.isAllIcoin) {
    //     return
    //   }
    //   Loading.show()
    //   const { uid } = this.$store.state.user.detail
    //   const {
    //     storeId,
    //     tableId
    //   } = this.$route.params
    //   const items = this.$store.state.cart.items.map(item => {
    //     return {
    //       product: item.product._id,
    //       selectTaste: item.selectTaste,
    //       selectTwoTaste: item.selectTwoTaste,
    //       selectIngredients: item.selectIngredients,
    //       remark: item.remark,
    //       amount: item.amount
    //     }
    //   })
    //   const body = {
    //     items,
    //     iCoin: this.iCoin
    //   }
    //   try {
    //     const res = await this.axiosInstance.post(
    //       `/v1/stores/${storeId}/tables/${tableId}/users/${uid}/orders/allPayUseICoin`,
    //       body
    //     )
    //     this.$router.push({
    //       name: this.buildI18nRouteName({ name: 'order-detail' }),
    //       params: {
    //         orderId: res.data.order._id
    //       }
    //     })
    //     this.$store.dispatch('cart/clearItem', {
    //       storeId,
    //       tableId
    //     })
    //     setTimeout(() => {
    //       Loading.hide()
    //       this.$q.notify({
    //         color: 'positive',
    //         message: '訂單已完成結帳。'
    //       })
    //     }, 1500)
    //   } catch (error) {
    //     Loading.hide()
    //     console.log(error)
    //   }
    // }
  },
  mounted () {
    this.$q.localStorage.set('cartICoin', '0')
  }
}
</script>
