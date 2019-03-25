import request from '@/utils/request'

export function getList(params) {
  // 问题反馈
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
export function deleteMembers(params) {
  // 删除
  return request({
    url: params.fetchUrl,
    method: 'post',
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