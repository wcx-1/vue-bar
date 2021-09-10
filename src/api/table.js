import request from '@/utils/request'
// 表格数据的来源
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
