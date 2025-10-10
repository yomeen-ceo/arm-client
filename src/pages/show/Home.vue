<template>
  <q-page class="q-pa-none home-page">
    <div class="rows">
      <!-- 上列 -->
      <div class="row-buttons">
        <q-btn
          v-for="n in 3"
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
          v-for="n in 3"
          :key="n+3"
          class="circle-btn"
          round
          unelevated
          @click="onPress(n+3)"
        >
          <div class="circle-content">
            <q-icon :name="icons[n+2]" size="lg" />
            <div class="label">{{ label[n+2] }}</div>
          </div>
        </q-btn>
      </div>
      <!-- 下列 -->
      <div class="row-buttons">
        <q-btn
          class="circle-btn"
          round
          unelevated
          @click="onPress(999)"
        >
          <div class="circle-content">
            <q-icon :name="icons[0]" size="lg" />
            <div class="label">超級待機</div>
          </div>
        </q-btn>
      </div>
    </div>
    <!-- ✅ QDialog for 滑軌位移 -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="text-h4 text-primary">
          🧭 輸入滑軌參數
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="confirmMove" class="q-gutter-md">
            <q-input
              v-model.number="form.x"
              label="位移距離 X (60 ~ -900)"
              type="number"
              :rules="[
                val => val !== '' || '請輸入數值',
                val => Number.isInteger(val) || '必須是整數',
                val => val <= -60 && val >= -900 || 'X 必須在 -60 ~ -900 之間'
              ]"
            />
            <q-input
              v-model.number="form.speed"
              label="移動速度 Speed (0 ~ 360)"
              type="number"
              :rules="[
                val => val !== '' || '請輸入數值',
                val => Number.isInteger(val) || '必須是整數',
                val => val >= 0 && val <= 360 || 'Speed 必須在 0 ~ 360 之間'
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="grey" v-close-popup />
          <q-btn flat label="確定" color="primary" @click="confirmMove" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      label: ['待機', '取物測試', '滑軌位移', '開始炸物', '取出炸物', '鬆爪回歸'],
      isLoop: false,
      showDialog: false,
      form: {
        x: -500,
        speed: 360
      },
      loopTimer: null // 保存 interval ID
    }
  },
  methods: {
    async confirmMove () {
      // 驗證輸入範圍
      if (
        !Number.isInteger(this.form.x) ||
        !Number.isInteger(this.form.speed) ||
        this.form.x > -60 ||
        this.form.x < -900 ||
        this.form.speed < 0 ||
        this.form.speed > 360
      ) {
        this.$q.notify({
          type: 'negative',
          message: '❌ 請輸入正確的 X（-60 ~ -900）與 Speed（0 ~ 360）數值'
        })
        return
      }

      try {
        await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/call-scene', {
          sceneId: '10271',
          params: [this.form.x, this.form.speed],
          dir: null
        })
        this.$q.notify({
          type: 'positive',
          message: `✅ 滑軌已移動 X:${this.form.x}, Speed:${this.form.speed}`
        })
        this.showDialog = false
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: '❌ 滑軌指令發送失敗'
        })
      }
    },
    async onPress (n) {
      try {
        if (n === 1) {
          if (!this.isLoop) {
            this.isLoop = true
            // 待機
            await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
              sceneId: '10023'
            })
            // 開啟循環，每 10 秒再呼叫一次
            this.loopTimer = setInterval(async () => {
              try {
                await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
                  sceneId: '10023'
                })
                console.log('scene 10023 已執行')
              } catch (err) {
                console.error('呼叫失敗', err)
              }
            }, 5 * 1000) // 這裡改你要的間隔時間
          } else {
            // 停止
            this.loopTimer = null
            this.isLoop = false
          }
        } else if (n === 2) {
          // 哈囉
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10272'
          })
        } else if (n === 3) {
          // ✅ 打開對話框
          this.showDialog = true
        } else if (n === 4) {
          // 開始炸物
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10021'
          })
        } else if (n === 5) {
          // 取出炸物 10029預備 10024正常
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10024'
          })
          // 第一次呼叫
          // await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
          //   sceneId: '10021'
          // })
          // 等待 4 分鐘 (240000 毫秒)
          // await this.sleep(4 * 60 * 1000)
          // 第二次呼叫
          // await this.axiosInstance.post('http://localhost:3333/api/robot/start-task', {
          //   sceneId: '10022'
          // })
        } else if (n === 6) {
          // 鬆爪回歸
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10026'
          })
        } else if (n === 999) {
          // 開始炸物
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10030'
          })
          // 取出炸物 10029預備 10024正常
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10031'
          })
          // 鬆爪回歸
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10026'
          })
          // 哈囉
          await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
            sceneId: '10022'
          })
          // 開啟循環，每 41 秒再呼叫一次
          this.loopTimer = setInterval(async () => {
            // 開始炸物
            await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
              sceneId: '10030'
            })
            // 取出炸物 10029預備 10024正常
            await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
              sceneId: '10031'
            })
            // 鬆爪回歸
            await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
              sceneId: '10026'
            })
            // 哈囉
            await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/start-task', {
              sceneId: '10022'
            })
          }, 38 * 1000) // 這裡改你要的間隔時間
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
  },
  async mounted () {
    await this.axiosInstance.post('http://192.168.1.76:3333/api/robot/connect', {
      robotIP: '192.168.1.111'
    })
  }
}
</script>
