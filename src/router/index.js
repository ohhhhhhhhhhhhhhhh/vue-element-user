import Vue from "vue";
import VueRouter from 'vue-router';
import container from '../components/container.vue'
import store from '../../store/index.js'
import Cookie from 'js-cookie'
import { certification } from '../api/certification.js'

Vue.use(VueRouter);

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};




//动态路由
const volunteer = [{
	path: '/volunteer',
	name: 'volunteer', // :index="'/' + item.name"
	authName: '志愿者动态组件',
	icon: 'el-icon-news', // 动态组件的icon
	component: () => import('@/components/volunteer')
}]

const villager = [{
	path: '/villager',
	name: 'villager', // :index="'/' + item.name"
	authName: '村居动态组件',
	icon: 'el-icon-menu', // 动态组件的icon
	component: () => import('@/components/villager')
}]

const villageBranch = [{
	path: '/villageBranch',
	name: 'villageBranch', // :index="'/' + item.name"
	authName: '村支部动态组件',
	icon: 'el-icon-tickets', // 动态组件的icon
	component: () => import('@/components/villageBranch')
}]

const townCommittee = [{
	path: '/townCommittee',
	name: 'townCommittee', // :index="'/' + item.name"
	authName: '乡镇党委动态组件',
	icon: 'el-icon-edit-outline', // 动态组件的icon
	component: () => import('@/components/townCommittee')
}]

const countyCommittee = [{
	path: '/countyCommittee',
	name: 'countyCommittee', // :index="'/' + item.name"
	authName: '县委动态组件',
	icon: 'el-icon-more-outline', // 动态组件的icon
	component: () => import('@/components/countyCommittee')
}]




const routes=[
	{
		path: "/login",
		component: () => import('@/components/login')
	},
	{
		path : '/signUp',
		component: () => import('@/components/signUp')
	},
	{
		path: "/home",
		component: container,
		children: [
			{
				path: '/home',
				component: () => import('@/components/home')
			},
			{
				path: '/monitor',
				component: () => import('@/components/monitor')
			},
			{
				path: '/search',
				component: () => import('@/components/search')
			},
			{
				path: '/analyze',
				component: () => import('@/components/analyze')
			},
			{
				path: '/paramsM',
				component: () => import('@/components/paramsM')
			},
			{
				path: '/paramsM',
				component: () => import('@/components/paramsM')
			},
			{
				path: '/familyM',
				component: () => import('@/components/familyM')
			},
			{
				path: '/sendM',
				component: () => import('@/components/sendM')
			},
			{
				path: '/pointM',
				component: () => import('@/components/pointM')
			},
			{
				path: '/orgM',
				component: () => import('@/components/orgM')
			},
			{
				path: '/userM',
				component: () => import('@/components/userM')
			},
			{
				path: '/famInfoM',
				component: () => import('@/components/famInfoM')
			},
			{
				path: '/rightsM',
				component: () => import('@/components/rightsM')
			},
			{
				path: '/ruleM',
				component: () => import('@/components/ruleM')
			}
			/*
			{
				path: '/volunteer',
				component: () => import('@/components/volunteer')
			}
			*/
		]
	},
	{
		path: '/pCenter',
		component: () => import('@/components/pCenter')
	},
	{
		path: '/accM',
		component: () => import('@/components/accM')
	},
	/*
	{
		path: '*',
		component: () => import('@/components/404')
	}
	*/
   {
   		path: '/edit',
   		component: () => import('@/components/editInfo')
   }
]

const router = new VueRouter({
	//mode: 'history',
	routes
})


// 路由导航守卫
// 目前的判断方式有漏洞，建议在进入路由之前比对token的值，而不是仅仅判断token是否存在，以及建议服务器后端在每次登录前都随机生成一个token，退出登录后销毁；前端（后端）15分钟无操作后，后端销毁token
router.beforeEach((to, from, next) => {
	//console.log(router.currentRoute);
	//console.log(window.location.href);
	//console.log(window.location.href.substring(window.location.href.length - 4));
	//console.log(from.path);
	let token = sessionStorage.getItem('token');
	let role = Cookie.get('role');
	let id = sessionStorage.getItem('username');
	let data = { // 三者的值必须和后端保持一致
		'token': token, // token，密钥
		'role': role, // 角色
		'id': id // id === username === 身份证号，primary key，用来匹配信息
	}

	if(!token){
		if(to.path==='/'){
			next('/login');
		}
		else if(to.path==='/login'){
			next();
		}
		else if(to.path==='/signUp' || to.path==='/signup'){ // 手动输入，大小写不敏感；点击按钮，触发push，则区分大小写
			next();
		}
		else{
			alert('请先登录！');
			next('/login');
		}
	}
	else{
		// 每次到达新的页面之前都会和后端进行验证交互，但页面响应速率明显下降了
		certification(data)
		.then(res=>{
			if(res.data){
				//console.log(res.data);
				if(to.path==='/'){ // 事实上，没有 / 页面，所以会先加载出404页面
					//alert('ok');
					next('/home'); // 也可以用redirect重定向写，不过目前这样方便些
				}
				else if(to.path==='/signup' || to.path==='/signUp'){ // 同样手动输入，大小写不敏感
					alert("请先退出登录！");
					router.back();
					//next(false);
				}
				else if(to.path==='/login'){
					alert("请先退出登录！");
					//next('/home');
					router.back(); // 当前不允许跳转，直接返回到上级页面
				}
				else if(to.path==='/edit' && from.path!=='/search'){ // 如果在地址栏中输入跳转，from.path === '/'成立
					//console.log(from.path);
					//console.log(currentRoutes);
					//alert('危险操作！');
					router.push('/search');
					console.log('非法操作');
					//next(false);
					//location.reload(); // 刷新
				}
				else{
					next();
				}
			}
			else{
				alert('非法操作！');
				sessionStorage.clear();
				Cookie.set('role','init');
				//console.log('ok');
				router.back(); // token || role || id被篡改
				location.reload(); // 刷新一下
			}
		})
		.catch(err=>{
			console.log('err');
		})
	}
})

