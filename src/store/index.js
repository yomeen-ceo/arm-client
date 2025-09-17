import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import user from './user'
import cart from './cart'
import aboutPage from './aboutPage'
import countries from './countries'
import stores from './stores'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      user,
      cart,
      aboutPage,
      countries,
      stores
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
