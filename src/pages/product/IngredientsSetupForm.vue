<template>
  <q-form
    ref="from"
    class="q-gutter-md"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div>
      <q-input
        ref="ingredientsName"
        outlined
        v-model="ingredientsName"
        label="配料名稱"
        hint="必填"
        :rules="[
          val => !!val || '配料名稱必填'
        ]"
      />
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
  name: 'IngredientssUpdateForm',
  props: {
    ingredients: {
      type: Object
    }
  },
  data () {
    return {
      isSubmitting: false,
      ingredientsName: '',
      price: 0,
      ingredientsNameOld: '',
      priceOld: 0
    }
  },
  watch: {
    ingredients (newValue) {
      if (!newValue) {
        return
      }
      const { ingredientsName, price } = newValue
      this.ingredientsName = ingredientsName
      this.price = price
    }
  },
  methods: {
    onReset () {
      this.isSubmitting = false
    },
    async onSubmit () {
      const {
        ingredientsName,
        price
      } = this
      if (this.ingredients) {
        const ingredientsId = this.ingredients._id
        this.isSubmitting = true
        if ((this.ingredientsNameOld !== this.ingredientsName) || (this.priceOld !== this.price)) {
          try {
            // await this.axiosInstance.post('http://192.168.18.112:5000/v1/ingredients/edit', {
            await this.axiosInstance.post('/v1/ingredients/edit', {
              ingredientsName,
              price: +price,
              ingredientsId
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
            message: '修改配料成功'
          })
        } else {
          this.isSubmitting = false
          this.$q.notify({
            color: 'positive',
            icon: 'check_circle',
            message: '配料並未修改'
          })
        }
        this.$router.push({
          name: 'ingredientsList'
        })
      } else {
        this.isSubmitting = true
        try {
          const res = await this.axiosInstance.post('http://192.168.18.112:5000/v1/ingredients/create', {
            ingredientsName,
            price: +price
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
          message: '建立配料成功'
        })
        // this.$router.push({
        //   name: 'ingredientsList'
        // })
      }
    }
  },
  mounted () {
    console.log('=======form==this.ingredients')
    console.log(this.ingredients)
    if (this.ingredients) {
      this.ingredientsName = this.ingredients.ingredientsName
      this.price = this.ingredients.price
      this.ingredientsNameOld = this.ingredients.ingredientsName
      this.priceOld = this.ingredients.price
    }
  }
}
</script>
