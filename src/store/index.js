import Vue from 'vue'
import Vuex from 'vuex'
import client from '../api/client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: {}
  },
  mutations: {
    setLoggedIn (state) {
      state.isLoggedIn = true
    },
    logout (state) {
      state.isLoggedIn = false
    },
    setUser (state, user) {
      state.user = user
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
    register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        client.post('/signup', data)
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
    },
    getUser ({ commit }) {
      return new Promise((resolve, reject) => {
        client.get('/tenant')
          .then((response) => {
            commit('setUser', response.data)
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        client.put('/tenant', data)
          .then((response) => {
            commit('setUser', response.data)
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {},
  modules: {}
})
