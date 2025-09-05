<template>
  <q-btn outline icon-right="arrow_drop_down" color="white" :label="languageMap[i18n.locale]">
    <q-menu fit>
      <q-list style="min-width: 100px">
        <q-item
          clickable
          v-close-popup
          v-for="(value, key) in languageMap"
          :key="`AppLanguageDropdown-${key}`"
          @click="changeLang({ toLang: key })"
        >
          <q-item-section>
            {{ value }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="scss" scoped>
</style>

<script>
import _ from 'lodash'

export default {
  name: 'AppLanguageDropdown',
  data () {
    return {
      selectLang: this.i18n.locale
    }
  },
  methods: {
    changeLang ({ toLang }) {
      // 如果要切的語系，就是當前語系，就直接回家
      if (toLang === this.i18n.locale) {
        return
      }
      const path = this.$route.path
      // 是否語系包含在 path 中
      let isContainLangInPath = false
      // 從 path 取出的 lang
      let resultLang = this.defaultLocale
      _.forIn(this.languageMap, (value, key) => {
        const urlPathLang = _.split(path, '/')[1]
        const language = _.kebabCase(key)
        if (language === urlPathLang) {
          resultLang = key
          isContainLangInPath = true
        }
      })
      let resultPath = ''
      // 如果要切換的語系，不是預設語系
      if (toLang !== this.defaultLocale) {
        // 如果語系包含在 path 中
        if (isContainLangInPath) {
          // 將 path 中的 lang，置換成 要切換的 lang
          resultPath = _.replace(
            path,
            _.kebabCase(resultLang),
            _.kebabCase(toLang)
          )
        }
        // 如果語系不包含在 path 中
        if (!isContainLangInPath) {
          // 直接在 path 前面，加上要切換的 lang
          resultPath = `/${_.kebabCase(toLang)}${path}`
        }
      }
      // 如果要切換的語系，是預設語系
      if (toLang === this.defaultLocale) {
        // 如果語系包含在 path 中
        if (isContainLangInPath) {
          // 直接去除 path 前面的 lang
          resultPath = _.replace(
            path,
            `/${_.kebabCase(resultLang)}`,
            ''
          )
          if (!resultPath) {
            resultPath = '/'
          }
        }
        // 如果語系不包含在 path 中
        if (!isContainLangInPath) {
          // 沒這種狀況，因為這情況肯定本來就是預設語系
          return
        }
      }

      // this.$router.push(resultPath)

      // 不用 $router.push 換，而是用 location 來換
      // 是因為 preFetch 用 $router.push 換時，不會重新 fetch
      location = resultPath
    }
  }
}
</script>
