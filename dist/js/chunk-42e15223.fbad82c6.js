(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42e15223"],{"067f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-input",{staticStyle:{width:"20%"},attrs:{size:"mini",placeholder:"输入关键字搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},nativeOn:{click:function(e){return t.getSearch()}}},[t._v("查询")]),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},nativeOn:{click:function(e){return t.resetTable()}}},[t._v("重置")]),a("span",{staticStyle:{"margin-left":"55%"}},[a("el-popover",{attrs:{placement:"top-start",title:"提示:",width:"200",trigger:"hover",content:"点击插入新的表格数据。"}},[a("el-button",{attrs:{slot:"reference",size:"mini",circle:"",type:"primary",icon:"el-icon-upload",disabled:t.pageDisa},on:{click:function(e){return t.insert()}},slot:"reference"})],1)],1),a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{"row-class-name":t.tableRowClassName,"header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"},data:t.tableData.slice((t.currentPage-1)*t.pageSize,t.currentPage*t.pageSize)},on:{"filter-change":t.filterChange}},[a("el-table-column",{attrs:{prop:"type",label:"类型",width:"180","filter-multiple":!1,"column-key":"type",filters:t.filterStatus,"filter-method":t.typeChange}}),a("el-table-column",{attrs:{prop:"volunteer",label:"志愿者",width:"180"}}),a("el-table-column",{attrs:{prop:"villager",label:"村居"}}),a("el-table-column",{attrs:{prop:"district",label:"行政区域"}}),a("el-table-column",{attrs:{prop:"option",label:"选项"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"el-icon-edit",attrs:{type:"success",size:"mini"},nativeOn:{click:function(a){return t.edit(e.row.index)}}}),a("el-button",{staticClass:"el-icon-delete",attrs:{type:"danger",size:"mini",disabled:t.pageDisa},nativeOn:{click:function(a){return t.deleteRow(e.row.index)}}})]}}])})],1),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{align:"center","current-page":t.currentPage,"page-sizes":[1,5,8,10,20],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalPages},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},i=[],r=a("ade3"),s=(a("57e7"),a("d25f"),a("386d"),a("b775"));function l(){return Object(s["a"])({url:"/getTable",method:"GET"})}function c(t){return Object(s["a"])({url:"/getTable",method:"POST",data:t})}function o(t){return Object(s["a"])({url:"/deleteTable",method:"POST",data:t})}var u,h=a("852e"),g=a.n(h),d={data:function(){return{pageDisa:!1,filterStatus:[{text:"到户联系",value:"到户联系"},{text:"民情走访",value:"民情走访"},{text:"政策落实",value:"政策落实"},{text:"精准服务",value:"精准服务"},{text:"产业对接",value:"产业对接"}],search:"",tableData:[],tableData_static:[],currentPage:1,totalPages:0,pageSize:8}},created:function(){var t=this,e=g.a.get("role");"villager"===e&&(this.pageDisa=!0),e=null,l().then((function(e){t.tableData=e.data,t.tableData_static=t.tableData,t.totalPages=t.tableData.length})).catch((function(e){t.$message.error("获取失败！")}))},computed:{},beforeRouteLeave:function(t,e,a){this.tableData=[],this.tableData_static=[],a()},methods:(u={insert:function(){var t={type:"",volunteer:"",villager:"",district:"",detail:{photo:[],content:"",famType:"",date:""}};sessionStorage.setItem("detail",JSON.stringify(t)),t={},this.$router.push("/edit")},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t},handleCurrentChange:function(t){this.currentPage=t},getSearch:function(){this.$message.error("功能未开发")},filterChange:function(t){var e=this;c(t.type[0]).then((function(t){e.tableData=t.data,e.totalPages=e.tableData.length})).catch((function(t){e.$message.error("获取失败！")}))},typeChange:function(t,e){return!0}},Object(r["a"])(u,"getSearch",(function(){if(this.search){var t=this.search.toLowerCase(),e=[];t&&this.tableData.filter((function(a){-1===a.district.toLowerCase().indexOf(t)&&-1===a.type.toLowerCase().indexOf(t)&&-1===a.volunteer.toLowerCase().indexOf(t)&&-1===a.villager.toLowerCase().indexOf(t)||e.push(a)})),this.tableData=e,this.totalPages=this.tableData.length,this.$message.success("查询成功！")}else this.$message.error("查询失败！")})),Object(r["a"])(u,"resetTable",(function(){this.tableData=this.tableData_static,this.totalPages=this.tableData.length,this.search="",this.$message.success("已重置！")})),Object(r["a"])(u,"tableRowClassName",(function(t){var e=t.row,a=t.rowIndex;e.index=a})),Object(r["a"])(u,"edit",(function(t){sessionStorage.setItem("detail",JSON.stringify(this.tableData[t])),this.$router.push("/edit")})),Object(r["a"])(u,"deleteRow",(function(t){var e=this;this.$confirm("这行数据将被删除, 是否继续?","提示:",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a=e.tableData[t];a.id=sessionStorage.getItem("username"),o(a).then((function(t){e.$message.success("删除成功，页面即将刷新！"),location.reload()})).catch((function(t){e.$message.error("删除失败！")}))})).catch((function(){e.$message({type:"info",message:"已取消删除！"})}))})),u)},f=d,p=a("2877"),b=Object(p["a"])(f,n,i,!1,null,null,null);e["default"]=b.exports},"386d":function(t,e,a){"use strict";var n=a("cb7c"),i=a("83a1"),r=a("5f1b");a("214f")("search",1,(function(t,e,a,s){return[function(a){var n=t(this),i=void 0==a?void 0:a[e];return void 0!==i?i.call(a,n):new RegExp(a)[e](String(n))},function(t){var e=s(a,t,this);if(e.done)return e.value;var l=n(t),c=String(this),o=l.lastIndex;i(o,0)||(l.lastIndex=0);var u=r(l,c);return i(l.lastIndex,o)||(l.lastIndex=o),null===u?-1:u.index}]}))},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}}}]);
//# sourceMappingURL=chunk-42e15223.fbad82c6.js.map