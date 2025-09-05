<template>
  <q-dialog
    ref="dialog"
    full-width
    full-height
    @hide="handleClose"
  >
    <q-card>
      <q-card-section class="q-pt-none">
        <div
          class="container page-vertical-padding page-padding"
        >
          <cart-detail @close="handleClose"/>
          <!-- <cart-recommend /> -->
          <cart-info
            @input-payment-amount="inputPaymentAmount"
            @input-tax-id="inputTaxId"
          />
          <cart-actions
            :iCoin="iCoin"
            :paymentAmount="paymentAmount"
            :taxId="taxId"
            @close="handleClose"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
</style>

<script>
import CartDetail from './CartDetail'
// import CartRecommend from './CartRecommend'
import CartInfo from './CartInfo'
import CartActions from './CartActions'

export default {
  name: 'PageCart',
  props: {
    isOpen: {
      type: Boolean
    }
  },
  components: {
    CartDetail,
    // CartRecommend,
    CartInfo,
    CartActions
  },
  data () {
    return {
      iCoin: 0,
      paymentAmount: 0,
      taxId: ''
    }
  },
  watch: {
    isOpen (newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        this.$refs.dialog.show()
      }
      if (newValue === false) {
        this.$refs.dialog.hide()
      }
    },
    '$store.state.cart': {
      handler (val) {
        console.log('=====store.state.cart=val')
        console.log(val)
      },
      deep: true // cart 裡面如果是物件或陣列，記得加 deep
    }
  },
  methods: {
    updateICoin ({ iCoin }) {
      this.iCoin = iCoin
    },
    handleClose () {
      console.log('========close')
      this.$emit('close')
    },
    inputPaymentAmount ({ paymentAmount }) {
      if (isNaN(paymentAmount)) {
        this.paymentAmount = 0
        return
      }
      this.paymentAmount = parseInt(paymentAmount, 10)
    },
    inputTaxId ({ taxId }) {
      this.taxId = taxId
    }
  }
}
</script>
