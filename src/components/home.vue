<template>
	<el-container style='margin-right: -6px; margin-top: -20px;'>
	  <el-aside width="240px">Aside</el-aside>
	  <el-container>
	    <el-header height='130px'>
			<div>
				<span style="display: flex; margin-bottom: 5px;">
					<el-popover
					    placement="top-start"
					    title="事件数:"
					    width="200"
					    trigger="hover">
						<span>事件总数：{{this.numTotal}}</span>
					    <el-button slot="reference" size="mini" style="margin-right: 10px;" type="primary" @click.native="eventTotal()">事件数</el-button>
					  </el-popover>
					<el-progress v-if='this.loading' :percentage="this.percTotal"></el-progress>
				</span>
				<span style="display: flex; margin-bottom: 5px;">
					<el-popover
					    placement="top-start"
					    title="已解决:"
					    width="200"
					    trigger="hover">
						<span>已解决事件数：{{this.numDone}}<br/>占比：{{this.percDone.toFixed(1)}}%</span>
					    <el-button slot="reference" size="mini" style="margin-right: 10px;" type="success" @click.native="eventDone()">已解决</el-button>
					  </el-popover>
					<el-progress v-if="this.loading" :percentage="this.percDone" status="success"></el-progress>
				</span>
				<span style="display: flex; margin-bottom: 5px;">
					<el-popover
					    placement="top-start"
					    title="处理中:"
					    width="200"
					    trigger="hover">
						<span>待解决处理中：{{this.numIng}}<br/>占比：{{this.percIng.toFixed(1)}}%</span>
					    <el-button slot="reference" size="mini" style="margin-right: 10px;" type="warning" @click.native="eventIng()">处理中</el-button>
					  </el-popover>
					<el-progress v-if="this.loading" :percentage="this.percIng" status="warning"></el-progress>
				</span>
				<span style="display: flex; margin-bottom: 5px;">
					<el-popover
					    placement="top-start"
					    title="升级数:"
					    width="200"
					    trigger="hover">
						<span>事件升级数：{{this.numDanger}}<br/>占比：{{this.percDanger.toFixed(1)}}%</span>
					    <el-button slot="reference" size="mini" style="margin-right: 10px;" type="danger" @click.native="eventDanger()">升级数</el-button>
					  </el-popover>
					<el-progress v-if="this.loading" :percentage="this.percDanger" status="exception"></el-progress>
				</span>	
			</div>
		</el-header>
	    <el-main>
			<div class="map">
				<!--创建地图容器-->
			    <div id="map_container" class="allmap" ref="map"></div>
			</div>
		</el-main>
	    <el-footer height='100px'>Footer</el-footer>
	  </el-container>
	</el-container>
</template>

