<template>
  <q-form
    ref="from"
    class="q-gutter-md"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div>
      <q-input
        ref="productName"
        outlined
        v-model="productName"
        label="產品名稱"
        hint="必填"
        :rules="[
          val => !!val || '產品名稱必填'
        ]"
      />
    </div>
    <div>
      <q-input
        ref="kind"
        outlined
        v-model="kind"
        label="類別"
        hint="必填"
        :rules="[
          val => !!val || '類別必填'
        ]"
      />
    </div>
    <div>
      <q-select
        outlined
        v-model="taste"
        :options="tasteOptions"
        label="口味"
        use-chips
        multiple
      >
        <template v-slot:option="scope">
          <q-separator v-if="scope.opt.isTitle" />
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div>
      <q-select
        outlined
        v-model="ingredients"
        :options="ingredientsOptions"
        label="配料"
        use-chips
        multiple
      >
        <template v-slot:option="scope">
          <q-separator v-if="scope.opt.isTitle" />
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div>
      <q-input
        outlined
        v-model="price"
        type="number"
        label="價格"
        hint="必填"
        :rules="[
          val => !!val || '價格必填',
          val => val >= 0 || '金額必需大於或等於0'
        ]"
      />
    </div>
    <div>
      <q-input
        outlined
        v-model="friedTime"
        type="number"
        label="油炸時間"
        hint="必填"
        :rules="[
          val => !!val || '油炸時間',
          val => val > 0 || '油炸時間必需大於0'
        ]"
      />
    </div>
    <div>
      <q-input
        outlined
        v-model="scenarioId"
        type="number"
        label="場景ID"
        hint="必填"
        :rules="[
          val => !!val || '場景ID必填',
          val => val > 0 || '場景ID格式錯誤'
        ]"
      />
    </div>
    <div>
      <q-btn
        class="full-width"
        label="儲存送出"
        type="submit"
        color="primary"
        :disable="isSubmitting"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: 'ProductsUpdateForm',
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
      isSubmitting: false,
      productName: '',
      kind: '',
      price: 0,
      productNameOld: '',
      priceOld: 0,
      taste: [],
      tasteOptions: [],
      ingredients: [],
      ingredientsOptions: [],
      friedTime: '',
      scenarioId: ''
    }
  },
  watch: {
    product (newValue) {
      if (!newValue) {
        return
      }
      const { productName, kind, price, taste, ingredients, friedTime, scenarioId } = newValue
      this.productName = productName
      this.price = price
      this.kind = kind
      this.taste = taste
      this.ingredients = ingredients
      this.friedTime = friedTime
      this.scenarioId = scenarioId
    }
  },
  methods: {
    onReset () {
      this.isSubmitting = false
      this.productName = ''
      this.kind = ''
      this.price = null
      this.taste = []
      this.ingredients = []
      this.friedTime = null
      this.scenarioId = null
    },
    async onSubmit () {
      const {
        productName,
        kind,
        price,
        taste,
        ingredients,
        friedTime,
        scenarioId
      } = this
      // 修改
      if (this.product) {
        const productId = this.product._id
        this.isSubmitting = true
        try {
          await this.axiosInstance.post('/v1/products/edit', {
            productName,
            kind,
            taste: taste.value,
            ingredients: taste.ingredients,
            price: +price,
            productId,
            friedTime: +friedTime,
            scenarioId: +scenarioId
          })
        } catch (error) {
          this.isSubmitting = false
          console.log(error)
          return false
        }
        this.isSubmitting = false
        this.$q.notify({
          color: 'positive',
          icon: 'check_circle',
          message: '修改產品成功'
        })
        this.$router.push({
          name: 'productList'
        })
      } else { // 新增
        this.isSubmitting = true
        try {
          const res = await this.axiosInstance.post('/v1/products/create', {
            productName,
            kind,
            taste,
            ingredients,
            price: +price,
            friedTime: +friedTime,
            scenarioId: +scenarioId
          })
          console.log('=========res.data')
          console.log(res.data)
        } catch (error) {
          this.isSubmitting = false
          console.log(error)
          return false
        }
        this.isSubmitting = false
        this.$q.notify({
          color: 'positive',
          icon: 'check_circle',
          message: '建立產品成功'
        })
        this.onReset()
        // this.$router.push({
        //   name: 'productList'
        // })
      }
    },
    async fetch () {
      // 取得 口味
      try {
        const res = await this.axiosInstance.get('/v1/taste/list')
        const { taste } = res.data
        const tasteOptions = []
        for (let i = 0, length = taste.length; i < length; i = i + 1) {
          tasteOptions.push({
            label: taste[i].tasteName,
            value: taste[i]._id
          })
        }
        this.tasteOptions = tasteOptions
      } catch (error) {
        console.log(error)
      }
      // 取得 配料
      try {
        const res = await this.axiosInstance.get('/v1/ingredients/list')
        console.log('=====res.data')
        console.log(res.data)
        const { ingredients } = res.data
        const ingredientsOptions = []
        for (let i = 0, length = ingredients.length; i < length; i = i + 1) {
          ingredientsOptions.push({
            label: ingredients[i].ingredientsName,
            value: ingredients[i]._id
          })
        }
        this.ingredientsOptions = ingredientsOptions
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.fetch()
    console.log('=======form==this.product')
    console.log(this.product)
    if (this.product) {
      this.productName = this.product.productName
      this.kind = this.product.kind
      this.price = this.product.price
      this.productNameOld = this.product.productName
      this.priceOld = this.product.price
      this.friedTime = this.product.friedTime
      this.scenarioId = this.product.scenarioId
    }
  }
}
</script>
