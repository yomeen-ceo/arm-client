<template>
  <q-page class="q-pa-none home-page">
    <div class="rows">
      <!-- 上列 -->
      <div class="row-buttons">
        <q-btn
          v-for="n in 2"
          :key="n"
          class="circle-btn"
          round
          unelevated
          @click="onPress(n)"
        >
          <div class="circle-content">
            <q-icon :name="icons[n-1]" size="lg" />
            <div class="label">{{ label[n-1] }}</div>
          </div>
        </q-btn>
      </div>

      <!-- 中列 -->
      <div class="row-buttons">
        <q-btn
          v-for="n in 2"
          :key="n+2"
          class="circle-btn"
          round
          unelevated
          @click="onPress(n+2)"
        >
          <div class="circle-content">
            <q-icon :name="icons[n+1]" size="lg" />
            <div class="label">{{ label[n+1] }}</div>
          </div>
        </q-btn>
      </div>
      <!-- 下列 -->
      <div class="row-buttons">
        <q-btn
          v-for="n in 2"
          :key="n+4"
          class="circle-btn"
          round
          unelevated
          @click="onPress(n+4)"
        >
          <div class="circle-content">
            <q-icon :name="icons[n+3]" size="lg" />
            <div class="label">{{ label[n+3] }}</div>
          </div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.home-page {
  height: 100dvh; /* 滿版直立螢幕 */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* 上下兩列平均分配空間 */
  padding: 4vw;
}

.rows {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.row-buttons {
  display: flex;
  justify-content: space-evenly; /* 三顆平均分配 */
  gap: 4vw;
}

.circle-btn {
  flex: 1;
  max-width: 28vw; /* 保證三顆剛好排得下 */
  aspect-ratio: 1/1; /* 強制圓形 */
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

.circle-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.label {
  font-size: clamp(22px, 3vw, 16px);
}
</style>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      icons: ['home', 'info', 'new_releases', 'shopping_bag', 'favorite', 'settings'],
      label: ['待機', '哈囉', '握手準備', '開始握手', '開始炸物', '預備']
    }
  },
  methods: {
    async onPress (n) {
      try {
        if (n === 1) {
          // 待機
          await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
            sceneId: '10023'
          })
        } else if (n === 2) {
          // 哈囉
          await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
            sceneId: '10022'
          })
        } else if (n === 3) {
          // 握手準備
          await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
            sceneId: '10020'
          })
        } else if (n === 4) {
          // 開始握手
        } else if (n === 5) {
          // 開始炸物
          // 第一次呼叫
          await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
            sceneId: '10021'
          })
          // 等待 4 分鐘 (240000 毫秒)
          await this.sleep(4 * 60 * 1000)
          // 第二次呼叫
          await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
            sceneId: '10022'
          })
        } else if (n === 6) {
          // 預備
          this.test()
        }
      } catch (err) {
        console.log(err)
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async test () {
      console.log('等待前：' + new Date())
      // 等待 4 分鐘 (240000 毫秒)
      await this.sleep(4 * 60 * 1000)
      console.log('等待後：' + new Date())
    }
  }
}
</script>