<script>
	import { BMPGL } from '../bmpgl.js';
	//import { MP } from '../map.js';
	import { getEvents } from '../api/getEvents.js';
	//import { ComplexCustomOverlay } from '../assets/marker/ComplexCustomOverlay.js';
	//import '../assets/marker/ComplexCustomOverlay.css';
	//import { RadarOverlay } from '../assets/radar/Radar.js';
	//import { CircleShow } from '../assets/circle/Circle.js'
	//import * as echarts from "echarts";
	//import "echarts/extension/bmap/bmap";
	//require('echarts/extension/bmap/bmap');
	//import { loadBMap } from '../assets/radar/map.js'
	//import mapvgl from 'mapvgl'
	export default {
		data() {
			return {
				loading: false,
				
				percDanger: 0,
				percDone: 0,
				percIng: 0,
				percTotal: 100,
				
				numDanger: 0,
				numDone: 0,
				numIng: 0,
				numTotal: 0,
				
				windowInfo: '正在加载中，请稍等...',
				color: '',
				
				ak: "rQxHPQX1ua21rWnXzTbUh5KSSUbnefxR", // 百度的地图密钥
				myMap: null
			}
		},
		created() {
			
			getEvents()
			.then(res=>{
				//console.log(res);
				this.numDanger = res.data.danger;
				//console.log(res.data.ing);
				//console.log(this.numIng);
				this.numDone = res.data.done;
				this.numIng = res.data.ing;
				//console.log(this.numIng);
				this.numTotal = this.numDanger + this.numDone + this.numIng;
				
				this.percDanger = this.numDanger / this.numTotal *100;
				//console.log(this.percDanger);
				this.percDone = this.numDone / this.numTotal * 100;
				this.percIng = this.numIng / this.numTotal * 100;
				//console.log(this.numTotal);
				//console.log(this.percIng);
				
				this.loading = true; // 数据加载完成，显示“进度条”
				
				// 加载地图镂空线内颜色，和标注的文本
				if(this.percDanger > 4){
					this.color = 'red';
					this.windowInfo = '警告：当前事件升级数占比超过4%';
				}
				else if(this.percDone > 60){
					this.color = 'green';
					this.windowInfo = '当前事件解决率已达到60%';
				}
				else if(this.percIng < 45){ // 36 - 45
					this.color = 'blue';
					this.windowInfo = '当前事件较平稳';
				}
				else{
					this.color = 'yellow';
					this.windowInfo = '当前待处理事件较多，超过45%';
				}
				
				this.initMap(); // 比放在mounted中加载流畅许多！！
				
				/*
				console.log(this.percDanger);
				这里的语句优先于上面的函数执行，因此this.percDanger === 0
				*/
				
			})
			.catch(err=>{
				console.log(err);
			})
			
		},
		mounted() {
			/*
			this.$nextTick(() => {
			　　loadBMap("rQxHPQX1ua21rWnXzTbUh5KSSUbnefxR").then(() => {
			   　　this.drawPie()
			   　})
			})
			*/
		},
		beforeRouteLeave(to, from, next) {
			//console.log('beforeRouteLeave');
			this.myMap.destroy();
			this.myMap = null; // 内存溢出的罪魁祸首
			//CollectGarbage();
			//console.log(this.myMap);
			this.loading = false;
			next();
		},
		methods: {
		    initMap() {
				
				/*
				MP(this.ak)
				.then((BMap)=>{
					// eslint-disable-next-line no-undef
					class RadarOverlay extends BMap.Overlay {
					  constructor(point, size) {
					    super();
					    this.point = point;
					    this.size = size;
					  }
					
					  initialize(map) {
					    this._map = map;
					    const template = `<div class="radar-box">
					        <div class="radar">
					          <div class="ripple"></div>
					          <div class="ripple"></div>
					          <div class="ripple"></div>
					        </div>
					      </div>`;
					    const divFragment = document.createRange().createContextualFragment(template);
					    const div = divFragment.querySelectorAll('.radar-box')[0];
					    map.getPanes().markerPane.appendChild(div);
					    this._div = div;
					    return div;
					  }
					
					  draw() {
					    // 根据地理坐标转换为像素坐标，并设置给容器
					    const position = this._map.pointToOverlayPixel(this.point);
					    this._div.style.left = `${position.x - this.size / 2}px`;
					    this._div.style.top = `${position.y - this.size / 2}px`;
					  }
					}
					
					// eslint-disable-next-line no-undef
					      const map = new BMap.Map(this.$refs.map);
					      // eslint-disable-next-line no-undef
					      map.centerAndZoom(new BMap.Point(109.66049, 28.69997), 11);
					      // eslint-disable-next-line no-undef
					      const point = new BMap.Point(109.66049, 28.69997);     
					      map.enableScrollWheelZoom(true);
					// 添加自定义覆盖物   
					      const radar = new RadarOverlay(point, 400);    
					      map.addOverlay(radar);
					    
	   
				})
				.catch(err=>{
					console.log(err);
				})
				*/
				
			
		      // 传入密钥获取地图回调。
		      BMPGL(this.ak)
			  
			  .then((BMapGL) => {
				  
		        // 创建地图实例
		        this.myMap = new BMapGL.Map("map_container",{minZoom:10, maxZoom:12});
		        // 创建点坐标 axios => res 获取的初始化定位坐标
		        let point = new BMapGL.Point(109.66049, 28.69997);
		        // 初始化地图，设置中心点坐标和地图级别
		        this.myMap.centerAndZoom(point, 11);
		        //开启鼠标滚轮缩放
		        this.myMap.enableScrollWheelZoom(true);
		        this.myMap.setHeading(64.5);
		        this.myMap.setTilt(30); // 73
			
				// 镂空线
			   var bd = new BMapGL.Boundary();
			   var that = this;
			   bd.get('保靖县', function (rs) {
			       // console.log('外轮廓：', rs.boundaries[0]);
			       // console.log('内镂空：', rs.boundaries[1]);
			       var hole = new BMapGL.Polygon(rs.boundaries, {
			           //fillColor: 'blue',
					   fillColor: that.color,
			           fillOpacity: 0.2
			       });
				   //console.log(that.color);
			       that.myMap.addOverlay(hole);
			   });
			   
			   /*
			   // 创建点标记
			   // 卡顿，内存溢出
			   var marker = new BMapGL.Marker(point);
			   //var marker = new BMap.Marker(point);
			   map.addOverlay(marker);
			   //marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			   //marker.setAnimation(BMAP_ANIMATION_DROP); // 坠落动画
			   */
			   
			   // 创建信息窗口
			   var opts = {
			       width: 200,
			       height: 80,
			       title: '保靖县'
			   };
			   var infoWindow = new BMapGL.InfoWindow(this.windowInfo, opts);
			   
			   
			   this.myMap.openInfoWindow(infoWindow, point); // 开启信息窗口
			   /*
			   // 点标记添加点击事件
			   marker.addEventListener('click', function () {
			       map.openInfoWindow(infoWindow, point); // 开启信息窗口
			   });
			   */
			   
					
					// 辐射线
			          var view = new mapvgl.View({
			              map: this.myMap
			          });
					  
					  var waveLayer = new mapvgl.CircleLayer({
									enablePicked: true,
						              selectedColor: '#df4d8c', // 选中项颜色
						              autoSelect: true, // 根据鼠标位置来自动设置选中项
						              onClick: (e) => { // 点击事件
						                  //console.log(e);
										  that.myMap.openInfoWindow(infoWindow, point); // 开启信息窗口
						              },
					              // 绘制带波纹扩散的圆
					              type: 'wave',
								  // 颜色
								  color: 'rgba(43, 106, 200, 1.0)',
								  size: 6,
					              // 扩散半径，支持直接设置和回调两种形式
					              radius: 40,
					              // 周期影响扩散速度，越小越快
					              duration: 1 / 3,
					              // 拖尾影响波纹数，越大越多
					              trail: 3,
								  data: [{
								      geometry: {
								          type: 'Point',
								          coordinates: [109.660568, 28.699781] // 保靖县人民政府
								      }
								  }]
					          });
					  view.addLayer(waveLayer);
					  
					  
			          //view.addLayer(waveLayer);
			          //layer.setData(data.slice(3, 8));
			  
			  

			  
			  
			  
			  
		      })
		      .catch((err)=>{
		        console.log(err);
		      })
			  
		    },
			eventTotal() {
				this.$message.error('未开发');
			},
			eventDone() {
				this.$message.error('未开发');
			},
			eventIng() {
				this.$message.error('未开发');
			},
			eventDanger() {
				this.$message.error('未开发');
			}
	},
	}
</script>

<style>
.allmap {
  width: 100%;
  height: 60vh;
  position: relative;
  z-index: 1;
}
.el-progress{
	width: 40%;
}
</style>
