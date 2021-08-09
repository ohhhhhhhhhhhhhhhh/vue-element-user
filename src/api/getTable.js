import request from '@/utils/request'

// 获取表格
export function getTable () {
  return request({
    url: '/getTable',
    method: 'GET',
  })
}

// 筛选获取表格
export function getTableChanged (data) {
  return request({
    url: '/getTable',
    method: 'POST',
	data: data
  })
}