export function initDynamicRoutes () {
	/*
  // console.log(router)
  // 根据二级权限 对路由规则进行动态的添加
  //console.log(currentRoutes)
  const currentRoutes = router.options.routes
  // currentRoutes[2].children.push()
  const rightList = store.state.rightList
  // console.log(rightList)
  rightList.forEach(item => { // 如果是没有子路由的话 就直接添加进去 如果有子路由的话就进入二级权限遍历
    // console.log(item, 'item-1')
		
    if (item.path) {
		//console.log(item.path)
      const temp = ruleMapping[item.path]
      // 路由规则中添加元数据meta
      temp.meta = item.rights
      currentRoutes[1].children.push(temp)
    }

    item.children.forEach(item => {
      // item 二级权限
      // console.log(item, 'item-2')
	  //console.log(item.path)
      const temp = ruleMapping[item.path]
      // 路由规则中添加元数据meta
      temp.meta = item.rights
      currentRoutes[1].children.push(temp)
    })
  })
  // console.log(currentRoutes)
  */
  //router.addRoutes(currentRoutes)
  //const role = sessionStorage.getItem('role');
  const role = Cookie.get('role'); // 防止sessionStorage被篡改（实际上，cookies也可以被篡改，因此请求拦截器也丧失了主要的作用，只能在路由导航守卫中同时验证token和role的正确性）
  //console.log(role);
  sessionStorage.setItem('rightList','null_rightList'); // 初始化
  
  if(role==='volunteer'){
	  sessionStorage.setItem('rightList',JSON.stringify(volunteer));
	  //sessionStorage.setItem('rightList',volunteer);
	  const currentRoutes = router.options.routes;
	  //console.log(JSON.stringify(currentRoutes))
	  //sessionStorage.setItem('currentRoutes',JSON.stringify(currentRoutes));
	  //console.log('before=>',currentRoutes[2].children)
	  //localStorage.setItem('currentRoutes', JSON.stringify(router.options.routes));
	  //console.log(currentRoutes);
	  //currentRoutes[2].children.push(volunteer[0]);
	  volunteer.forEach((item, index)=>{
		  currentRoutes[2].children.push(item);
	  })
	  //localStorage.setItem('currentRoutes', JSON.stringify(router.options.routes));
	  //const localRoutes = localStorage.getItem('currentRoutes');
	  //console.log(JSON.parse(localRoutes));
	  //router.addRoutes(JSON.parse(localRoutes));
	  router.addRoutes(currentRoutes);
	  //console.log('after=>',currentRoutes[2].children)
  }
  else if(role==='villager'){
	  sessionStorage.setItem('rightList',JSON.stringify(villager));
	  const currentRoutes = router.options.routes;
	  //currentRoutes[2].children.push(villager[0]);
	  villager.forEach((item, index)=>{
	  		  currentRoutes[2].children.push(item);
	  })
	  router.addRoutes(currentRoutes);
  }
  else if(role==='villageBranch'){
  	  sessionStorage.setItem('rightList',JSON.stringify(villageBranch));
  	  const currentRoutes = router.options.routes;
  	  //currentRoutes[2].children.push(villageBranch[0]);
	  villageBranch.forEach((item, index)=>{
	  		  currentRoutes[2].children.push(item);
	  })
  	  router.addRoutes(currentRoutes);
  }
  else if(role==='townCommittee'){
  	  sessionStorage.setItem('rightList',JSON.stringify(townCommittee));
  	  const currentRoutes = router.options.routes;
  	  //currentRoutes[2].children.push(townCommittee[0]);
	  townCommittee.forEach((item, index)=>{
	  		  currentRoutes[2].children.push(item);
	  })
  	  router.addRoutes(currentRoutes);
  }
  else if(role==='countyCommittee'){
  	  sessionStorage.setItem('rightList',JSON.stringify(countyCommittee));
  	  const currentRoutes = router.options.routes;
  	  //currentRoutes[2].children.push(countyCommittee[0]);
	  countyCommittee.forEach((item, index)=>{
	  		  currentRoutes[2].children.push(item);
	  })
  	  router.addRoutes(currentRoutes);
  }
  else{
	  //alert('非法操作！'); // 非法操作
  }
  
}

initDynamicRoutes(); // 解决刷新之后动态路由页面丢失问题

router.addRoutes([
	{
		path: '/404',
		component: () => import('@/components/404')
	},
	{
		path: '*',
		redirect: '/404'
	}
])


export default router