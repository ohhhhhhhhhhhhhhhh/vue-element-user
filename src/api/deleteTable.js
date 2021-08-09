import request from '@/utils/request'

// 删除表格-行数据
export function deleteTable (data) {
  return request({
    url: '/deleteTable',
    method: 'POST',
    data: data
  })
}