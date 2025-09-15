<template>
  <q-page class='q-pa-md'>
    <div class='text-center q-gutter-md' style='margin:auto'>
      <div style="font-size:6px; text-align:right">
        <span>
          {{ date }} / {{ time }}
        </span>
      </div>
      <q-card bordered class='my-card'>
        <q-img src='/statics/setLogo.png' />
        <q-card-section>
          <div class='text-h5'>Solution Envisioning Teamwork</div>
          <div>「Semantic consciousness.」</div>
          <div style="color:red">* indicates a required field.</div>
        </q-card-section>
      </q-card>
      <q-card bordered class='my-card q-pa-md'>
        <q-input v-model="name" label="*Name：" />
        <div class="q-gutter-sm q-pa-md">
          <q-radio v-model="sex" val="boy" label="men" />
          <q-radio v-model="sex" val="girl" label="women" />
        </div>
        <q-input v-model="phone" label="Telphone：" />
        <q-input v-model="email" label="E-MAIL：" />
      </q-card>
      <q-card bordered class='my-card q-pa-md'>
        <div class="text-h6">
          Test instruction
        </div>
        <div class="q-py-xs" style="font-size:14px; text-align:left">
          Please answer the following 20 questions in sequence, choosing one of the two options for each question. Do not skip any questions.
        </div>
        <div class="q-py-xs" style="font-size:14px; text-align:left">
          There is no right or wrong in the options, please answer based on your intuition, the two options are not necessarily related. If both options apply, please choose the one that applies more. If neither option applies, please exclude the less applicable one and choose the other option.
        </div>
        <div class="q-py-xs" style="font-size:18px; text-align:left; color:red">
          This test should be taken again after a three-month interval. It is not recommended to repeat the test in a short period of time.
        </div>
      </q-card>
      <div flex style="text-align:left">
        <div>
          1.Please choose one:
          <q-option-group
            :options="options1"
            type="radio"
            v-model="group1"
          />
        </div>
        <div>
          2.Please choose one:
          <q-option-group
            :options="options2"
            type="radio"
            v-model="group2"
          />
        </div>
        <div>
          3.Please choose one:
          <q-option-group
            :options="options3"
            type="radio"
            v-model="group3"
          />
        </div>
        <div>
          4.Please choose one:
          <q-option-group
            :options="options4"
            type="radio"
            v-model="group4"
          />
        </div>
        <div>
          5.Please choose one:
          <q-option-group
            :options="options5"
            type="radio"
            v-model="group5"
          />
        </div>
        <div>
          6.Please choose one:
          <q-option-group
            :options="options6"
            type="radio"
            v-model="group6"
          />
        </div>
        <div>
          7.Please choose one:
          <q-option-group
            :options="options7"
            type="radio"
            v-model="group7"
          />
        </div>
        <div>
          8.Please choose one:
          <q-option-group
            :options="options8"
            type="radio"
            v-model="group8"
          />
        </div>
        <div>
          9.Please choose one:
          <q-option-group
            :options="options9"
            type="radio"
            v-model="group9"
          />
        </div>
        <div>
          10.Please choose one:
          <q-option-group
            :options="options10"
            type="radio"
            v-model="group10"
          />
        </div>
        <div>
          11.Please choose one:
          <q-option-group
            :options="options11"
            type="radio"
            v-model="group11"
          />
        </div>
        <div>
          12.Please choose one:
          <q-option-group
            :options="options12"
            type="radio"
            v-model="group12"
          />
        </div>
        <div>
          13.Please choose one:
          <q-option-group
            :options="options13"
            type="radio"
            v-model="group13"
          />
        </div>
        <div>
          14.Please choose one:
          <q-option-group
            :options="options14"
            type="radio"
            v-model="group14"
          />
        </div>
        <div>
          15.Please choose one:
          <q-option-group
            :options="options15"
            type="radio"
            v-model="group15"
          />
        </div>
        <div>
          16.Please choose one:
          <q-option-group
            :options="options16"
            type="radio"
            v-model="group16"
          />
        </div>
        <div>
          17.Please choose one:
          <q-option-group
            :options="options17"
            type="radio"
            v-model="group17"
          />
        </div>
        <div>
          18.Please choose one:
          <q-option-group
            :options="options18"
            type="radio"
            v-model="group18"
          />
        </div>
        <div>
          19.Please choose one:
          <q-option-group
            :options="options19"
            type="radio"
            v-model="group19"
          />
        </div>
        <div>
          20.Please choose one:
          <q-option-group
            :options="options20"
            type="radio"
            v-model="group20"
          />
        </div>
      </div>
      <q-btn style="width: 90%" color="secondary" :disable="isSubmit" @click="submit">
        Submit Data
      </q-btn>
      <q-dialog v-model="showAns">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h5">
              {{ name }}
            </div>
            <!-- <q-space />
            <q-btn icon="close" flat round dense v-close-popup /> -->
          </q-card-section>

          <q-card-section>
            The test result is：{{ score }}
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
      </q-dialog>
    </div>
  </q-page>
