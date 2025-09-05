import { axiosInstance } from 'boot/axios'
import { Cookies, extend } from 'quasar'

import { defaultAvatar } from '../../../config'

export function login (state, payload) {
  const { idToken, detail = {} } = payload
  const tempDetail = extend(true, {}, detail)
  if (!tempDetail.photoURL) {
    tempDetail.photoURL = defaultAvatar
  }
  if (tempDetail.signature === null) {
    tempDetail.signature = ''
  }
  state.isLoggedIn = true
  state.idToken = idToken
  state.detail = tempDetail
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${idToken}`
  if (process.env.CLIENT) {
    const __session = Cookies.get('__session') || {}
    __session.idToken = idToken
    Cookies.set('__session', __session, { path: '/' })
  }
}

export function setIdToken (state, { idToken, uid, user }) {
  state.idToken = idToken
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${idToken}`
  if (process.env.CLIENT) {
    const __session = Cookies.get('__session') || {}
    __session.idToken = idToken
    __session.uid = uid
    __session.user = user
    Cookies.set('__session', __session, { path: '/' })
  }
}

export function logout (state) {
  if (state.detail.uid) {
    const { uid, ...elseData } = state.detail
    state.otherUserMap[uid] = elseData
  }
  state.isLoggedIn = false
  state.idToken = null
  state.detail = {}
  delete axiosInstance.defaults.headers.common.Authorization
  if (process.env.CLIENT) {
    const __session = Cookies.get('__session') || {}
    delete __session.idToken
    delete __session.uid
    Cookies.set('__session', __session, { path: '/' })
  }
}

export function startLoging (state) {
  state.isLoging = true
}

export function stopLoging (state) {
  state.isLoging = false
}

export function setOtherUser (state, { user }) {
  const { uid, ...elseData } = user
  state.otherUserMap[uid] = elseData
}

export function setOtherUserNotFind (state, { uid }) {
  state.otherUserMap[uid] = {
    isNotFind: true
  }
}
