<template>
    <div>
		<el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="width: 20%"/>
		<el-button size="mini" style="margin-left: 10px;" @click.native='getSearch()'>查询</el-button>
		<el-button size="mini" style="margin-left: 10px;" @click.native='resetTable()'>重置</el-button>
		<span style="margin-left: 55%;">
			<el-popover
			    placement="top-start"
			    title="提示:"
			    width="200"
			    trigger="hover"
			    content="点击插入新的表格数据。">
			    <el-button slot="reference" size="mini" circle type="primary" icon="el-icon-upload" @click='insert()' :disabled="pageDisa"></el-button>
			  </el-popover>
		</span>
		<!-- 表格 -->
				<el-table :row-class-name="tableRowClassName" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; text-align: center" @filter-change="filterChange">
					
					<el-table-column prop="type" label="类型" width="180" :filter-multiple="false" column-key="type" :filters="filterStatus" :filter-method="typeChange">
					</el-table-column>
						
					    <el-table-column prop="volunteer" label="志愿者" width="180">
					    </el-table-column>
					    <el-table-column prop="villager" label="村居">
					    </el-table-column>
						<el-table-column prop="district" label="行政区域">
						</el-table-column>
						<el-table-column prop="option" label="选项">
							<template slot-scope="scope">
								<el-button type="success" class='el-icon-edit' size='mini' @click.native='edit(scope.row.index)'></el-button>
								<el-button type="danger" class='el-icon-delete' size='mini' @click.native='deleteRow(scope.row.index)' :disabled="pageDisa"></el-button>
							</template>
						</el-table-column>
				</el-table>


        <!-- 分页器 -->
        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[1,5,8,10,20]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="totalPages">
            </el-pagination>
        </div>

    </div>
 
</template>
 
  <script>
	  import { getTable,getTableChanged } from '../api/getTable.js'
	  import { deleteTable } from '../api/deleteTable.js'
	  import Cookie from 'js-cookie'
        export default {
            data() {
                return {
					pageDisa: false,
					filterStatus: [{text: '到户联系', value: '到户联系'}, {text: '民情走访', value: '民情走访'}, {text: '政策落实', value: '政策落实'}, {text: '精准服务', value: '精准服务'}, {text: '产业对接', value: '产业对接'}],
					//types:['到户联系','民情走访','政策落实','精准服务','产业对接'],
					search: "",
                    tableData: [],
					tableData_static: [],
                    currentPage: 1, // 当前页码
                    totalPages: 0, // 总条数
                    pageSize: 8 // 每页的数据条数
                };
            },
			created() {
				//console.log('created');
				let role = Cookie.get('role');
				if(role === 'villager'){
					this.pageDisa = true; // 本页面多个按键的disabled属性值
				}
				role = null;
				// 获取表格
				getTable()
				.then(res=>{
					//console.log(res.data);
					this.tableData = res.data;
					this.tableData_static = this.tableData;
					this.totalPages = this.tableData.length;
				})
				.catch(err=>{
					this.$message.error('获取失败！');
				})
			},
			computed:{
				
			},
			beforeRouteLeave(to, from, next) {
				//console.log('beforeRouteLeave');
				//this.tableData.destroy();
				this.tableData = [];
				this.tableData_static = [];
				//CollectGarbage();
				//console.log(this.myMap);
				//sessionStorage.setItem('detail', '');
				next();
			},
            methods: {
				insert() {
					let data = {
								type: "",
								volunteer: "",
								villager: "",
								district: '',
								
								detail: {
										photo: [],
										content: "",
										famType: '',
										date: ''
								}
					};
					sessionStorage.setItem('detail', JSON.stringify(data));
					data = {};
					this.$router.push('/edit');
				},
                //每页条数改变时触发 选择一页显示多少行
                handleSizeChange(val) {
                    //console.log(`每页 ${val} 条`);
                    this.currentPage = 1;
                    this.pageSize = val;
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange(val) {
                    //console.log(`当前页: ${val}`);
                    this.currentPage = val;
                },
				getSearch(){
					this.$message.error('功能未开发');
				},
				filterChange(filters){
				   /*
				   if(filters.type){
				     this.listQuery.type = filters.type[0]
				   }
				   */
				   //this.getTableInfo(); // 通过接口获取数据的方法
				   //console.log('changed');
				   //console.log(this.tableData);
				   //console.log(filters.type[0]);
				   //console.log(filters);

				   // 筛选获取表格
				   getTableChanged(filters.type[0])
				   .then(res=>{
				   	//console.log(res.data);
				   	this.tableData = res.data; // 刷新
				   	this.totalPages = this.tableData.length;
				   })
				   .catch(err=>{
				   	this.$message.error('获取失败！');
				   })
				 },
				 typeChange(value, row){
					 //this.totalPages = value.length;
					 //console.log(value);
					 //return row.type===value;
					 return true;
				 },
				 getSearch(){
					 //console.log(this.search.toLowerCase());
				     if(this.search){
				         // this.tableData ：用于搜索的总数据
				         //　toLowerCase():用于把字符串转为小写，让模糊查询更加清晰
				         let _search = this.search.toLowerCase();
				         let newListData = [];// 用于存放搜索出来数据的新数组
				         if (_search) {
				             this.tableData.filter((item) => {
				             if (item.district.toLowerCase().indexOf(_search) !== -1 || item.type.toLowerCase().indexOf(_search) !== -1 || item.volunteer.toLowerCase().indexOf(_search) !== -1 || item.villager.toLowerCase().indexOf(_search) !== -1) {
				                 newListData.push(item);
				             }
				             }) 
				         }
				         this.tableData = newListData;
						 this.totalPages = this.tableData.length;
						 this.$message.success('查询成功！');
				     }
					 else{
						 this.$message.error('查询失败！');
					 }
				 },
				 resetTable(){
					 this.tableData = this.tableData_static;
					 this.totalPages = this.tableData.length;
					 this.search = '';
					 this.$message.success('已重置！');
				 },
				 tableRowClassName ({row, rowIndex}) {
				       //把每一行的索引放进row
				       row.index = rowIndex;
				     },
				 edit(index){
					 //console.log(this.tableData[index]);
					 sessionStorage.setItem('detail', JSON.stringify(this.tableData[index]));
					 this.$router.push('/edit');
					 //this.$message.warning('未开发');
				 },
				 deleteRow(index){
					 this.$confirm('这行数据将被删除, 是否继续?', '提示:', {
					           confirmButtonText: '确定',
					           cancelButtonText: '取消',
					           type: 'warning'
					         }).then(() => {
								 
								 const deleteData = this.tableData[index];
								 deleteData.id = sessionStorage.getItem('username');
								 deleteTable(deleteData)
								 .then(res=>{
								 		//console.log(deleteData);
								 		this.$message.success('删除成功，页面即将刷新！');
								 		//console.log(res.data);
										location.reload();
								 })
								 .catch(err=>{
								 		this.$message.error('删除失败！');
								 })
								 

					         }).catch(() => {
					           this.$message({
					             type: 'info',
					             message: '已取消删除！'
					           });          
					         });
				 }
            }
        };
</script>


<style>
</style>
