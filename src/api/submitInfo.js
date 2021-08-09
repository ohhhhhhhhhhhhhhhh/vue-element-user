import request from '@/utils/request'


export function submitInfo(data){
	return request ({
		url: '/signUp',
		method: 'POST',
		data: data
	})
}	