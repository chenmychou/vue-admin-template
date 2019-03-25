import { getList, addMembers, deleteMembers, getDetail } from '@/api/table'

const table = {
  state: {
    items: [],
    listQuery: {
        page: 1,
        pageSize: 10
    },
    total: 0,
    detailData: {},
    addStatus: {}
  },

  mutations: {
    SET_TOTAL: (state, total) => {
      state.total = total
    },
    SET_LIST_QUERY: (state, listQuery) => {
      state.listQuery = listQuery
    },
    SET_ITEMS: (state, items) => {
      state.items = items
    },
    SET_DETAIL_DATA: (state, data) => {
        state.detailData = data
    },
    SET_MEMBERS_STATUS: (state, data) => {
        state.addStatus = data
    },
  },

  actions: {
    // 列表
    GetList({ commit }, params) {
      return new Promise(resolve => {
        getList(params).then( res => {
            let listQuery = {
                page: res.data.page,
                pageSize: res.data.pageSize
            }
            commit('SET_TOTAL', res.data.total)
            commit('SET_LIST_QUERY', listQuery)
            commit('SET_ITEMS', res.data.datas)
            resolve(res)
        })
      })
    },
    GetDeail({ commit }, params) {
        return new Promise(resolve => {
          getDetail(params).then( res => {
              commit('SET_DETAIL_DATA', res.data)
              resolve(res)
          })
        })
    },
    AddMembers({ commit }, params) {
        return new Promise(resolve => {
            addMembers(params).then( res => {
                commit('SET_MEMBERS_STATUS', res.data)
                resolve(res)
            })
        })
    }
  }
}

export default table
