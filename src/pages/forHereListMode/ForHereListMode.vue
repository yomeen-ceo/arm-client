<template>
  <q-page>
    <div class="page-padding q-py-md">
      <div v-if="!isFirstFetch">
        <q-table
          class="list-table"
          :data="computedItems"
          :columns="columns"
          row-key="name"
          :visible-columns="visibleColumns"
          :pagination="pagination"
          hide-bottom
        >
          <!-- top slot without props -->
          <template v-slot:top>
            <div v-if="$q.screen.gt.xs" class="col">
              <q-toggle v-model="visibleColumns" val="selectOneTaste" label="口味一" />
              <q-toggle v-model="visibleColumns" val="selectTwoTaste" label="口味二" />
              <q-toggle v-model="visibleColumns" val="selectIngredients" label="配料" />
              <q-toggle v-model="visibleColumns" val="remark" label="備註" />
            </div>
            <q-select
              v-else
              v-model="visibleColumns"
              multiple
              borderless
              dense
              options-dense
              display-value="顯示欄位設定"
              emit-value
              map-options
              :options="columns"
              option-value="name"
            />
          </template>

          <!-- header and body slots remain unchanged -->
          <template v-slot:header-cell-amount>
            <q-th class="text-left">
              <span>數量</span>
              <q-icon
                v-if="!sortRule.amount.isDescending"
                class="rotate-90 cursor-pointer"
                size="md"
                name="reply"
                @click="sortRule.amount.isDescending = true; currentClickSort = 'amount'"
              />
              <q-icon
                v-if="sortRule.amount.isDescending"
                class="rotate-270 cursor-pointer"
                size="md"
                name="reply"
                @click="sortRule.amount.isDescending = false; currentClickSort = 'amount'"
              />
            </q-th>
          </template>
          <template v-slot:header-cell-flowTime>
            <q-th class="text-left">
              <span>最後更新時間</span>
              <q-icon
                v-if="!sortRule.flowTime.isDescending"
                class="rotate-90 cursor-pointer"
                size="md"
                name="reply"
                @click="sortRule.flowTime.isDescending = true; currentClickSort = 'flowTime'"
              />
              <q-icon
                v-if="sortRule.flowTime.isDescending"
                class="rotate-270 cursor-pointer"
                size="md"
                name="reply"
                @click="sortRule.flowTime.isDescending = false; currentClickSort = 'flowTime'"
              />
            </q-th>
          </template>
          <template v-slot:body-cell-kitchenName="props">
            <q-td>
              {{ props.row.product.kitchenName }}
            </q-td>
          </template>
          <template v-slot:body-cell-selectOneTaste="props">
            <q-td>
              <div class="flex items-center">
                <q-badge
                  v-if="props.row.selectOneTaste"
                  class="badge"
                  :label="props.row.selectOneTaste.oneTasteName"
                  color="secondary-darken-10"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-selectTwoTaste="props">
            <q-td>
              <div class="flex items-center">
                <q-badge
                  v-if="props.row.selectTwoTaste"
                  class="badge"
                  :label="props.row.selectTwoTaste.twoTasteName"
                  color="secondary-darken-10"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-selectIngredients="props">
            <q-td class="selectIngredients-td">
              <div class="q-gutter-md">
                <q-badge
                  v-for="(selectIngredient) in props.row.selectIngredients"
                  class="badge"
                  :key="`item-${props.row._id}-selectIngredient-${selectIngredient._id}`"
                  :label="selectIngredient.ingredientName"
                  color="secondary-darken-20"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-remark="props">
            <q-td>
              <div class="flex items-center">
                <q-badge
                  v-if="props.row.remark"
                  class="badge"
                  :label="props.row.remark"
                  color="secondary-darken-10"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-amount="props">
            <q-td>
              x {{ props.row.amount }}
            </q-td>
          </template>
          <template v-slot:body-cell-flowTime="props">
            <q-td>
              <span>
                {{ props.row.formatFlowTime }}
              </span>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.list-table {
  font-size: 1.5rem !important;
  th,
  td {
    font-size: 1.5rem !important;
  }
  .badge {
    transform: scale(1.4);
  }
  .selectIngredients-td {
    padding-top: 14px;
  }
}
</style>

<script>
import _ from 'lodash'
import { date } from 'quasar'

