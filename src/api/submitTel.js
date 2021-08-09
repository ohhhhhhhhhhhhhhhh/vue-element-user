import request from '@/utils/request'


export function submitTel(tel){
	return request ({
		url: '/verifyCode',
		method: 'POST',
		data: tel
	})
}	