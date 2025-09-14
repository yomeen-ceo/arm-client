<template>
  <q-form
    ref="from"
    class="q-gutter-md"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div>
      <q-input
        ref="tasteName"
        outlined
        v-model="tasteName"
        label="口味名稱"
        hint="必填"
        :rules="[
          val => !!val || '口味名稱必填'
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
  name: 'TastesUpdateForm',
  props: {
    taste: {
      type: Object
    }
  },
  data () {
    return {
      isSubmitting: false,
      tasteName: '',
      price: 0,
      tasteNameOld: '',
      priceOld: 0
    }
  },
  watch: {
    taste (newValue) {
      if (!newValue) {
        return
      }
      const { tasteName, price } = newValue
      this.tasteName = tasteName
      this.price = price
    }
  },
  methods: {
    onReset () {
      this.isSubmitting = false
    },
    async onSubmit () {
      const {
        tasteName,
        price
      } = this
      if (this.taste) {
        const tasteId = this.taste._id
        this.isSubmitting = true
        if ((this.tasteNameOld !== this.tasteName) || (this.priceOld !== this.price)) {
          try {
            await this.axiosInstance.post('http://192.168.18.112:5000/v1/taste/edit', {
              tasteName,
              price: +price,
              tasteId
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
            message: '修改口味成功'
          })
        } else {
          this.isSubmitting = false
          this.$q.notify({
            color: 'positive',
            icon: 'check_circle',
            message: '口味並未修改'
          })
        }
        this.$router.push({
          name: 'tasteList'
        })
      } else {
        this.isSubmitting = true
        try {
          const res = await this.axiosInstance.post('http://192.168.18.112:5000/v1/taste/create', {
            tasteName,
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
          message: '建立口味成功'
        })
        // this.$router.push({
        //   name: 'tasteList'
        // })
      }
    }
  },
  mounted () {
    console.log('=======form==this.taste')
    console.log(this.taste)
    if (this.taste) {
      this.tasteName = this.taste.tasteName
      this.price = this.taste.price
      this.tasteNameOld = this.taste.tasteName
      this.priceOld = this.taste.price
    }
  }
}
</script>
