<template>
  <div> 
    <div class="register-wrapper"> 
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
		  <el-form-item prop="id">
		    <el-input v-model="ruleForm2.id" auto-complete="off" placeholder="请输入身份证号"></el-input>
		  </el-form-item>
		  <el-form-item prop="usrname">
		    <el-input v-model="ruleForm2.usrname" auto-complete="off" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item prop="tel">
		    <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号" :disabled="tel_disabled"></el-input>
		  </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script> 
import axios from 'axios';
import {submitTel} from '../api/submitTel.js'
import {submitInfo} from '../api/submitInfo.js'
export default {
  name: "Register", 
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
	
	// 验证身份证号码输入是否正确
	let checkId = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请输入身份证号码'))
		} else if (!this.checkIdentity(value)) {
		  callback(new Error('身份证号码不合法'))
		} else {
		  callback()
		}
	}
	
	// 验证用户名输入是否正确
	let checkUsrName = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请输入用户名'))
		} else {
		  callback()
		}
	}
	
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    return {  
      ruleForm2: {
		  id: "530124197312202026",
		  usrname: "张三",
        pass: "123456",
        checkPass: "123456",
        tel: "15352236291",
        smscode: "9527"
      },
      rules2: {
		  id: [{ validator: checkId, trigger: 'change' }],
		  usrname: [{ validator: checkUsrName, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
	  tel_disabled: false
    }
  }, 
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
		  
		  // 调用函数，发送验证码
		  let formTel={'tel':tel};
		  //console.log(formTel,'=>',tel)
		  submitTel(formTel)
		  .then(res=>{
			  if(res.data.code==-1){
				  this.$message.error('手机号已被注册！');
				  return;
			  }
		  })
		  .catch(err=>{
			  console.log(err);
		  })
		  this.$message.success('已发送请注意查收！');
		  

        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
		this.tel_disabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
	  else{
		  this.$message.error('请输入手机号！');
	  }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
			  
			  let info = this.ruleForm2;
			  submitInfo(info)
			  .then(res=>{
				  //console.log(res);
				  if(res.data.identity_status === -1){
					  this.$message.error("身份证号已被注册！");
					  return;
				  }
				  else if(res.data.code_status === -1){
					  this.$message.error("验证码错误！");
					  return;
				  }
				  else{
					  const note = this.$notify({
					            title: '注册成功',
					            message: '请登录您的账号！',
					            type: 'success',
					          });
						setTimeout(()=>{
							note.close();
						},3000); // 3秒后自动关闭这条notify
						
					  this.$router.push('/login');
				  }
			  })
			  .catch(err=>{
				  console.log(err);
			  })
			  
            this.$message.success('提交成功！');
          }, 400);
        } else {
          this.$message.error("提交失败！");
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
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
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>