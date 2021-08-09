<template>
	<div>
	<el-container style="height: 1000px; border: 5px; solid #eeeeee; margin: -8px;">

		<!-- aside -->
		<el-aside width="250px" style="background-color: rgb(246, 246, 246); text-align: center;">

			<!-- :default-active="$route.path" 动态展示menu是否被选中 -->
			<el-menu background-color="rgb(246, 246, 246)" :default-openeds="['/configM','/securityM']" router text-color="black" active-text-color="#3a93ff" :default-active="$route.path" @open="handleOpen" @close="handleClose">
				
				<span class="asideTitle" style="background: linear-gradient(rgb(230, 246, 246), rgb(246, 246, 246)); display:block; height: 30px; margin-top: 3px;">保靖县</span>
				
				<!-- 首页 -->
				<el-menu-item index="/home">
					<template slot="title"><i class="el-icon-s-home"></i>首页</template>
				</el-menu-item>
				
				<!-- 任务监控 -->
				<el-menu-item index="/monitor">
					<template slot="title"><i class="el-icon-message"></i>任务监控</template>
				</el-menu-item>
				
				<!-- 报表查询 -->
				<el-menu-item index="/search">
					<template slot="title"><i class="el-icon-search"></i>报表查询</template>
				</el-menu-item>
				
				<!-- 统计分析 -->
				<el-menu-item index="/analyze">
					<template slot="title"><i class="el-icon-edit"></i>统计分析</template>
				</el-menu-item>
				
				
				
				
				
				
				
				<!-- 动态路由 -->
				    <!-- 一级菜单 -->
				    <el-submenu
				      :index="item.id + ''"
				      v-for="item in menulist"
				      :key="item.index"
				    >
				      <!-- 一级菜单的模板区域 -->
				      <template slot="title">
				        <!-- 图标 -->
				        <i style="padding-right: 10px" :class="item.icon"></i>
				        <!-- 文本 -->
				        <span>{{ item.authName }}</span>
				      </template>
				      <!-- 二级菜单 -->
				      <el-menu-item
				        :index="'/' + subItem.name"
				        v-for="subItem in item.children"
				        :key="subItem.index"
						@click="saveNavState('/' + subItem.name)"
				      >
				        <template slot="title">
				          <!-- 图标 -->
				          <i style="padding-right: 10px" :class="subItem.icon"></i>
				          <!-- 文本 -->
				          <span>{{ subItem.authName }}</span>
				        </template>
				      </el-menu-item>
				    </el-submenu>
				    <!-- 没有二级菜单的路由从这里循环 -->
				    <el-menu-item
				      :index="'/' + item.name"
				      v-for="item in itemlist"
				      :key="item.index"
					  @click="moveInto(item.path);saveNavState('/' + item.name)"
				    >
				      <template slot="title">
				        <!-- 图标 -->
				        <i style="padding-right: 10px" :class="item.icon"></i>
				        <!-- 文本 -->
				        <span>{{ item.authName }}</span>
				      </template>
				    </el-menu-item>
				
				
				
				
				
				
				
				

				<!-- 配置管理 -->
				<el-submenu index="/configM">
					<template slot="title"><i class="el-icon-setting"></i>配置管理</template>
					<el-menu-item-group>
						<template slot="title"></template>
						<el-menu-item index="/paramsM">参数配置</el-menu-item>
						<el-menu-item index="/familyM">联户配置</el-menu-item>
						<el-menu-item index="/sendM">派单规则配置</el-menu-item>
						<el-menu-item index="/pointM">积分规则配置</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				
				<!-- 权限安全管理 -->
				<el-submenu index="/securityM">
					<template slot="title"><i class="el-icon-tickets"></i>权限安全管理</template>
					<el-menu-item-group>
						<template slot="title"></template>
						<el-menu-item index="/orgM">组织机构管理</el-menu-item>
						<el-menu-item index="/userM">用户管理</el-menu-item>
						<el-menu-item index="/famInfoM">家庭信息管理</el-menu-item>
						<el-menu-item index="/rightsM">数据权限管理</el-menu-item>
						<el-menu-item index="/ruleM">角色管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>			
			</el-menu>
		</el-aside>
		
		<!-- header, main -->
		<el-container>
			<!-- header -->
			<span class="hTitle" title="欢迎使用" style="display: block; background: linear-gradient(rgb(240, 245, 246), rgb(252, 254, 255)); height: 40px; margin-top: 3px;">五个到户智能管理系统</span>
			<el-header class="header">
				<el-dropdown>
					<i class="el-icon-search" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>搜索</el-dropdown-item>
						<el-dropdown-item>帮助</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown>
					<i class="el-icon-user-solid" style="margin-right: 15px">你好，{{name}}</i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="pCenter()">个人中心</el-dropdown-item>
						<el-dropdown-item @click.native="accM()">账号管理</el-dropdown-item>
						<el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			
			<!-- main -->
			<el-main>
				<router-view></router-view>
			</el-main>
			
		</el-container>
		
	</el-container>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		name: 'container',
		data(){
			return{
				// 左侧菜单数据
				menulist: [], // 有子菜单的
				itemlist: [], // 没有子菜单的
				// 用户姓名
				name: sessionStorage.getItem('name')
			}
		},
		watch: {
			
		},
		computed: {
			...mapState(['rightList']) // 映射
		},
		beforeRouteLeave(to, from, next) {
			//console.log('beforeRouteLeave');
			//this.menulist = null;
			//this.itemlist = null; // 内存溢出的罪魁祸首
			this.name = null;
			//CollectGarbage();
			//console.log(this.myMap);
			next();
		},
		methods:{
			pCenter(){
				this.$router.push('/pCenter');
			},
			accM(){
				this.$router.push('/accM');
			},
			logout(){
				this.$message.success('退出登录');
				sessionStorage.clear();
				localStorage.clear();
				this.$router.push('/login');
			},
			handleOpen (key, keyPath) {
			  //console.log(key, keyPath)
			},
			handleClose (key, keyPath) {
			  //console.log(key, keyPath)
			},
			saveNavState (activePath) {
			},
			moveInto(path){
				//console.log(path);
				//this.$router.push(path).catch(err => { console.log(err) });
			}
		},
		created () {
			//console.log(this.$router.options.routes[2])
			// 初始化menulist菜单栏的数据
			// this.menulist = this.rightList
			// 将有子选项的和没子选项的筛选一下 有子选项的赋值给menulist 没有子选项的赋值给itemlist
			//console.log(rightList)
			if(sessionStorage.getItem('rightList')==='null_rightList'){
				return; // 没有要动态加载的路由
			}
			let rightList = JSON.parse(sessionStorage.getItem('rightList'));
			//console.log(rightList.length);
			//console.log('hi')
			//console.log(this.rightList.length);
			for (var i = 0, j = 0, k = 0; i < rightList.length; i++) {
			  // console.log(this.rightList[i].children.length)
			  if (rightList[i].children) {
			    this.menulist[j] = rightList[i]
			    j = j + 1
			  } else {
			    this.itemlist[k] = rightList[i]
			    k = k + 1
			  }
			}
			//rightList = null;
		}
	}
</script>

<style>
	.hTitle{
		text-align: center;
		font-size: 26px;
		font-weight: bold;
		color: #0da8ef;
	}
	.asideTitle{
		color: royalblue;
		text-align: center;
		font-size: 20px;
	}
	.header{
		text-align: right;
		font-size: 15px;
	}
	/*
	.el-menu-item.is-active {
	   background-color: rgb(231, 235, 240) !important;
	}
	*/
</style>
