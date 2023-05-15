<template>
	<view class="sudoku-climp-container">
		<button @tap="handleChoseImage" type="warn">选择相片</button>
		<canvas id="sudokuSource" canvas-id="sudokuSource" :style="{height:adapterH+'px'}"></canvas>
		<view class="bks-wrapper">
			<view
			v-for="item in coverImages"
			class="bks-item" 
			:class="item.class"
			@click="()=>{handleChangeCoverImage(item.src)}">
			</view>
		</view>
		<button @tap="handleSaveImage" type="warn" v-if="successUpload">保存图片</button>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		business
	} from '../../utils/index.js';

	const successUpload = ref(true);
	const imgs = ref([]);
	const adapterH = ref(0); //适配后的高度
	const adapterW = ref(0); //适配后的宽度
	const selectWHPercent = ref(1); //选择的图片宽高比
	const ctx = uni.createCanvasContext('sudokuSource');
	const coverImages = ref([
		{
			src:'../../static/images/260.jpg',
			class:'img-demo1'
		},
		{
			src:'../../static/images/20170709213934_Q8YTF.jpeg',
			class:'img-demo2'
		},
	]);
	const cacheImageInfo = ref(null);
	const sourceSrc = ref(null);

	const savaImgDatas = ref([]);
	//填充九宫格占位
	for (let i = 0; i < 9; i++) {
		imgs.value.push(i);
	}

	function drawLines(cavansW, canvasH) {
		const lineWidth = 2;
		const lineColor = "#f00";
		ctx.setStrokeStyle(lineColor);
		ctx.setLineWidth(lineColor);
		ctx.beginPath();
		ctx.moveTo(cavansW / 3, 0);
		ctx.lineTo(cavansW / 3, canvasH);
		ctx.moveTo(cavansW / 3 * 2, 0);
		ctx.lineTo(cavansW / 3 * 2, canvasH);
		ctx.moveTo(0, canvasH / 3);
		ctx.lineTo(cavansW, canvasH / 3);
		ctx.moveTo(0, canvasH / 3 * 2);
		ctx.lineTo(cavansW, canvasH / 3 * 2);
		ctx.stroke();
		// 绘制数字
		const fontSize = 40;
		const fontColor = "#f00";
		ctx.setFontSize(fontSize);
		ctx.setFillStyle(fontColor);
		ctx.setTextAlign("center");
		ctx.setTextBaseline("middle");
		for (let i = 0; i < 9; i++) {
			const x = (i % 3 + 0.5) * cavansW / 3;
			const y = (Math.floor(i / 3) + 0.5) * canvasH / 3;
			ctx.fillText(i + 1, x, y);
		}
	}

	function drawSudokuImg(coverSrc) {
		const {
			screenWidth
		} = uni.getWindowInfo();

		// 图片宽度统一拉伸到等于屏幕宽度，暂不采用小图原比例居中显示
		adapterW.value = screenWidth; //图片适配宽度，需要根据原图是否大于手机当前屏幕宽度来进行调整
		adapterH.value = parseInt(adapterW.value / selectWHPercent.value);
		ctx.drawImage(sourceSrc.value, 0, 0, adapterW.value, adapterH.value);
		// ctx.draw();
		// return false;
		if(coverSrc){
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(coverSrc, 0, 0, adapterW.value/2, adapterH.value/2);
		}
		// drawLines(adapterW.value, adapterH.value); //画九宫格线
		ctx.draw(false, () => {
			const offsetPxRow = parseInt(adapterW.value / 3);
			const offsetPxCol = parseInt(adapterH.value / 3);
			let q = 0;
			savaImgDatas.value = [];
			for (let col = 0; col < 3; col++) {
				for (let row = 0; row < 3; row++) {
					uni.canvasToTempFilePath({
						canvasId: 'sudokuSource',
						x: row * offsetPxRow,
						y: col * offsetPxCol,
						width: offsetPxRow,
						height: offsetPxCol,
						success(res) {
							const {
								tempFilePath
							} = res;
							savaImgDatas.value.push(tempFilePath);
						},
						fail(err) {
							console.log('err:', err);
						}
					})
				}
			}
		});
	}

	//切换装饰图
	const handleChangeCoverImage = (coverSrc) => {
		drawSudokuImg(coverSrc);
	}

	//选择图片
	const handleChoseImage = () => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			success: function(res) {
				successUpload.value = true;
				uni.getImageInfo({
					src: res.tempFilePaths[0],
					success(imgInfo) {
						const {width,height} = imgInfo;
						selectWHPercent.value = (width/height).toFixed(2);
						sourceSrc.value = res.tempFilePaths[0];
						drawSudokuImg();
					}
				})
			}
		});
	};

	//保存图片
	const handleSaveImage = () => {
		business.saveImage2Photo('canvas', savaImgDatas.value);
	};
</script>

<style lang="less">
	.sudoku-climp-container {
		button {
			margin: 40rpx auto;
			width: 90%;
		}

		#sudokuSource {
			width: 100%;
		}

		canvas[id^="img-"] {
			width: 100px;
			height: 100px;
			border: 1px solid red;
			margin-bottom: 20rpx;
		}

		.bks-wrapper {                            
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;
			.bks-item {
				width: 23vw;
				height: 23vw;
				background-size: cover;
			}
			.img-demo1{
				background-image: url('../../static/images/260.jpg');
			}
			.img-demo2{
				background-image: url('../../static/images/260.jpg');
			}
		}
		
	}
</style>