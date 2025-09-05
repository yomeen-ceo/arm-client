<template>
  <q-page class='q-pa-md'>
    <div class='text-center q-gutter-md' style='margin:auto'>
      <div>
        <h4 class="text-h4 text-center">
          SET記錄查詢
        </h4>
        <q-table
          class="sticky-column-table"
          :data="setData"
          :columns="columns"
          row-key="_id"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          rows-per-page-label="每頁列數:"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="date" :props="props">{{ props.row.date }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="sex" :props="props">{{ props.row.sex }}</q-td>
              <q-td key="email" :props="props">{{ props.row.email }}</q-td>
              <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
              <q-td key="score" :props="props">{{ props.row.score }}</q-td>
              <q-td key="ans1" :props="props">{{ props.row.ans1 }}</q-td>
              <q-td key="ans5" :props="props">{{ props.row.ans5 }}</q-td>
              <q-td key="ans10" :props="props">{{ props.row.ans10 }}</q-td>
              <q-td key="ans15" :props="props">{{ props.row.ans15 }}</q-td>
              <q-td key="ans20" :props="props">{{ props.row.ans20 }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: 'PageStoresList',
  data () {
    return {
      setData: [],
      columns: [
        {
          name: 'date',
          label: '測驗時間',
          align: 'center',
          field: 'date',
          sortable: true
        },
        {
          name: 'name',
          label: '名字',
          field: 'name',
          align: 'center'
        },
        {
          name: 'sex',
          label: '年齡',
          field: 'sex',
          align: 'center'
        },
        {
          name: 'email',
          label: '職業',
          field: 'email',
          align: 'center'
        },
        {
          name: 'phone',
          label: '手機',
          field: 'phone',
          align: 'center'
        },
        {
          name: 'score',
          label: '分數',
          field: 'score',
          align: 'center'
        },
        {
          name: 'ans1',
          label: '1',
          field: 'ans1',
          align: 'center'
        },
        {
          name: 'ans5',
          label: '5',
          field: 'ans5',
          align: 'center'
        },
        {
          name: 'ans10',
          label: '10',
          field: 'ans10',
          align: 'center'
        },
        {
          name: 'ans15',
          label: '15',
          field: 'ans15',
          align: 'center'
        },
        {
          name: 'ans20',
          label: '20',
          field: 'ans20',
          align: 'center'
        }
      ]
    }
  },
  watch: {
  },
  methods: {
    async fetch () {
      // const res = await this.axiosInstance.get('/v1/stores/set/saveData')
      const res = await this.axiosInstance.get('https://api-dot-i-food-project-v1.an.r.appspot.com/v1/stores/set/saveData')
      console.log('====res.data')
      console.log(res.data)
      const setList = res.data
      this.setData = setList.reverse()
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