</template>

<style lang='sass' scoped>
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
      sex: 'boy',
      phone: '',
      email: '',
      date: '',
      time: '',
      timerID: '',
      group1: '',
      options1: [
        { label: 'I am always determined and resolute on my actions.', value: 'A' },
        { label: 'I am extremely enthusiastic at defending my motives.', value: 'B' }
      ],
      group2: '',
      options2: [
        { label: 'I like very harmonious situations.', value: 'C' },
        { label: 'I like to meet up with new friends.', value: 'B' }
      ],
      group3: '',
      options3: [
        { label: 'I like to plan for future.', value: 'C' },
        { label: 'I like to work in accordance with procedures.', value: 'D' }
      ],
      group4: '',
      options4: [
        { label: 'I am a creative person.', value: 'C' },
        { label: 'I am a person with initiative.', value: 'A' }
      ],
      group5: '',
      options5: [
        { label: 'I am friendly to everyone.', value: 'B' },
        { label: 'I always go in accordance with details and specifications.', value: 'D' }
      ],
      group6: '',
      options6: [
        { label: 'I always look for exceptional matters.', value: 'D' },
        { label: 'I like to think of alternatives.', value: 'C' }
      ],
      group7: '',
      options7: [
        { label: 'I like to guide people.', value: 'A' },
        { label: 'I like to check to ensure accuracy.', value: 'D' }
      ],
      group8: '',
      options8: [
        { label: 'I like to view certain matters with new approach.', value: 'C' },
        { label: 'I like to involve in organizations formed by a group of people.', value: 'B' }
      ],
      group9: '',
      options9: [
        { label: 'I consider myself a creative person.', value: 'C' },
        { label: 'I always emphasize on sense of control and sequence in my work.', value: 'D' }
      ],
      group10: '',
      options10: [
        { label: 'I like to do right things.', value: 'D' },
        { label: 'I like to do physical work.', value: 'A' }
      ],
      group11: '',
      options11: [
        { label: 'I always expect the best things to happen.', value: 'B' },
        { label: 'I like to work systematically.', value: 'D' }
      ],
      group12: '',
      options12: [
        { label: 'I like to imagine all kinds of possibility.', value: 'C' },
        { label: 'I like to be a dominant person.', value: 'A' }
      ],
      group13: '',
      options13: [
        { label: 'I am comfortable to work with others.', value: 'B' },
        { label: 'I always think independently.', value: 'C' }
      ],
      group14: '',
      options14: [
        { label: 'I am always friendly and warm-hearted towards others.', value: 'B' },
        { label: 'I am always energetic in achieving my goal.', value: 'A' }
      ],
      group15: '',
      options15: [
        { label: 'I may sacrifice my interest for certain beliet.', value: 'B' },
        { label: 'I like to do things in a well-ordered way.', value: 'D' }
      ],
      group16: '',
      options16: [
        { label: 'I like to think of new ideas.', value: 'C' },
        { label: 'I always do things with full excitement and vitality.', value: 'A' }
      ],
      group17: '',
      options17: [
        { label: 'I like to talk with others.', value: 'B' },
        { label: 'I like to follow specific procedures.', value: 'D' }
      ],
      group18: '',
      options18: [
        { label: 'I am a cautious person.', value: 'D' },
        { label: 'I like to accomplish certain matters.', value: 'A' }
      ],
      group19: '',
      options19: [
        { label: 'I am always ready to act.', value: 'A' },
        { label: 'I am always considerate and sympathetic.', value: 'C' }
      ],
      group20: '',
      options20: [
        { label: 'I like to talk with strangers.', value: 'B' },
        { label: 'I like to give out orders in most circumstances.', value: 'A' }
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
      // await this.axiosInstance.post('http://192.168.18.112:5000/v1/stores/set/saveData', {
      await this.axiosInstance.post('/v1/stores/set/saveData', {
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
          title: 'Warning',
          message: 'Your name has not been entered yet.',
          persistent: true
        })
        return
      }
      for (let i = 0, length = ans.length; i < length; i = i + 1) {
        if (ans[i] === '') {
          this.$q.dialog({
            title: 'Warning',
            message: 'Your answer for question number ' + (i + 1) + ' has not been entered.',
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
      const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const cd = new Date()
      this.time = week[cd.getDay()]
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        '/' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '/' +
        this.zeroPadding(cd.getDate(), 2) +
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
