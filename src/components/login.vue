<template>
  <!-- 头部盒子 -->
  <div class="header">
    <!-- 标题区域 -->
    <div class="Inner-header">
			
      <div class='register-wrapper'>
        <h1>Hello!</h1>
        <h2>欢迎使用信息管理系统!</h2>
        <el-form class="login-form" ref="form" :model="form" status-icon :rules="rules2" label-width="0">
          <el-form-item prop="username">
            <el-input auto-complete="off" placeholder="请输入身份证号码:" v-model="form.username" @keyup.enter.native="onLogin()"></el-input>
          </el-form-item>
          <el-form-item prop="password">
			  <!-- prop要和v-model中的命名一致  -->
            <el-input auto-complete="off" placeholder="请输入密码:" type="password" v-model="form.password" show-password @keyup.enter.native="onLogin()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width: 100%" @click.native="onLogin">登 录</el-button>
		  </el-form-item>
		  <el-form-item>
			  <span @click="signUp" style="cursor: pointer;color: #f1ebe6;font-size: 0.75rem;text-align: left;">注册账号</span>
			  <span @click="forgetPSD" style="cursor: pointer;color: #f1ebe6;font-size: 0.75rem;margin-left: 5px;">忘记密码</span>
		  </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 波浪区域 -->
    <div>
      <!-- svg形状 -->
      <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <!-- 形状容器 -->
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <!-- 组合形状 -->
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { login } from '../api/user.js'
import Cookie from 'js-cookie'
import { initDynamicRoutes } from '../router/index.js'
export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
	  // 验证用户名/身份证号输入是否正确
	  let checkUsrName = (rule, value, callback) => {
	  	if (value === '') {
	  	  callback(new Error('请输入身份证号码'))
	  	} else if (!this.checkIdentity(value)) {
	  	  callback(new Error('身份证号码不合法'))
	  	} else {
	  	  callback()
	  	}
	  }
	  // 验证密码输入是否正确
	  let checkPass = (rule, value, callback) => {
	  	if (value === '') {
	  	  callback(new Error('请输入密码'))
	  	} else {
	  	  callback()
	  	}
	  }
    return {
      form: {
        username: '530124197312202026',
        password: '123456'
      },
	  rules2: {
	  		  password: [{ validator: checkPass, trigger: 'change' }],
	  		  username: [{ validator: checkUsrName, trigger: 'change' }]
			  },
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
	  sessionStorage.clear();
  },
  mounted () {
	  /*
	  // 实现按下回车键后登录
	  var that = this
	  document.onkeydown = () => {
	    var key = window.event.keyCode
	    // console.log(key)  13 是回车键
	    if (key === 13) {
	      that.onLogin()
	    }
	  }
	  */
  },
  methods: {
    onLogin () {
      this.loading = true
      login(this.form)
	  .then(res => {
        //console.log('login=>res', res)
		if (res.data === 'user_error') { // 数据库中没有匹配到该账号信息
			  this.$message.error('账号或密码错误，请重新输入！')
			  //this.$message.success('ok')
			  //router.push('/login')
			  sessionStorage.clear()
			  //location.reload() // 页面刷新
			  this.loading = false;
			  //return;
		}
		else{
			// 将用户身份存入vuex 普通用户身份: student 管理员用户身份: admin
			this.$store.commit('setRole', res.data.role)
			Cookie.set('role', res.data.role) // 存到Cookies中
			//密码可以不用缓存了
			this.$store.commit('setUsername', res.data.username)
			this.$store.commit('setPhoto', res.data.photo)
			sessionStorage.setItem('token', res.data.token) // 把token存入sessionStorage
			sessionStorage.setItem('name', res.data.name)
			//console.log(res.data)
			this.loading = false
			this.$message.success('登录成功')
	/*
			getRoles(res.data.role)
			.then(ret => {
			  // console.log(ret.data, 'getRoles=>ret.data')
			  // 将对应身份下的路由存储到vuex
			  this.$store.commit('setRightList', ret.data)
			  // 根据用户所具备的权限 动态添加路由规则
			  initDynamicRoutes()
			})
			.catch(error => {
				console.log(error)
			  })
	*/		  
			//console.log(res.data)
			//this.$store.commit('setRightList', res.data)
			initDynamicRoutes()
			this.$router.push('/home')
		}
		  })
      .catch(error => {
		  console.log(error)
      })
    },
	signUp(){
		this.$router.push('/signUp');
	},
	forgetPSD(){
		this.$message.warning('功能暂未开发');
	},
	//验证身份证号
	checkIdentity(cid) {
			var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
			var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
		    if(/^\d{17}\d|x$/i.test(cid)){
		        var sum = 0, idx;
		        for(var i = 0; i < cid.length - 1; i++){
		            // 对前17位数字与权值乘积求和
		            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
		        }
		        // 计算模（固定算法）
		        idx = sum % 11;
		        // 检验第18为是否与校验码相等
		        return arrValid[idx] == cid.substr(17, 1).toUpperCase();
		    }else{
		        return false;
		    }
	}
  }
}
</script>

<style scoped lang="less">
	.register-wrapper img {
	  position: absolute;
	  z-index: 1;
	}
.header {
  position: relative;
  // text-align: center;
  /* 背景渐变 */
  background: linear-gradient(60deg,rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color: wheat;
  margin: -8px; // 解决白边框问题
  .Inner-header {
    height: 65vh;
    width: 100%;
    /* flex */
    /* 垂直居中 */
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    h1 {
      font-family: 'Lato','sans-serif';
      font-weight: 300;
      /* font-spacing:2px; */
      font-size: 48px;
    }
    h2 {
      font-family: 'Lato','sans-serif';
      font-weight: 300;
      /* font-spacing:2px; */
      font-size: 28px;
    }
    .login-form {
      width: 300px;
      padding-top: 30px;
    }
  }
  .waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /* 最小值 */
    min-height: 100px;
    /* 最大值 */
    max-height: 150px;
    .parallax>use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    /* 选择的一个use */
    .parallax>use:nth-child(1) {
      /* 延迟 2s 执行 */
      animation-delay: -2s;
      /* 7s 内 执行完毕 */
      animation-duration: 7s;
    }
    .parallax>use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    .parallax>use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax>use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
}
/* 动画 */
@keyframes move-forever {
  0% {
        transform: translate3d(-90px,0,0);
    }
  100% {
      transform: translate3d(85px,0,0);
  }
}
/* 当屏幕小于 768px 执行 */
@media (max-width : 768px) {
  .waves {
      height: 40px;
      min-height: 40px;
  }
  h1   {
      font-size: 24px;
  }
}
/deep/ .el-input__inner {
  background-color: rgba(255,255,255,0.7);
  border-radius: 0;
  border: 1px solid #0094ff;
  color: rgba(0, 0, 0, .7)
}
/deep/ .el-input__inner::placeholder {
  color: rgba(0, 0, 0, .3)
}
/deep/ .el-button {
  border-radius: 0;
}
</style>