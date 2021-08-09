import request from '@/utils/request'

// 获取首页要展示的事件数
export function getEvents () {
  return request({
    url: '/getEvents',
    method: 'GET'
  })
}