import request from '@/utils/request'

// 上传edit页面信息
export function upload (data) {
  return request({
    url: '/edit',
    method: 'POST',
    data: data
  })
}