export default {
  name: 'PageForHereListMode',
  data () {
    return {
      sortRule: {
        flowTime: {
          isDescending: false
        },
        amount: {
          isDescending: false
        }
      },
      currentClickSort: 'flowTime',
      isFullscreen: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      isFirstFetch: true,
      visibleColumns: ['kitchenName', 'selectOneTaste', 'selectTwoTaste', 'selectIngredients', 'remark', 'amount', 'flowTime'],
      columns: [{
        name: 'kitchenName',
        label: '產品名稱',
        align: 'left'
      }, {
        name: 'selectOneTaste',
        label: '口味一',
        align: 'left'
      }, {
        name: 'selectTwoTaste',
        label: '口味二',
        align: 'left'
      }, {
        name: 'selectIngredients',
        label: '配料',
        align: 'left'
      }, {
        name: 'remark',
        label: '備註',
        align: 'left'
      }, {
        name: 'amount',
        label: '數量',
        align: 'left'
      }, {
        name: 'flowTime',
        label: '最後更新時間',
        align: 'left'
      }]
    }
  },
  computed: {
    items () {
      let items = []
      const { orders } = this.$store.state.forHerePage
      for (let i = 0, length = orders.length; i < length; i = i + 1) {
        const tempOrderItems = orders[i].items.map(item => {
          item.tableId = orders[i].table._id
          item.kindId = item.product.kind._id
          item.orderId = orders[i]._id
          item.tableName = orders[i].table.name
          item.creationTime = orders[i].creationTime
          item.flowTime = orders[i].flow[orders[i].flow.length - 1].flowTime
          item.formatFlowTime = date.formatDate(
            orders[i].flow[orders[i].flow.length - 1].flowTime,
            'MM-DD HH:mm'
          )
          return item
        })
        items = [...items, ...tempOrderItems]
      }
      return items.filter(item => item.itemState === 'A001')
    },
    filterSelectionItems () {
      let items = [...this.items]
      const {
        tableSelection,
        kindSelection
      } = this.$store.state.kitchenSetting
      // 過濾 tableSelection
      items = items.filter(item => {
        if (_.indexOf(tableSelection, item.tableId) === -1) {
          return false
        }
        return true
      })
      // 過濾 kindSelection
      items = items.filter(item => {
        if (_.indexOf(kindSelection, item.kindId) === -1) {
          return false
        }
        return true
      })
      return items
    },
    computedItems () {
      const computedItems = []
      const { filterSelectionItems, visibleColumns } = this
      const tempItems = [...filterSelectionItems]
      for (let i = 0, length = tempItems.length; i < length; i = i + 1) {
        const currentItem = tempItems[i]
        const findIndex = _.findIndex(computedItems, (computedItem) => {
          // 看產品，是否一樣
          if (currentItem.product._id !== computedItem.product._id) {
            return false
          }
          const isNeedCheckSelectOneTaste = _.indexOf(visibleColumns, 'selectOneTaste') !== -1
          if (isNeedCheckSelectOneTaste) {
            // 看口味一，是否一樣
            if (currentItem.selectOneTaste === null && computedItem.selectOneTaste !== null) {
              return false
            }
            if (currentItem.selectOneTaste !== null && computedItem.selectOneTaste === null) {
              return false
            }
            if (
              currentItem.selectOneTaste &&
              computedItem.selectOneTaste &&
              currentItem.selectOneTaste._id !== computedItem.selectOneTaste._id
            ) {
              return false
            }
          }
          const isNeedCheckSelectTwoTaste = _.indexOf(visibleColumns, 'selectTwoTaste') !== -1
          if (isNeedCheckSelectTwoTaste) {
            // 看口味二，是否一樣
            if (currentItem.selectTwoTaste === null && computedItem.selectTwoTaste !== null) {
              return false
            }
            if (currentItem.selectTwoTaste !== null && computedItem.selectTwoTaste === null) {
              return false
            }
            if (
              currentItem.selectTwoTaste &&
              computedItem.selectTwoTaste &&
              currentItem.selectTwoTaste._id !== computedItem.selectTwoTaste._id
            ) {
              return false
            }
          }
          const isNeedCheckSelectIngredients = _.indexOf(visibleColumns, 'selectIngredients') !== -1
          if (isNeedCheckSelectIngredients) {
            // 看配料，是否一樣
            const currentItemSelectIngredientIds = currentItem.selectIngredients.map(selectIngredient => {
              return selectIngredient._id
            })
            const computedItemSelectIngredientIds = computedItem.selectIngredients.map(selectIngredient => {
              return selectIngredient._id
            })
            if (_.xor(currentItemSelectIngredientIds, computedItemSelectIngredientIds).length !== 0) {
              return false
            }
          }
          const isNeedCheckRemark = _.indexOf(visibleColumns, 'remark') !== -1
          if (isNeedCheckRemark) {
            // 看備註，是否一樣
            if (currentItem.remark !== computedItem.remark) {
              return false
            }
          }
          return true
        })
        // 如果沒找到，就新增它
        if (findIndex === -1) {
          computedItems.push({
            product: currentItem.product,
            selectOneTaste: currentItem.selectOneTaste,
            selectTwoTaste: currentItem.selectTwoTaste,
            selectIngredients: currentItem.selectIngredients,
            remark: currentItem.remark,
            flowTime: currentItem.flowTime,
            formatFlowTime: currentItem.formatFlowTime,
            amount: 1
          })
        }
        // 如果有找到，就增加 amount
        if (findIndex !== -1) {
          if (currentItem.flowTime > computedItems[findIndex].flowTime) {
            computedItems[findIndex].flowTime = currentItem.flowTime
            computedItems[findIndex].formatFlowTime = currentItem.formatFlowTime
          }
          computedItems[findIndex].amount += 1
        }
      }
      computedItems.sort((a, b) => {
        // 參考
        // https://coderwall.com/p/ebqhca/javascript-sort-by-two-fields
        let flowTimeNumber
        let amountNumber
        // flowTime 降序
        if (this.sortRule.flowTime.isDescending) {
          flowTimeNumber = b.flowTime - a.flowTime
        }
        // flowTime 升序
        if (!this.sortRule.flowTime.isDescending) {
          flowTimeNumber = a.flowTime - b.flowTime
        }
        // amount 降序
        if (this.sortRule.amount.isDescending) {
          amountNumber = b.amount - a.amount
        }
        // flowTime 升序
        if (!this.sortRule.amount.isDescending) {
          amountNumber = a.amount - b.amount
        }
        if (this.currentClickSort === 'flowTime') {
          return flowTimeNumber || amountNumber
        } else {
          return amountNumber || flowTimeNumber
        }
      })
      return computedItems
    }
  },
  methods: {
  },
  mounted () {
    console.log('===========this.$store.state')
    console.log(this.$store.state)
  }
}
</script>
