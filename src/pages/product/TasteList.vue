<template>
  <div>
    <h2 class="text-h4 text-center">
      口味列表
    </h2>
    <div class="q-gutter-md text-right q-mb-md">
      <router-link
        class="basic-link"
        :to="{
          name: 'tasteSetup'
        }"
      >
        <q-chip
          class="fixed-btn"
          clickable
          color="primary"
          text-color="white"
          icon="add_circle"
        >
          新增口味
        </q-chip>
      </router-link>
    </div>
    <br/>
    <q-table
      class="sticky-column-table"
      :data="taste"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[5, 10, 15, 20, 0]"
      :filter="filter"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tasteName" :props="props">
            <span class="col-grow">
              {{ props.row.tasteName }}
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
                name: 'tasteSetup',
                params: { taste: props.row }
              }"
            >
              <span>編輯</span>
            </router-link>
            <a
              href="javascript: void(0)"
              class="basic-delete-link gt-xs"
              @click.stop="handleDelete({
                taste: props.row
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
  name: 'PageTasteList',
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
      taste: [],
      columns: [{
        name: 'tasteName',
        label: '口味名稱',
        align: 'center'
      }, {
        name: 'price',
        label: '口味價格',
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
      const res = await this.axiosInstance.get('/v1/taste/list')
      const taste = res.data.taste
      console.log('=========taste')
      console.log(taste)
      this.taste = taste
    },
    async handleDelete (taste) {
      console.log('========delete taste')
      console.log(taste.taste)
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
