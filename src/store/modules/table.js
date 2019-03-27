import { getList, addMembers, deleteMembers, getDetail, editMembers, allowAccess, importExcelFile, downLoadExcelFile } from '@/api/table'

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
    UPDATE_MEMBERS_STATUS: (state, data) => {
      state.editStatus = data
  },
    DELETE_MEMBERS_STATUS: (state, data) => {
      state.deleteStatus = data
    },
    ALLOW_ACCESS_STATUS: (state, data) => {
      state.allowAccessStatus = data
    },
    SET_COMPANY_DATA: (state, data) => {
      state.companyData = data
    },
    IMPORT_EXCEL_FILE: (state, data) => {
      state.excelFile = data
    },
    DOWNLOAD_EXCEL_FILE: (state, data) => {
      state.loadExcelUrl = data
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
    StoreCurCompanyData({ commit }, params) {
      return new Promise(resolve => {
        commit('SET_COMPANY_DATA', params)
        resolve(params)
      })
    },
    GetDetail({ commit }, params) {
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
    },
    EditMembers({ commit }, params) {
      return new Promise(resolve => {
          editMembers(params).then( res => {
              commit('UPDATE_MEMBERS_STATUS', res.data)
              resolve(res)
          })
      })
    },
    DeleteMembers({ commit }, params) {
      return new Promise(resolve => {
          deleteMembers(params).then( res => {
              commit('DELETE_MEMBERS_STATUS', res.data)
              resolve(res)
          })
      })
    },
    AllowAccess({ commit }, params) {
      return new Promise(resolve => {
        allowAccess(params).then( res => {
              commit('ALLOW_ACCESS_STATUS', res.data)
              resolve(res)
          })
      })
    },
    ImportExcel({ commit }, params) {
      return new Promise(resolve => {
        importExcelFile(params).then( res => {
              commit('IMPORT_EXCEL_FILE', res.data)
              resolve(res)
          })
      })
    },
    DownloadExcelFile({ commit }, params) {
      return new Promise(resolve => {
        downLoadExcelFile(params).then( res => {
              commit('DOWNLOAD_EXCEL_FILE', res.data)
              resolve(res)
          })
      })
    }
  }
}

export default table
