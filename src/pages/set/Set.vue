<template>
  <q-page class='q-pa-md'>
    <div class='text-center q-gutter-md' style='margin:auto'>
      <div class="form-wrapper">
        <!-- 背景圖片 -->
        <img
          src="../../statics/EchoSeed_250807-02.svg"
          alt="Header"
          class="form-image"
        />

        <!-- 輸入欄位：透過絕對定位，對齊到圖片上的欄位位置 -->
        <q-input
          v-model="name"
          borderless
          standout="false"
          class="input-name big-input"
        />
        <q-select
          v-model="sex"
          :options="sexOptions"
          borderless
          standout="false"
          class="input-age big-input"
          emit-value
          map-options
        />
        <q-input
          v-model="email"
          borderless
          standout="false"
          class="input-job big-input"
        />
        <q-input
          v-model="phone"
          borderless
          standout="false"
          class="input-phone big-input"
          :rules="[
            val => !!val || '手機號碼為必填',
            val => /^[0-9]*$/.test(val) || '只能輸入數字',
            val => val.startsWith('0') || '必須以 0 開頭',
            val => val.length === 10 || '必須為 10 碼數字'
          ]"
        />
      </div>
      <div class='my-card q-pa-md'>
        <img
          src="..\..\statics\EchoSeed_250806-03.svg"
          alt="Header Banner"
          class="full-width"
          style="height: auto; display: block;"
        />
      </div>
      <div flex style="text-align:left">
        <div>
          1.請選擇
          <q-option-group
            :options="options1"
            type="radio"
            v-model="group1"
          />
        </div>
        <div>
          2.請選擇
          <q-option-group
            :options="options2"
            type="radio"
            v-model="group2"
          />
        </div>
        <div>
          3.請選擇
          <q-option-group
            :options="options3"
            type="radio"
            v-model="group3"
          />
        </div>
        <div>
          4.請選擇
          <q-option-group
            :options="options4"
            type="radio"
            v-model="group4"
          />
        </div>
        <div>
          5.請選擇
          <q-option-group
            :options="options5"
            type="radio"
            v-model="group5"
          />
        </div>
        <div>
          6.請選擇
          <q-option-group
            :options="options6"
            type="radio"
            v-model="group6"
          />
        </div>
        <div>
          7.請選擇
          <q-option-group
            :options="options7"
            type="radio"
            v-model="group7"
          />
        </div>
        <div>
          8.請選擇
          <q-option-group
            :options="options8"
            type="radio"
            v-model="group8"
          />
        </div>
        <div>
          9.請選擇
          <q-option-group
            :options="options9"
            type="radio"
            v-model="group9"
          />
        </div>
        <div>
          10.請選擇
          <q-option-group
            :options="options10"
            type="radio"
            v-model="group10"
          />
        </div>
        <div>
          11.請選擇
          <q-option-group
            :options="options11"
            type="radio"
            v-model="group11"
          />
        </div>
        <div>
          12.請選擇
          <q-option-group
            :options="options12"
            type="radio"
            v-model="group12"
          />
        </div>
        <div>
          13.請選擇
          <q-option-group
            :options="options13"
            type="radio"
            v-model="group13"
          />
        </div>
        <div>
          14.請選擇
          <q-option-group
            :options="options14"
            type="radio"
            v-model="group14"
          />
        </div>
        <div>
          15.請選擇
          <q-option-group
            :options="options15"
            type="radio"
            v-model="group15"
          />
        </div>
        <div>
          16.請選擇
          <q-option-group
            :options="options16"
            type="radio"
            v-model="group16"
          />
        </div>
        <div>
          17.請選擇
          <q-option-group
            :options="options17"
            type="radio"
            v-model="group17"
          />
        </div>
        <div>
          18.請選擇
          <q-option-group
            :options="options18"
            type="radio"
            v-model="group18"
          />
        </div>
        <div>
          19.請選擇
          <q-option-group
            :options="options19"
            type="radio"
            v-model="group19"
          />
        </div>
        <div>
          20.請選擇
          <q-option-group
            :options="options20"
            type="radio"
            v-model="group20"
          />
        </div>
      </div>
      <div class='my-card q-pa-md'>
        <img
          src="..\..\statics\EchoSeed_250806-04.svg"
          alt="Header Banner"
          class="custom-width-img"
          style="height: auto; display: block;"
          @click="submit"
        />
      </div>
      <q-dialog v-model="showAns">
        <q-card class="transparent-card">
          <a
            href="https://lin.ee/u8UsGwUE"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../../statics/EchoSeed_250807_alert.svg"
              alt="Alert"
              class="my-card"
            />
          </a>
        </q-card>
      </q-dialog>
      <!-- <q-dialog v-model="showAns">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h5">
              {{ name }}
            </div>
          </q-card-section>

          <q-card-section>
            測試結果為：{{ score }}
          </q-card-section>
          <q-card-section row>
            <span col>
              (1){{ ans1 }}
            </span>
            <span col>
              (5){{ ans5 }}
            </span>
            <span col>
              (10){{ ans10 }}
            </span>
            <span col>
              (15){{ ans15 }}
            </span>
            <span col>
              (20){{ ans20 }}
            </span>
          </q-card-section>
        </q-card>
      </q-dialog> -->
    </div>
  </q-page>
