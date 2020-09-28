import Vue from 'vue'
import Vuex from 'vuex'
import client from '../api/client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  mutations: {
    setLoggedIn (state) {
      state.isLoggedIn = true
    },
    logout (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        client.post('/login', data)
          .then(resp => {
            const token = resp.data.accessToken
            localStorage.setItem('token', token)
            commit('setLoggedIn')
            resolve(resp)
          })
          .catch(err => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
      })
    }
  },
  getters: {},
  modules: {}
})
