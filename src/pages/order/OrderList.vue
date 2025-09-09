<template>
  <div>
    <h2 class="text-h4 text-center">
      訂單列表
    </h2>
    <q-table
      class="sticky-column-table"
      :data="orders"
      :columns="columns"
      row-key="_id"
      :rows-per-page-options="[5, 10, 15, 20]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="creationTime" :props="props">
            <div class="flex items-center no-wrap text-center">
              <span class="col-grow">
                {{ props.row.creationTime }}
              </span>
            </div>
          </q-td>
          <q-td key="detail" :props="props">{{ props.row.detail }}</q-td>
          <q-td key="totalResult" :props="props">{{ '$'+props.row.totalResult }}</q-td>
          <q-td key="paymentAmount" :props="props">{{ '$'+props.row.paymentAmount }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
// import { date, exportFile } from 'quasar'

export default {
  name: 'PageOrdersList',
  data () {
    return {
      isFirestGetFilterOrders: true,
      orders: [],
      pageAccount: 0,
      columns: [{
        name: 'creationTime',
        label: '訂單時間',
        align: 'center',
        sortable: true
      }, {
        name: 'detail',
        label: '訂單明細',
        align: 'center',
        sortable: true
      }, {
        name: 'totalResult',
        label: '訂單金額',
        align: 'center',
        sortable: true
      }, {
        name: 'paymentAmount',
        label: '付款金額',
        align: 'center',
        sortable: true
      }]
    }
  },
  watch: {
  },
  methods: {
    async fetch () {
      this.orders = []
      this.loading = true
      try {
        const res = await this.axiosInstance.get('http://192.168.18.112:5000/v1/orders/list')
        const {
          orders
        } = res.data
        const newOrders = []
        for (let i = 0, length = orders.length; i < length; i = i + 1) {
          const time = orders[i].creationTime
          const date = new Date(time)
          const pad = (n) => n.toString().padStart(2, '0')
          const creationTime = `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
          const totalResult = orders[i].totalResult // 訂單金額
          const paymentAmount = orders[i].paymentAmount // 付款金額
          let detail = ''
          const items = orders[i].items
          const orderDetail = []
          for (let j = 0, length2 = items.length; j < length2; j = j + 1) {
            const productName = items[j].product.productName // 產品名稱
            const amount = items[j].amount // 產品數量
            detail = detail + (productName + ' x ' + amount + ', ')
            const others = []
            const ingredientsDetail = []
            let taste = ''
            if (items[j].ingredients) {
              const ingredients = items[j].ingredients
              for (let k = 0, length3 = ingredients.length; k < length3; k = k + 1) {
                others.push(
                  ingredients[k].label
                )
                ingredientsDetail.push(
                  ingredients[k].label
                )
              }
            }
            if (items[j].taste) {
              others.push(
                items[j].taste.label
              )
              taste = items[j].taste
            }
            orderDetail.push({
              productName, // 產品名稱
              amount, // 產品數量
              ingredients: ingredientsDetail, // 所有配料
              taste // 口味
            })
          }
          newOrders.push({
            creationTime, // 訂單時間
            totalResult, // 訂單金額
            paymentAmount, // 付款金額
            detail, // 訂單明細字串化
            orderDetail // 訂單明細_用來展開明細顯示用
          })
        }
        this.orders = newOrders
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
