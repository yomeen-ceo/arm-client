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

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
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
            name: 'home'
          }"
        >
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              清單模式
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <app-loging /> -->

    <app-portrait-tip class="lt-md orientation-portrait" />
  </q-layout>
</template>

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
      rightDrawerOpen: false
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
