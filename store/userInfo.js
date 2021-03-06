// 当前用户信息
import { getUserInfoByToken } from '@/api/user'

import { getToken, clearToken } from '@/tool'

export const state = () => ({
  username: '',
  avatar: '',
  admin: false,
  id: '',
  email: '',
  loadingStatus: 0
})

export const getters = {
  info (state) {
    return {
      id: state.id,
      username: state.username,
      admin: state.admin,
      avatar: state.avatar,
      email: state.email
    }
  }
}

export const actions = {
  getUserInfo (context, data = {}) {
    if (!data.force && this.loadingStatus) return

    if (getToken()) {
      this.loadingStatus = 1
      return getUserInfoByToken().then(res => {
        if (res.status === 200) {
          context.commit('setInfo', res.data)
          this.loadingStatus = 2
          return true
        } else {
          this.loadingStatus = 0
          return false
        }
      }).catch(error => {
        this.loadingStatus = 0
        clearToken()
      })
    }
  }
}

export const mutations = {
  setInfo (state, data) {
    for (let key in data) {
      state[key] = data[key]
    }
  },
  clearInfo (state) {
    state.username = ''
    state.avatar = ''
    state.admin = false
    state.id = ''
    state.email = ''
  }
}
