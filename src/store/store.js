import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: undefined,
    uid: undefined,
    username: undefined,
    token: undefined,
    type: undefined,
    permission: undefined,
    page: 1,
    pageSize: 10,
    total: undefined

  },
  mutations: {
    setUserId(state, val) {
      state.id = val;
    },
    setUserUId(state, val) {
      state.uid = val;
    },
    setUserName(state, val) {
      state.username = val;
    },
    setToken(state, val) {
      state.token = val;
    },
    setUserType(state, val) {
      state.type = val;
    },
    setUserPermission(state, val) {
      state.permission = val;
    },
    setPage(state, val) {
      state.page = val
    },
    setPageSize(state, val) {
      // console.log(val)
      state.pageSize = val
    },
    setTotal(state, val) {
      state.total = val
    }

  },
});