</template>

<style lang='sass' scoped>
.transparent-card
  background: transparent
  box-shadow: none

.big-input
  // 控制文字大小（手機預設）
  ::v-deep(.q-field__native)
    font-size: 22px
    line-height: 32px
    height: 40px

  // 控制內距（防止大字變形）
  ::v-deep(.q-field__control)
    padding-top: 12px
    padding-bottom: 12px

  // 平板樣式
  @media (min-width: 500px) and (max-width: 1024px)
    ::v-deep(.q-field__native)
      font-size: 38px
      line-height: 46px
      height: 54px

    ::v-deep(.q-field__control)
      padding-top: 16px
      padding-bottom: 16px

  // 桌面樣式
  @media (min-width: 1025px)
    ::v-deep(.q-field__native)
      font-size: 54px
      line-height: 62px
      height: 70px

    ::v-deep(.q-field__control)
      padding-top: 20px
      padding-bottom: 20px

::v-deep(.q-select__dropdown-icon)
  display: none

.form-wrapper
  position: relative
  width: 100%
  max-width: 800px
  margin: 10px auto 0 auto

.form-image
  width: 70%
  height: auto
  display: block
  margin-left: auto
  margin-right: auto

/* 以下是你要根據圖片調整的「輸入欄位位置」 */
.input-name
  position: absolute
  top: -10%   /* 根據圖片調整 */
  left: 38%  /* 根據圖片調整 */
  width: 46%

  @media (min-width: 500px) and (max-width: 1024px)
    top: -4%
    left: 38%
    width: 46%

  @media (min-width: 1025px)
    top: -8%
    left: 38%
    width: 46%

.input-age
  position: absolute
  top: 13%
  left: 38%
  width: 46%

  @media (min-width: 500px) and (max-width: 1024px)
    top: 23%
    left: 38%
    width: 46%

  @media (min-width: 1025px)
    top: 21%
    left: 38%
    width: 46%

.input-job
  position: absolute
  top: 44%
  left: 38%
  width: 46%

  @media (min-width: 500px) and (max-width: 1024px)
    top: 49%
    left: 38%
    width: 46%

  @media (min-width: 1025px)
    top: 46%
    left: 38%
    width: 46%

.input-phone
  position: absolute
  top: 71%
  left: 38%
  width: 46%

  @media (min-width: 500px) and (max-width: 1024px)
    top: 77%
    left: 38%
    width: 46%
    ::v-deep(.q-field__messages)
      padding-top: 18px

  @media (min-width: 1025px)
    top: 74%
    left: 38%
    width: 46%
    ::v-deep(.q-field__messages)
      padding-top: 26px

.custom-width-img
  width: 20vw               /* 佔螢幕寬度 20% */
  max-width: 100%           /* 防止圖片溢出 */
  height: auto              /* 保持比例 */
  display: block            /* 讓 margin 生效 */
  margin: 0 auto            /* 水平置中 */
  border-radius: 4px        /* 圓角（可選） */
.my-card
  width: 94%
