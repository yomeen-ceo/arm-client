<template>
  <div>
    <h2 class="text-h4 text-center">
      配料列表
    </h2>
    <div class="q-gutter-md text-right q-mb-md">
      <router-link
        class="basic-link"
        :to="{
          name: 'ingredientsSetup'
        }"
      >
        <q-chip
          class="fixed-btn"
          clickable
          color="primary"
          text-color="white"
          icon="add_circle"
        >
          新增配料
        </q-chip>
      </router-link>
    </div>
    <br/>
    <q-table
      class="sticky-column-table"
      :data="ingredients"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[5, 10, 15, 20, 0]"
      :filter="filter"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ingredientsName" :props="props">
            <span class="col-grow">
              {{ props.row.ingredientsName }}
            </span>
          </q-td>
          <q-td key="price" :props="props">{{ props.row.price }}</q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <router-link
              class="basic-link q-mr-md"
              :to="{
                name: 'ingredientsSetup',
                params: { ingredients: props.row }
              }"
            >
              <span>編輯</span>
            </router-link>
            <a
              href="javascript: void(0)"
              class="basic-delete-link gt-xs"
              @click.stop="handleDelete({
                ingredients: props.row
              })"
            >
              <span>刪除</span>
            </a>
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
  name: 'PageIngredientsList',
  data () {
    return {
      filter: '',
      pagination: {
        sortBy: 'creationTime',
        descending: true,
        page: 1,
        rowsPerPage: 10, // 一頁有幾個
        rowsNumber: 0 // 共有幾筆資料
      },
      ingredients: [],
      columns: [{
        name: 'ingredientsName',
        label: '配料名稱',
        align: 'center'
      }, {
        name: 'price',
        label: '配料價格',
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
      // const res = await this.axiosInstance.get('http://192.168.18.112:5000/v1/ingredients/list')
      const res = await this.axiosInstance.get('/v1/ingredients/list')
      const ingredients = res.data.ingredients
      console.log('=========ingredients')
      console.log(ingredients)
      this.ingredients = ingredients
    },
    async handleDelete (ingredients) {
      console.log('========delete ingredients')
      console.log(ingredients.ingredients)
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
