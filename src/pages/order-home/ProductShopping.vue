<template>
  <q-card class="relative-position">
    <q-bar class="bar absolute-top">
      <q-btn
        round
        color="black"
        class="bg-white"
        size="md"
        flat
        icon="close"
        @click="handleClose"
      >
        <q-tooltip>Close</q-tooltip>
      </q-btn>
      <q-space />
    </q-bar>
    <div v-if="product">
      <q-card
        class="bg-white q-mt-xl"
        square
      >
        <q-card-section>
          <div class="text-h3 row">
            <div>
              <span>
                {{ product.productName }}
              </span>
            </div>
            <q-space />
            <div class="q-mr-md">
              $ {{ numeral(product.price) }}
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="product.taste.length !== 0">
          <div class="text-h4 row">
            <div>
              口味 ( <span class="text-negative">*</span> 必填)
            </div>
          </div>
          <div class="text-subtitle2">
            請選一項
          </div>
          <ul class="list-unstyled">
            <li
              v-for="(taste) in tasteOptions"
              :key="`tasteOptions-${taste.value}`"
              class="content-item radius-1 q-py-xs flex items-center"
              @click="selectTaste = taste.value"
            >
              <div>
                <q-radio
                  color="grey-9"
                  keep-color
                  v-model="selectTaste"
                  :val="taste.value"
                  :label="taste.label"
                  :style="{ fontSize: '2rem' }"
                />
              </div>
              <!-- <q-space />
              <div class="q-mr-md">
                $ {{ numeral(product.price) }}
                $ {{ utils.numeral(oneTasteOption.item.price).format('0,0') }}
              </div> -->
            </li>
          </ul>
        </q-card-section>
        <q-separator v-if="product.taste.length !== 0" inset class="bg-grey-2" />
        <q-card-section v-if="product.ingredients.length !== 0">
          <div class="text-h4 row">
            <div>
              配料 (非必填)
            </div>
          </div>
          <div class="text-subtitle2">
            可複選
          </div>
          <ul class="list-unstyled">
            <li
              v-for="(ingredientOption) in ingredientOptions"
              :key="`ingredientOption-${ingredientOption.value}`"
              class="content-item checkbox-svg-color radius-1 q-py-xs flex items-center"
              @click="handleChangeSelectIngredients({ value: ingredientOption.value })"
            >
              <div>
                <q-checkbox
                  color="grey-9"
                  keep-color
                  v-model="selectIngredients"
                  :val="ingredientOption.value"
                  :label="ingredientOption.label"
                  :style="{ fontSize: '2rem' }"
                />
              </div>
              <!-- <q-space />
              <div class="q-mr-md">
                $ {{ utils.numeral(ingredientOption.item.price).format('0,0') }}
              </div> -->
            </li>
          </ul>
        </q-card-section>
        <q-separator v-if="product.ingredients.length !== 0" inset class="bg-grey-2" />
        <!-- <q-card-section>
          <div class="text-h6 row">
            <div>
              備註 (非必填)
            </div>
          </div>
          <div class="text-subtitle2">
            如果您有任何其他需要服務的地方，請告訴我們。
          </div>
        </q-card-section> -->
        <!-- <q-separator inset class="bg-grey-2" /> -->
        <q-card-section class="amount-box flex items-center bg-info fixed-bottom">
          <div class="flex items-center q-mr-md">
            <q-icon class="cursor-pointer" name="remove_circle_outline" @click="handleAmountSubtraction" />
            <span class="d-inline-block q-mx-sm">
              {{ amount }}
            </span>
            <q-icon class="cursor-pointer" name="add_circle_outline"  @click="handleAmountAddition" />
          </div>
          <q-space />
          <q-btn
            class="add-cart col"
            size="lg"
            color="secondary"
            label="加入購物車"
            @click="handleAddCart"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.bar {
  background-color: transparent;
  z-index: 4000;
}
.products-image {
  width: 100%;
  min-height: 50px;
  max-height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #000;
  overflow: hidden;
  .image {
    opacity: 0;
    width: 100%;
    vertical-align: top;
  }
}
.content-item {
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: $grey-3;
  }
}
textarea {
  margin-top: 0.5rem;
  padding: 4px 10px;
  // border: 1px solid #fff;
  background-color: transparent;
  // color: #fff;
  width: 100%;
  outline: 0;
  font-size: 1.4rem;
}
.amount-box {
  font-size: 2rem;
}
.add-cart {
  max-width: 40rem;
}
</style>

<script>
import _ from 'lodash'
import numeral from 'numeral'

export default {
  name: 'ProductShopping',
  props: {
    product: {
      type: Object
    },
    srcItem: {
      type: Object
    }
  },
  data () {
    return {
      selectTaste: null,
      selectIngredients: [],
      amount: 1
    }
  },
  watch: {
    srcItem (newValue, oldValue) {
      if (newValue && !oldValue) {
        const {
          selectTaste,
          selectIngredients,
          amount
        } = newValue
        this.selectTaste = selectTaste
        this.selectIngredients = [...selectIngredients]
        this.amount = amount
      }
    }
  },
  computed: {
    tasteOptions () {
      const tasteOptions = []
      if (!this.product) {
        return []
      }
      const { taste } = this.product
      for (let i = 0, length = taste.length; i < length; i = i + 1) {
        tasteOptions.push({
          label: taste[i].label,
          value: taste[i].value
        })
      }
      return tasteOptions
    },
    ingredientOptions () {
      const ingredientOptions = []
      if (!this.product) {
        return []
      }
      const { ingredients } = this.product
      for (let i = 0, length = ingredients.length; i < length; i = i + 1) {
        ingredientOptions.push({
          label: ingredients[i].label,
          value: ingredients[i].value
        })
      }
      return ingredientOptions
    }
  },
  methods: {
    reset () {
      this.selectTaste = null
      this.selectIngredients = []
      this.amount = 1
    },
    numeral (value) {
      return numeral(value).format('0,0')
    },
    handleClose () {
      this.reset()
      this.$emit('close')
    },
    async fetch () {
    },
    handleChangeSelectIngredients ({ value }) {
      const findIndex = _.findIndex(this.selectIngredients, item => {
        return item === value
      })
      // 如果有在陣列裡面
      if (findIndex !== -1) {
        // 就移除
        this.selectIngredients = this.selectIngredients.filter(item => {
          return item !== value
        })
      }
      // 如果沒有在陣列裡面
      if (findIndex === -1) {
        // 就加入
        this.selectIngredients.push(value)
      }
    },
    handleAmountSubtraction () {
      if (this.amount <= 1) {
        return
      }
      this.amount = this.amount - 1
    },
    handleAmountAddition () {
      if (!this.product) {
        return
      }
      const {
        productName,
        stock
      } = this.product
      if (this.amount === stock) {
        this.$q.notify({
          color: 'warning',
          icon: 'warning',
          message: `${productName}, 庫存剩 ${stock}`
        })
        return
      }
      this.amount = this.amount + 1
    },
    handleAddCart () {
      const {
        product,
        selectTaste,
        selectIngredients,
        amount,
        srcItem
      } = this
      if (!product) {
        return
      }
      const payload = {
        product,
        selectTaste,
        selectIngredients,
        amount
      }
      // 如果有 srcItem，代表是從購物車面頁，按進來的
      if (srcItem) {
        payload.srcItem = srcItem
        this.$store.dispatch('cart/setItem', payload)
      }
      // 如果沒有 srcItem，代表是從首頁，按進來的
      if (!srcItem) {
        this.$store.dispatch('cart/setNewItem', payload)
      }
      this.handleClose()
    }
  }
}
</script>
