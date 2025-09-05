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
        :disable="total === 0 || paymentAmount < totalResult"
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
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { Loading } from 'quasar'
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
      isMobilePayRunning: false
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
      const {
        storeId
      } = this.$route.params
      this.$q.dialog({
        title: '結帳確認',
        html: true,
        message: `
          <div>
            <div>
              總金額: ${this.totalResult}
            </div>
            <div>
              付款金額: ${this.paymentAmount}
            </div>
            <div>
              找零: ${this.paymentAmount - this.totalResult}
            </div>
          </div>
        `,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const items = this.$store.state.cart.items.map(item => {
          return {
            product: item.product._id,
            selectTaste: item.selectTaste,
            selectTwoTaste: item.selectTwoTaste,
            selectIngredients: item.selectIngredients,
            remark: item.remark,
            amount: item.amount
          }
        })
        const body = {
          items,
          paymentAmount: this.paymentAmount
        }
        if (this.taxId) {
          body.taxId = this.taxId
        }
        try {
          await this.axiosInstance.post(
            `/v1/stores/${storeId}/orders/createByStore`,
            body
          )
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: '操作失敗!'
          })
          console.log(error)
          return
        }
        this.$store.dispatch('cart/clearItem', {
          storeId
        })
        this.$emit('close')
        this.$q.notify({
          color: 'positive',
          message: '點餐已完成'
        })
      })
    },
    async handleMobilePay () {
      if (this.isMobilePayRunning === true) {
        return
      }
      const {
        storeId,
        tableId
      } = this.$route.params
      const items = this.$store.state.cart.items.map(item => {
        return {
          product: item.product._id,
          selectTaste: item.selectTaste,
          selectTwoTaste: item.selectTwoTaste,
          selectIngredients: item.selectIngredients,
          remark: item.remark,
          amount: item.amount
        }
      })
      this.isMobilePayRunning = true
      const body = {
        storeId,
        tableId,
        items,
        iCoin: this.iCoin
      }
      // 如果沒登入
      if (!this.$store.state.user.isLoggedIn) {
        this.$store.dispatch('local/initLocalUid', {
          storeId
        })
        body.localUid = this.$store.state.local.localUid
      }
      const res = await this.axiosInstance.post('/v1/mypay/createOrder', body)
      const { url, orderId, creationTime } = res.data
      if (!url) {
        this.isMobilePayRunning = false
        console.log('not found url')
        return
      }
      if (!this.$store.state.user.isLoggedIn) {
        this.$store.dispatch('localOrders/addItem', {
          storeId,
          tableId,
          orderId,
          creationTime
        })
      }
      this.utils.setTransaction({
        storeId,
        tableId,
        url,
        orderId,
        i18nLocale: this.i18n.locale
      })
      // 清除購物車的 items
      this.$store.dispatch('cart/clearItem', {
        storeId,
        tableId
      })
      location.href = url
    },
    async handleAllICoinPay () {
      // 如果沒登入
      if (!this.$store.state.user.isLoggedIn) {
        return
      }
      if (!this.isAllIcoin) {
        return
      }
      Loading.show()
      const { uid } = this.$store.state.user.detail
      const {
        storeId,
        tableId
      } = this.$route.params
      const items = this.$store.state.cart.items.map(item => {
        return {
          product: item.product._id,
          selectTaste: item.selectTaste,
          selectTwoTaste: item.selectTwoTaste,
          selectIngredients: item.selectIngredients,
          remark: item.remark,
          amount: item.amount
        }
      })
      const body = {
        items,
        iCoin: this.iCoin
      }
      try {
        const res = await this.axiosInstance.post(
          `/v1/stores/${storeId}/tables/${tableId}/users/${uid}/orders/allPayUseICoin`,
          body
        )
        this.$router.push({
          name: this.buildI18nRouteName({ name: 'order-detail' }),
          params: {
            orderId: res.data.order._id
          }
        })
        this.$store.dispatch('cart/clearItem', {
          storeId,
          tableId
        })
        setTimeout(() => {
          Loading.hide()
          this.$q.notify({
            color: 'positive',
            message: '訂單已完成結帳。'
          })
        }, 1500)
      } catch (error) {
        Loading.hide()
        console.log(error)
      }
    }
  },
  mounted () {
    this.$q.localStorage.set('cartICoin', '0')
  }
}
</script>
