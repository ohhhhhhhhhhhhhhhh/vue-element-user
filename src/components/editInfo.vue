<template>
	<div>
		<meta name="referrer" content="no-referrer"/>
		<div style="margin-left: 100px; margin-top: 50px;">
			<el-page-header @back="close()" content="编辑页面">
			</el-page-header>
		</div>
		<h1 style="text-align: center; margin-top:50px; font-family: 'arial, helvetica, sans-serif';">走访详情</h1>
		<div style="margin: 20px;"></div>
		<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="margin-left: 150px; margin-right: 150px; margin-top: 50px;">
			
			<el-form-item prop="volunteer" class="form-item">
			    <span slot="label">
			        <span class="span-box">
			            <i class="el-icon-user"></i>
			            <span> 志愿者： </span>
			        </span>
			    </span>
				<el-input placeholder=" * 必填项 " v-model="formLabelAlign.volunteer"></el-input>
			</el-form-item>
			
			<el-form-item prop="date" class="form-item">
			    <span slot="label">
			        <span class="span-box">
			            <i class="el-icon-time"></i>
			            <span> 走访时间： </span>
			        </span>
			    </span>
				<el-input placeholder=" * 必填项（格式为yyyy-mm-dd）" v-model="formLabelAlign.date"></el-input>
			</el-form-item>
		  
		  <el-form-item prop="host" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-key"></i>
		              <span> 户主： </span>
		          </span>
		      </span>
		  	<el-input placeholder=" * 必填项 " v-model="formLabelAlign.host"></el-input>
		  </el-form-item>
		  
		  <el-form-item prop="location" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-location"></i>
		              <span> 行政区域： </span>
		          </span>
		      </span>
		  	<el-input placeholder=" * 必填项 " v-model="formLabelAlign.location"></el-input>
		  </el-form-item>
		  
		  <el-form-item prop="type" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-connection"></i>
		              <span> 走访类型： </span>
		          </span>
		      </span>
		  	<el-input placeholder=" * 必填项 " v-model="formLabelAlign.type"></el-input>
		  </el-form-item>
		  
		  <el-form-item prop="famType" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-s-home"></i>
		              <span> 家庭类型： </span>
		          </span>
		      </span>
		  	<el-input placeholder=" * 必填项 " v-model="formLabelAlign.famType"></el-input>
		  </el-form-item>

		  <el-form-item prop="content" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-chat-line-round"></i>
		              <span> 走访内容： </span>
		          </span>
		      </span>
		  	<el-input type="textarea" autosize v-model="formLabelAlign.content"></el-input>
		  </el-form-item>
		 
		  <el-form-item prop="urls" class="form-item">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-camera"></i>
		              <span> 走访照片： </span>
		          </span>
		      </span>
		  	<div align="center" style="margin-top: 20px; margin-bottom: 40px;">
		  					
		  					<el-popover
		  					    placement="top-start"
		  					    title="提示:"
		  					    trigger="hover"
		  					    content="点击单张图片可以进行删除操作；误选请刷新页面以撤销操作。">
		  						<el-button circle slot="reference" type="info" icon="el-icon-bell"></el-button>
		  					  </el-popover>
		  					
		  	</div>
		  	<div class="demo-image__lazy" style="width: 80%;text-align: center;margin: 0 auto;align-items: center;justify-content: center;vertical-align: middle;">
		  	  <el-image v-for="url in this.urls" :key="url" :src="url" lazy title="走访图片(点击可以进行删除操作)" @click='editPhoto(url)'>
		  						<div slot="placeholder" class="image-slot">
		  		        <i class="el-icon-loading"></i>加载中
		  		    </div>
		  		    <div slot="error" class="image-slot">
		  		        <i class="el-icon-picture-outline"></i>
		  						</div>
		  	  </el-image>
		  	</div>
		  </el-form-item>
		  
		  
		  
		  <el-form-item prop="deletePhoto" class="form-item" v-show="showDelete">
		      <span slot="label">
		          <span class="span-box">
		              <i class="el-icon-delete"></i>
		              <span> 照片回收站： </span>
		          </span>
		      </span>
		  	<div class="demo-image__lazy" style="width: 40%; display: flex; text-align: center; vertical-align: middle; justify-content: center; align-items: center; margin: 0 auto; margin-top: 40px;">
		  	  <el-image v-for="url in this.formLabelAlign.deletePhoto_list" :key="url" :src="url" lazy title="删除队列">
		  						<div slot="placeholder" class="image-slot">
		  		        <i class="el-icon-loading"></i>加载中
		  		    </div>
		  		    <div slot="error" class="image-slot">
		  		        <i class="el-icon-picture-outline"></i>
		  						</div>
		  	  </el-image>
		  	</div>
		  </el-form-item>

		</el-form>
		
		<div v-show="showDelete" align="center" style="margin-top: 40px;">
			<el-popover
			    placement="top-start"
			    title="照片回收站:"
			    trigger="hover"
			    content="恢复全部。">
				<el-button circle slot="reference" type='primary' icon='el-icon-refresh-left' @click.native="refresh()"></el-button>
			  </el-popover>
		</div>
		
		