.body
  background: #333
  background: radial-gradient(ellipse at center,  #333  0%, #000000 70%)
  background-size: 100%
</style>

<script>
export default {
  name: 'PageSet',
  data () {
    return {
      isSubmit: false,
      showAns: false,
      score: '',
      ans1: '',
      ans5: '',
      ans10: '',
      ans15: '',
      ans20: '',
      name: '',
      sex: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      timerID: '',
      group1: '',
      sexOptions: [
        '16-19歲',
        '20-24歲',
        '25-29歲',
        '30-34歲',
        '35-39歲',
        '40-44歲',
        '45-49歲',
        '50-54歲',
        '55-59歲',
        '60-64歲',
        '65歲以上'
      ],
      options1: [
        { label: '我對我的行動是果斷而堅定不移。', value: 'A' },
        { label: '我在防衛我的動機時，總會表現極度的熱誠。', value: 'B' }
      ],
      group2: '',
      options2: [
        { label: '我喜歡非常和諧的狀況。', value: 'C' },
        { label: '我喜歡和新朋友見面。', value: 'B' }
      ],
      group3: '',
      options3: [
        { label: '我喜歡計畫一些未來的事情。', value: 'C' },
        { label: '我喜歡根據程序做事情。', value: 'D' }
      ],
      group4: '',
      options4: [
        { label: '我是個有創造性的人。', value: 'C' },
        { label: '我是個有富進取心的人。', value: 'A' }
      ],
      group5: '',
      options5: [
        { label: '我很喜歡友善的對待其他人。', value: 'B' },
        { label: '我很喜歡依照細節與規格做事情。', value: 'D' }
      ],
      group6: '',
      options6: [
        { label: '我總是想尋找一些例外的事情。', value: 'D' },
        { label: '我很喜歡想一些替代方案。', value: 'C' }
      ],
      group7: '',
      options7: [
        { label: '我喜歡有人被我指導。', value: 'A' },
        { label: '我很喜歡檢查一些事情以求精確。', value: 'D' }
      ],
      group8: '',
      options8: [
        { label: '我喜歡以新的方式看待一些事情。', value: 'C' },
        { label: '我很喜歡待在一群人所組成的團體中。', value: 'B' }
      ],
      group9: '',
      options9: [
        { label: '我把自己看成一個有創意的人。', value: 'C' },
        { label: '我在工作上總是力求控制和秩序感。', value: 'D' }
      ],
      group10: '',
      options10: [
        { label: '我喜歡做一些我感覺到正確的事情。', value: 'D' },
        { label: '我喜歡做一些體力勞動的事情。', value: 'A' }
      ],
      group11: '',
      options11: [
        { label: '我總是預期最好的事情會發生。', value: 'B' },
        { label: '我喜歡用有系統的方法做事。', value: 'D' }
      ],
      group12: '',
      options12: [
        { label: '我喜歡想像各種事物的可能性。', value: 'C' },
        { label: '我喜歡做一個強勢的人。', value: 'A' }
      ],
      group13: '',
      options13: [
        { label: '我對與別人合作總是感到自在。', value: 'B' },
        { label: '我總是有一些獨立的思考。', value: 'C' }
      ],
      group14: '',
      options14: [
        { label: '我總是以熱誠及友善對待他人。', value: 'B' },
        { label: '我對自己的方向總是精力充沛。', value: 'A' }
      ],
      group15: '',
      options15: [
        { label: '如果我信仰某種理由，我可能會犧牲我的興趣。', value: 'B' },
        { label: '我喜歡以有秩序的方式做事。', value: 'D' }
      ],
      group16: '',
      options16: [
        { label: '我喜歡想一些新點子。', value: 'C' },
        { label: '我總是以充滿興奮及精力的方式做事情。', value: 'A' }
      ],
      group17: '',
      options17: [
        { label: '我喜歡和別人說話。', value: 'B' },
        { label: '我喜歡依照特定程式。', value: 'D' }
      ],
      group18: '',
      options18: [
        { label: '我是個謹慎的人。', value: 'D' },
        { label: '我喜歡完成一些事情。', value: 'A' }
      ],
      group19: '',
      options19: [
        { label: '我喜歡處於一種可以行動的狀態。', value: 'A' },
        { label: '我常常表現體諒和同情的心態。', value: 'C' }
      ],
      group20: '',
      options20: [
        { label: '我喜歡和陌生人交談。', value: 'B' },
        { label: '我喜歡在大多數的情況下發號施令。', value: 'A' }
      ]
    }
  },
  methods: {
    async toDataBase () {
      const {
        score,
        ans1,
        ans5,
        ans10,
        ans15,
        ans20,
        name,
        sex,
        phone,
        email,
        date
      } = this
      await this.axiosInstance.post('https://api-dot-i-food-project-v1.an.r.appspot.com/v1/stores/set/saveData', {
        score,
        ans1,
        ans5,
        ans10,
        ans15,
        ans20,
        name,
        sex,
        phone,
        email,
        date
      })
    },
    submit () {
      this.isSubmit = true
      const ans = []
      let score1 = 0
      let score2 = 0
      let score3 = 0
      let score4 = 0
      ans.push(this.group1)
      ans.push(this.group2)
      ans.push(this.group3)
      ans.push(this.group4)
      ans.push(this.group5)
      ans.push(this.group6)
      ans.push(this.group7)
      ans.push(this.group8)
      ans.push(this.group9)
      ans.push(this.group10)
      ans.push(this.group11)
      ans.push(this.group12)
      ans.push(this.group13)
      ans.push(this.group14)
      ans.push(this.group15)
      ans.push(this.group16)
      ans.push(this.group17)
      ans.push(this.group18)
      ans.push(this.group19)
      ans.push(this.group20)
      if (this.name === '') {
        this.$q.dialog({
          title: '注意',
          message: '您的姓名尚未輸入',
          persistent: true
        })
        return
      }
      if (this.sex === '') {
        this.$q.dialog({
          title: '注意',
          message: '您的年齡尚未輸入',
          persistent: true
        })
        return
      }
      if (this.email === '') {
        this.$q.dialog({
          title: '注意',
          message: '您的職業尚未輸入',
          persistent: true
        })
        return
      }
      if (this.phone === '') {
        this.$q.dialog({
          title: '注意',
          message: '您的手機尚未輸入',
          persistent: true
        })
        return
      }
      if (!/^\d+$/.test(this.phone)) {
        this.$q.dialog({
          title: '注意',
          message: '手機號碼必須為純數字格式',
          persistent: true
        })
        return
      }
      if (!/^\d+$/.test(this.phone)) {
        this.$q.dialog({
          title: '注意',
          message: '手機號碼必須為純數字格式',
          persistent: true
        })
        return
      }
      if (!this.phone.startsWith('0')) {
        this.$q.dialog({
          title: '注意',
          message: '手機號碼必須以 0 開頭',
          persistent: true
        })
        return
      }

      if (this.phone.length !== 10) {
        this.$q.dialog({
          title: '注意',
          message: '手機號碼必須為 10 碼',
          persistent: true
        })
        return
      }
      for (let i = 0, length = ans.length; i < length; i = i + 1) {
        if (ans[i] === '') {
          this.$q.dialog({
            title: '注意',
            message: '您的第' + (i + 1) + '題尚未輸入',
            persistent: true
          })
          return
        } else if (ans[i] === 'A') {
          score1 = score1 + 1
        } else if (ans[i] === 'B') {
          score2 = score2 + 1
        } else if (ans[i] === 'C') {
          score3 = score3 + 1
        } else if (ans[i] === 'D') {
          score4 = score4 + 1
        }
      }
      if (ans[0] === 'A') {
        this.ans1 = '甲'
      } else {
        this.ans1 = '乙'
      }
      if (ans[4] === 'B') {
        this.ans5 = '甲'
      } else {
        this.ans5 = '乙'
      }
      if (ans[9] === 'D') {
        this.ans10 = '甲'
      } else {
        this.ans10 = '乙'
      }
      if (ans[14] === 'B') {
        this.ans15 = '甲'
      } else {
        this.ans15 = '乙'
      }
      if (ans[19] === 'B') {
        this.ans20 = '甲'
      } else {
        this.ans20 = '乙'
      }
      this.score = score1.toString() + score2.toString() + score3.toString() + score4.toString()
      this.showAns = true
      // 存入資料庫
      this.toDataBase()
    },
    nowTimes () {
      this.timerID = setInterval(this.updateTime, 1000)
    },
    updateTime () {
      const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const cd = new Date()
      this.time = week[cd.getDay()]
      this.date =
        (this.zeroPadding(cd.getFullYear(), 4) - 1911) +
        '年' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '月' +
        this.zeroPadding(cd.getDate(), 2) +
        '日' +
        ' ' +
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2)
    },
    zeroPadding (num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  },
  mounted () {
    this.nowTimes()
  }
}
</script>
