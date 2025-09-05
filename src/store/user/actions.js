// https://quasar.dev/quasar-plugins/web-storage#LocalStorage-API
import { LocalStorage } from 'quasar'

import { axiosInstance } from 'boot/axios'

export async function login (context, payload) {
  const { idToken, uid } = payload
  try {
    const { data } = await axiosInstance.get(`/v1/users/${uid}`)
    const user = data.user
    // if (!user.roleMap) {
    //   user.roleMap = {
    //     isManager: false,
    //     isAdmin: false,
    //     isSeller: false,
    //     bossesMap: {},
    //     staffsMap: {},
    //     sellersMap: {},
    //     leadersMap: {}
    //   }
    // }
    if (!user.newRoleMap) {
      user.newRoleMap = {
        isManager: false,
        isAdmin: false,
        isSeller: false,
        bossesMap: [],
        staffsMap: [],
        sellersMap: [],
        leadersMap: []
      }
    }
    context.commit('login', {
      idToken,
      detail: data.user
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function setIdToken (context, { idToken, uid, user }) {
  context.commit('setIdToken', { idToken, uid, user })
}

export function logout (context) {
  LocalStorage.remove('userInstance')
  context.commit('logout')
}

export function startLoging (context) {
  LocalStorage.set('isLoging', true)
  context.commit('startLoging')
}

export function stopLoging (context) {
  LocalStorage.remove('isLoging')
  context.commit('stopLoging')
}

export function setOtherUser (context, { user }) {
  context.commit('setOtherUser', { user })
}

export function setOtherUserNotFind (context, { uid }) {
  context.commit('setOtherUserNotFind', { uid })
}
