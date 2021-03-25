import Vue from 'vue'
import Vuex from 'vuex'

import participants from './modules/participants'
import messagesBox from './modules/messagesBox'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    participants,
    messagesBox
  }
})
