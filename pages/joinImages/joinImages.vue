<template>
	<view>
		<canvas ref="canvas" :style="{ height: canvasHeight + 'px' }" canvas-id="imgBed" id="imgBed"></canvas>
		<button @tap="chooseImage" type="warn">选择图片</button>
		<button @tap="saveImage" type="warn" v-show="successUpload">保存图片</button>
	</view>
</template>

<script>
	import {
		business
	} from '../../utils/index.js';
	export default {
		data() {
			return {
				imgUrlArr: [], // 存放选择的图片路径数组
				drawImgs: [],
				successUpload:false,
				canvasHeight: 0,
				canvasWidth:0,
				savaImgDatas:[]
			}
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						// this.imgUrlArr = res.tempFilePaths;
						this.imgUrlArr = [...this.imgUrlArr,...res.tempFilePaths];
						console.log('this.imgUrlArr:',this.imgUrlArr);
						this.canvasHeight = 0;
						this.loadImg();
					}
				});
			},
			saveImage(){
				uni.canvasToTempFilePath({
					canvasId: 'imgBed',
					fileType: 'jpg',
					x: 0,
					y: 0,
					width: this.canvasWidth,
					height: this.canvasHeight,
					success: (res) => {
						this.savaImgDatas.push(res.tempFilePath);
						business.saveImage2Photo('canvas', this.savaImgDatas);
						uni.showToast({
							title: '图片保存成功'
						});
					},
					fail: (res) => {
						uni.showToast({
							title: '图片保存失败'
						});
					}
				}, this);
			},
			loadImg() {
				const {
					screenWidth
				} = uni.getWindowInfo();
				const query = uni.createSelectorQuery().in(this);
				query.select('#imgBed').boundingClientRect((res) => {
					// 创建canvas上下文对象
					const ctx = uni.createCanvasContext('imgBed', this);
					// 遍历图片数组，加载图片
					for (let i = 0; i < this.imgUrlArr.length; i++) {
						uni.getImageInfo({
							src: this.imgUrlArr[i],
							success: (res) => {
								let imgWidth = res.width;
								let imgHeight = res.height;
								const {
									screenWidth
								} = uni.getWindowInfo();
								const drawW = parseInt(screenWidth*0.95);
								this.canvasWidth = drawW;
								const selectWHPercent = (imgWidth / imgHeight).toFixed(2);
								const drawH = parseInt(drawW / selectWHPercent);
								this.drawImgs[i] = {height:drawH,path:this.imgUrlArr[i],width:drawW};
								if(i===this.imgUrlArr.length-1){
									const imgHeights = this.drawImgs.map(item=>{
										return item.height;
									})
									const fullHeight = imgHeights.reduce((pre,cur)=>{
										return pre+cur;
									},0);
									console.log('fullHeight:',fullHeight);	
									this.canvasHeight = fullHeight;
									this.drawImgs.forEach((item,inx)=>{
										const {height,path,width} = item;
										const previewImgsHeight = this.drawImgs.slice(0,inx).map((item)=>{
											return item.height;
										})
										const currentY = previewImgsHeight.reduce((pre,cur)=>{
											return pre+cur; 
										},0);
										ctx.drawImage(path, 0, currentY,width,height);
									})
									ctx.draw();
									this.successUpload = true;
								}
							}
						});
					}
				}).exec();
			}
		}
	}
</script>

<style lang="less">
	#imgBed {
		width: 95%;
		margin: 0 auto;
	}
	button {
		margin: 40rpx auto;
		width: 90%;
	}
</style>