<el-upload
  style="text-align: center; margin-top: 80px; margin-bottom: 10px;"
  class="upload-demo"
  drag
  :auto-upload="false"
  action="#"
  multiple
  :on-change = "handleChange"
  :on-remove = "handleRemove"
  :file-list = "fileList"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">若要添加照片，将其拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件，且不超过10MB</div>
</el-upload>
		
		
		
		
		
		
<el-backtop></el-backtop>
	
		<div align="center" style="margin-bottom: 100px; margin-top: 60px;">
			
			<el-popover
			    placement="top-start"
			    title="提示:"
			    trigger="hover"
			    content='点击"提交"按钮可以保存更改。'>
				<el-button slot="reference" type="danger" @click.native="submit()" :disabled="submitDisa">提交</el-button>
			  </el-popover>

			<el-button type="success" @click.native="close()" style="margin-left: 30px;">返回</el-button>
		</div>
	</div>

</template>

<script>
	import { upload } from '../api/upload.js'
	import Cookie from 'js-cookie'
	export default {
	    data() {
	        return {
				showDelete: false,
				submitDisa: false,
				fileList: [],
				labelPosition: 'top',
				urls:[],
				formLabelAlign: {
						  'id': "", // 当前用户的身份证号
						  'role': "",
				          'volunteer': "",
				          'date': "",
				          'host': "",
				          'famType': "",
						  'content': "",
						  'deletePhoto_list': [], // 用户要删除的照片url
						  'location': "",
						  'type': "",
						  'file': new FormData // 用户要上传的文件
				        }
	        };
	    },
		created() {
			let role = Cookie.get('role');
			//const role = sessionStorage.getItem('role');
			if(role === 'villager'){ // 村居只可以查看数据
				this.submitDisa = true;
			}
			role = null;
			let detail = JSON.parse(sessionStorage.getItem('detail'));
			//console.log(detail.detail.photo);
			this.formLabelAlign.volunteer = detail.volunteer;
			this.formLabelAlign.date = detail.detail.date;
			this.formLabelAlign.host = detail.villager;
			this.formLabelAlign.famType = detail.detail.famType;
			this.formLabelAlign.content = detail.detail.content;
			this.urls = detail.detail.photo;
			this.formLabelAlign.location = detail.district;
			this.formLabelAlign.type = detail.type;
			this.formLabelAlign.id = sessionStorage.getItem('username');
			this.formLabelAlign.role = sessionStorage.getItem('role');
			
			detail = null;
		},
		beforeRouteLeave(to, from, next) {
			//console.log('beforeRouteLeave');
			this.urls = [];
			this.formLabelAlign = {};
			//CollectGarbage();
			//console.log(this.myMap);
			this.fileList = [];
			sessionStorage.setItem('detail',''); // 清除缓存
			next();
		},
		methods:{
			//通过onchange触发方法获得文件列表
			handleChange(file, fileList) {
				//const name = file.name;
				//console.log(name);
				//console.log(file.raw.type);
				const filename = file.raw.name;
				let unique = true;
				let num = 0;
				//console.log(fileList);
				fileList.forEach((item, index)=>{
					//console.log(item.name);
					//console.log(filename);
					if(item.name === filename){
						num++;
					}
				})
				if( num === 1 ){
					unique = true;
				}
				else{
					unique = false;
				}
				  const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg');
				  const isPNG = file.raw.type === 'image/png';
				  const isPG = (isJPG || isPNG)                                       //限制图片格式为jpg/jpeg / png
				  const isLt10M = file.raw.size / 1024 / 1024 < 10;                         //限制图片大小 10 mb
				  if (!isPG) {
					  //fileList.splice(0,fileList.length);
					  if(fileList.length > 0){
						  fileList.splice(fileList.length-1,1); // 删除不合法的文件
					  }
					  //console.log(fileList);
					  this.$message.error('图片只能是 JPG/JPEG 或 PNG 格式!');
					  return false;
				  }
				  else if (!isLt10M) {
					  if(fileList.length > 0){
					  		fileList.splice(fileList.length-1,1); // 删除不合法的文件
					  }
				      this.$message.error('图片大小不能超过 10MB !');
					  return false;
				  }
				  else if(!unique){
					  if(fileList.length > 0){
					  		fileList.splice(fileList.length-1,1); // 删除不合法的文件
					  }
					  this.$message.error('文件名称重复！');
					  return false;
				  }
				  if(isPG && isLt10M && unique){
					  this.fileList = fileList;
					  //console.log("change=>",fileList);
					  /*
					  fileList.forEach((item, index)=>{
						  console.log('change=>',item.name);
					  })
					  */
					  return true;
				  }
				  return false;

			},
			handleRemove(file, fileList) {
				this.fileList = fileList;
				//console.log("remove=>",fileList);
				/*
				fileList.forEach((item, index)=>{
					console.log('remove=>',item.name);
				})
				*/
			},
			close() {
				sessionStorage.setItem('detail',''); // 清除缓存
				this.$router.push('/search');
				//this.$router.back();
			},
			submit() {
				if(this.formLabelAlign.volunteer===''){
					this.$message.error('"志愿者"信息不能为空！');
					return;
				}
				else if(this.formLabelAlign.date===''){
					this.$message.error('"走访时间"信息不能为空！');
					return;
				}
				else if(this.formLabelAlign.host===''){
					this.$message.error('"户主"信息不能为空！');
					return;
				}
				else if(this.formLabelAlign.distric===''){
					this.$message.error('"行政区域"信息不能为空！');
					return;
				}
				else if(this.formLabelAlign.type===''){
					this.$message.error('"走访类型"信息不能为空！');
					return;
				}
				else if(this.formLabelAlign.famType===''){
					this.$message.error('"家庭类型"信息不能为空！');
					return;
				}
				
				let detail = JSON.parse(sessionStorage.getItem('detail'));
				//console.log(this.fileList.length);
				if(this.formLabelAlign.volunteer === detail.volunteer && this.formLabelAlign.date === detail.detail.date && this.formLabelAlign.host === detail.villager && this.formLabelAlign.famType === detail.detail.famType && this.formLabelAlign.content === detail.detail.content && this.fileList.length === 0 && this.formLabelAlign.deletePhoto_list.length === 0 && this.formLabelAlign.location === detail.district && this.formLabelAlign.type === detail.type) {
					this.$message.error('未作修改！');
					return;
				}
				detail = null;
				
				this.fileList.forEach((item, index)=>{
					this.formLabelAlign.file.append('file', item.raw);
				})
				//console.log(this.formLabelAlign.file.getAll('file'));
				//this.$message.error('暂不能提交');
				upload(this.formLabelAlign)
				.then(res=>{
					this.$message.success('提交成功，页面即将刷新！');
					setTimeout("location.reload()", 2000);
				})
				.catch(err=>{
					this.$message.error('提交失败！');
				})
			},
			editPhoto(url) {
			        this.$confirm('选中的这张照片将被放入回收站，提交后将被删除, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        })
					.then(() => {
						this.showDelete = true;
						const picIndex = this.urls.findIndex((value)=>value===url);
						//console.log(picIndex);
						this.urls.splice(picIndex,1);
						let flag = true;
						//console.log(this.formLabelAlign.deletePhoto_list);
						this.formLabelAlign.deletePhoto_list.forEach((item, index)=>{
							if(url === item){
								this.$message.error('请不要重复添加！');
								flag = false;
								return;
							}
						})
						
						if(flag){
							this.formLabelAlign.deletePhoto_list.push(url);
							this.$message({
							    type: 'success',
							    message: '已选择' + this.formLabelAlign.deletePhoto_list.length + '张图片，提交后生效！'
							  })
						}
							  
							})
					.catch((err) => {
						//console.log(err);
							this.$message({
							    type: 'info',
							    message: '您取消了操作！'
							  })
							})
				},
				refresh() {
					this.formLabelAlign.deletePhoto_list.forEach((item, index)=>{
						this.urls.push(item);
					})
					this.formLabelAlign.deletePhoto_list = [];
					this.showDelete = false;
				}


			}
		}
</script>

<style>
	.form-item{
		font-weight: bold;
	}
	.el-textarea__inner{
	 font-family:"Microsoft";
	 font-size:15px;
	}
	.el-input__inner{
		font-family:"Microsoft";
		font-size:15px;
	}
</style>
