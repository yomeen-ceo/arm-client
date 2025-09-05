<template>
  <div
    ref="appOptionButtons"
    class="app-option-buttons row q-col-gutter-x-md items-center"
  >
    <div>
      <router-link
        class="link-btn d-inline-block relative-position text-center"
        exact
        active-class="active"
        :to="{ name: 'tableOrder' }"
        :style="{
          width: `${btnWidth}px`
        }"
      >
        查看訂單
        <q-badge v-if="deliveryFilterSelectionItems.length !== 0" color="orange" floating>
          {{ deliveryFilterSelectionItems.length }}
        </q-badge>
      </router-link>
    </div>
    <!-- <div>
      <router-link
        class="link-btn d-inline-block relative-position text-center"
        exact
        active-class="active"
        :to="{ name: buildI18nRouteName({ name: 'takeout' }) }"
        :style="{
          width: `${btnWidth}px`
        }"
      >
        預約外帶
        <q-badge color="orange" floating>22</q-badge>
      </router-link>
    </div> -->
  </div>
</template>

<style lang="scss">
// .app-option-buttons {
// }
.link-btn {
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  color: $grey-8;
  border-radius: 3px;
  background-color: #fff;
  border-radius: 3px;
  font-size: 1.2rem;
  box-shadow: 0 1px 3px $grey-7;
  &.active {
    background-color: $yellow-12;
    box-shadow: 0 1px 3px $grey-5;
  }
}
</style>

<script>
import _ from 'lodash'
import { dom } from 'quasar'
const { width } = dom

export default {
  name: 'AppOptionButtons',
  data () {
    return {
      btnWidth: 100
    }
  },
  computed: {
    forHereItems () {
      let items = []
      const { orders } = this.$store.state.forHerePage
      for (let i = 0, length = orders.length; i < length; i = i + 1) {
        const tempOrderItems = orders[i].items.map(item => {
          item.tableId = orders[i].table._id
          item.kindId = item.product.kind._id
          item.orderId = orders[i]._id
          item.tableName = orders[i].table.name
          item.creationTime = orders[i].updateTime
          return item
        })
        items = [...items, ...tempOrderItems]
      }
      return items.filter(item => item.itemState === 'A001')
    },
    forHereFilterSelectionItems () {
      let items = [...this.forHereItems]
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
    deliveryItems () {
      let items = []
      const { orders } = this.$store.state.forHerePage
      for (let i = 0, length = orders.length; i < length; i = i + 1) {
        const tempOrderItems = orders[i].items.map(item => {
          item.tableId = orders[i].table._id
          item.kindId = item.product.kind._id
          item.orderId = orders[i]._id
          item.tableName = orders[i].table.name
          item.creationTime = orders[i].updateTime
          return item
        })
        items = [...items, ...tempOrderItems]
      }
      return items.filter(item => item.itemState === 'A002')
    },
    deliveryFilterSelectionItems () {
      let items = [...this.deliveryItems]
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
    }
  },
  methods: {
    setMaxBtnWidth () {
      const links = [...this.$refs.appOptionButtons.querySelectorAll('a')]
      const linkWidths = links.map(link => width(link))
      const maxWidth = Math.floor(Math.max(...linkWidths))
      this.btnWidth = maxWidth
    },
    addStoreForHereListener () {
      const {
        storeId
      } = this.$route.params
      this._dbStoreForHereListener = this.db.collection('storeForHere').doc(storeId)
        .onSnapshot(async (doc) => {
          if (this.$store.state.forHerePage.isFirstFetch) {
            return
          }
          if (doc.exists) {
            const { orders } = doc.data()
            this.$store.dispatch('forHerePage/clearSelectItems')
            this.$store.dispatch('forHerePage/hideRemark')
            this.$store.dispatch('forHerePage/setOrders', {
              orders: JSON.parse(orders)
            })
            if (!this.$store.state.stores.isAudioMuted) {
              this.audio.gun.play()
            }
          }
        })
    },
    removeStoreForHereListener () {
      if (this._dbStoreForHereListener) {
        this._dbStoreForHereListener()
        this._dbStoreForHereListener = null
      }
    }
  },
  beforeMount () {
    this.firebase.auth().onAuthStateChanged((user) => {
      // 如果是有登入的狀態下
      if (user) {
        const { storeId } = this.$route.params
        this.$store.dispatch('forHerePage/fetch', {
          storeId
        })
      }
    })
  },
  mounted () {
    this.setMaxBtnWidth()
    this.addStoreForHereListener()
  },
  beforeDestroy () {
    this.removeStoreForHereListener()
  }
}
</script>
