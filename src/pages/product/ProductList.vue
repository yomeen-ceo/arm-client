<template>
  <div>
    <h2 class="text-h4 text-center">
      產品列表
    </h2>
    <div class="q-gutter-md text-right q-mb-md">
      <router-link
        class="basic-link"
        :to="{
          name: 'productSetup'
        }"
      >
        <q-chip
          class="fixed-btn"
          clickable
          color="primary"
          text-color="white"
          icon="add_circle"
        >
          新增商品
        </q-chip>
      </router-link>
    </div>
    <br/>
    <q-table
      class="sticky-column-table"
      :data="products"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[5, 10, 15, 20, 0]"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="productName" :props="props">
            <div class="flex items-center no-wrap text-left">
              <span class="col-grow">
                {{ props.row.productName }}
              </span>
            </div>
          </q-td>
          <q-td key="kind" :props="props">{{ props.row.kind }}</q-td>
          <q-td key="friedTime" :props="props">{{ props.row.friedTime }}</q-td>
          <q-td key="price" :props="props">{{ props.row.price }}</q-td>
          <q-td key="taste" :props="props">{{ props.row.taste }}</q-td>
          <q-td key="ingredients" :props="props">{{ props.row.ingredients }}</q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <router-link
              class="basic-link q-mr-md"
              :to="{
                name: 'productSetup',
                params: { productId: props.row['_id'] }
              }"
            >
              <span>編輯</span>
            </router-link>
            <!-- <a
              href="javascript: void(0)"
              class="basic-delete-link gt-xs"
              @click.stop="handleDelete({
                product: props.row
              })"
            >
              <span>刪除</span>
            </a> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.products-image {
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.fixed-btn {
  position: fixed;
  top: 16px;   /* 與上方距離 */
  right: 16px; /* 與右側距離 */
  z-index: 2000;
}
</style>

<script>
export default {
  name: 'PageProductsList',
  data () {
    return {
      loading: false,
      isAdmin: false,
      url: '',
      uploadShow: false,
      available: '請按此選擇',
      availableOptions: [],
      storeNames: [],
      filter: '',
      pagination: {
        sortBy: 'creationTime',
        descending: true,
        page: 1,
        rowsPerPage: 10, // 一頁有幾個
        rowsNumber: 0 // 共有幾筆資料
      },
      products: [],
      columns: [{
        name: 'productName',
        label: '產品名稱',
        align: 'center'
      }, {
        name: 'kind',
        label: '分類',
        align: 'center'
      }, {
        name: 'friedTime',
        label: '油炸時間',
        align: 'center'
      }, {
        name: 'price',
        label: '產品價格',
        align: 'center',
        sortable: true
      }, {
        name: 'taste',
        label: '口味',
        align: 'center',
        sortable: true
      }, {
        name: 'ingredients',
        label: '配料',
        align: 'center',
        sortable: true
      }, {
        name: 'actions',
        label: '編輯',
        align: 'center'
      }]
    }
  },
  watch: {
  },
  methods: {
    async fetch () {
      // const res = await this.axiosInstance.get('http://192.168.18.112:5000/v1/products/list')
      const res = await this.axiosInstance.get('/v1/products/list')
      const oldProducts = res.data.products
      console.log('======oldProducts')
      console.log(oldProducts)
      const products = []
      for (let i = 0, length = oldProducts.length; i < length; i = i + 1) {
        let taste = ''
        let ingredients = ''
        for (let j = 0, length2 = oldProducts[i].taste.length; j < length2; j = j + 1) {
          taste = taste + oldProducts[i].taste[j].label + ', '
        }
        for (let j = 0, length2 = oldProducts[i].ingredients.length; j < length2; j = j + 1) {
          ingredients = ingredients + oldProducts[i].ingredients[j].label + ', '
        }
        products.push({
          productName: oldProducts[i].productName,
          kind: oldProducts[i].kind,
          friedTime: oldProducts[i].friedTime,
          price: oldProducts[i].price,
          taste,
          ingredients,
          _id: oldProducts[i]._id
        })
      }
      this.products = products
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
