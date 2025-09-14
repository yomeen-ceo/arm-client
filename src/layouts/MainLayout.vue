<template>
  <q-layout view="lhh lpr lff">
    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar>
        <!-- <q-toolbar-title class="overflow-initial">
          <app-option-buttons />
        </q-toolbar-title> -->
        <span v-if="$store.state.stores.store" class="text-subtitle1 q-mr-md">
          {{ $store.state.stores.store.name }}
        </span>

        <div class="gt-xs">
          <app-toggle-fullscreen />
        </div>
        <!-- 原本的 menu -->
        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <!-- 五顆 chip 導覽 -->
         <div class="chip-container">
          <q-chip
            clickable
            color="primary"
            text-color="white"
            class="chip"
            style="width: 120px"
            @click="chipAction('orderHome')"
          >
            <div class="chip-content">
              首頁
            </div>
          </q-chip>

          <q-chip
            clickable
            color="primary"
            text-color="white"
            class="chip text-center"
            style="width: 120px"
            @click="chipAction('orderList')"
          >
            <div class="chip-content">
              訂單列表
            </div>
          </q-chip>

          <q-chip
            clickable
            color="primary"
            text-color="white"
            class="chip text-center"
            style="width: 120px"
            @click="chipAction('productList')"
          >
            <div class="chip-content">
              商品列表
            </div>
          </q-chip>

          <q-chip
            clickable
            color="primary"
            text-color="white"
            class="chip text-center"
            style="width: 120px"
            @click="chipAction('ingredientsList')"
          >
            <div class="chip-content">
              配料列表
            </div>
          </q-chip>

          <q-chip
            clickable
            color="primary"
            text-color="white"
            class="chip text-center"
            style="width: 120px"
            @click="chipAction('tasteList')"
          >
            <div class="chip-content">
              口味列表
            </div>
          </q-chip>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
    >
      <q-list>
        <q-item clickable exact :to="{ name: 'orderHome' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              首頁
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'orderList'
          }"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              訂單列表
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'productList'
          }"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              商品列表
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'tasteList'
          }"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              口味列表
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{
            name: 'ingredientsList'
          }"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              配料列表
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="testAxios"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              測試手臂動作
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <!-- 已完成出餐序號 -->
        <div class="q-pa-sm text-h5">
          已完成出餐序號
        </div>
        <div class="q-pa-sm">
          <!-- 這裡放已完成的序號列表 -->
          <q-list dense>
            <q-item v-for="num in sucessList" :key="num">
              <q-item-section>
                <q-chip
                  clickable
                  color="primary"
                  text-color="white"
                  class="chip text-center"
                  style="width: 120px"
                  @click="sucessOrder(num)"
                >
                  <div class="chip-content">
                    {{ num }}
                  </div>
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- 出餐等候序號 -->
        <div class="q-pa-sm text-h5">
          出餐等候序號
        </div>
        <div class="q-pa-sm">
          <!-- 這裡放等候的序號列表 -->
          <q-list dense>
            <q-item v-for="num in waitList" :key="num">
              <q-item-section>{{ num }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <app-loging /> -->

    <app-portrait-tip class="lt-md orientation-portrait" />
  </q-layout>
</template>

<style scoped>
.chip-container {
  display: flex;
  gap: 8px;        /* chip 間距 */
  flex: 1;         /* 撐滿剩餘空間 */
}

.chip {
  flex: 1;                       /* 所有 chip 寬度相同 */
  display: flex !important;       /* 將 q-chip 變成 flex */
  justify-content: center;        /* 水平置中 */
  align-items: center;            /* 垂直置中 */
  min-height: 20px;               /* 放大高度 */
  font-size: 1.5rem;              /* 文字放大 */
}

.chip-content {
  width: 100%;                    /* 撐滿 chip */
  text-align: center;             /* 文字水平置中 */
}
</style>

<script>
// import AppLoging from 'components/AppLoging'
// import AppOptionButtons from 'components/AppOptionButtons'
import AppToggleFullscreen from 'components/AppToggleFullscreen'
import AppPortraitTip from 'components/AppPortraitTip'

export default {
  name: 'MainLayout',
  components: {
    // AppLoging,
    // AppOptionButtons,
    AppToggleFullscreen,
    AppPortraitTip
  },
  data () {
    return {
      drawerRight: true,
      rightDrawerOpen: false,
      intervalId: null,
      waitList: [],
      sucessList: []
    }
  },
  watch: {
  },
  methods: {
    async testAxios () {
      const res = await this.axiosInstance.post('http://192.168.1.105:3333/api/robot/start-task', {
        sceneId: '10002'
      })
      console.log('======res.data')
      console.log(res.data)
    },
    chipAction (val) {
      this.$router.push({
        name: val
      })
    },
    async sucessOrder (val) {
      const taskId = val
      const res = await this.axiosInstance.post('/v1/orders/sucess', { taskId })
      console.log('=======res.data')
      console.log(res.data)
    },
    async fetch () {
      this.intervalId = setInterval(async () => {
        const res = await this.axiosInstance.get('/v1/orders/taskList')
        // 取得出餐等候序號
        const list = res.data.waitList
        const waitList = []
        for (let i = 0, length = list.length; i < length; i = i + 1) {
          waitList.push(list[i])
        }
        this.waitList = waitList
        // 取得未完成出餐序號
        const orders = res.data.orders
        const result = orders.filter(order => {
          return order.status === false && !waitList.includes(order.taskIdArray[0])
        })
        const sucessList = []
        for (let i = 0, length = result.length; i < length; i = i + 1) {
          sucessList.push(result[i].taskIdArray[0])
        }
        this.sucessList = sucessList
      }, 1000)
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
