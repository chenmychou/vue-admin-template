import request from '@/utils/request'

export function getList(params) {
  // 列表
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.listQuery
  })
}
export function addMembers(params) {
  // 添加
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function editMembers(params) {
  // 编辑
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function deleteMembers(params) {
  // 删除
  return request({
    url: params.fetchUrl,
    method: params.type ? params.type : "get",
    data: params.data
  })
}
export function getDetail(params) {
  // 详情
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function allowAccess(params) {
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function downLoadExcelFile(params) {
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function importExcelFile(params) {
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.data
  })
}
export function storeAboutUs(params){
  return request({
    url: '/sys/config/saveIntroduce',
    method: "post",
    data: {
      content: params.content
    }
  })
}