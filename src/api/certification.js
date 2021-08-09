import request from '@/utils/request'

// 检测用户的token和role
export function certification (data) {
  return request({
    url: '/certification',
    method: 'POST',
    data: data
  })
}