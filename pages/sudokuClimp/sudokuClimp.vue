<template>
	<view class="sudoku-climp-container">	
		<canvas id="sudokuSource" canvas-id="sudokuSource" :style="{height:adapterH+'px'}"></canvas>
		<view class="climp-imgs-wrapper">
			<image
				:src="previewBgSrc"
				mode="widthFix"
				class="climp-imgs-wrapper-bg"
			/>
			<image v-for="item in clipImgDatas" :src="item" mode="widthFix" :key="item"></image>
		</view>
		<view class="adpater-title">
			边框装饰
		</view>
		<view class="bks-wrapper">
			<view v-for="item in coverImages" class="bks-item" @click="()=>{handleChangeCoverImage(item.src)}" :key="item.src">
				<image :src="item.src" mode="widthFix"></image>
			</view>
		</view>
		<view class="sudoku-climp-container-bt-wrapper">
			<button @tap="handleSaveImage" type="primary" :disabled="!successUpload">保存图片</button>
			<button @tap="handleChoseImage" type="warn">选择相片</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		business
	} from '../../utils/index.js';
	const loading = ref(false); // the status of draw image 
	const previewBgSrc = ref('');
	const successUpload = ref(false);
	const imgs = ref([]);
	const adapterH = ref(0); //适配后的高度
	const adapterW = ref(0); //适配后的宽度
	const selectWHPercent = ref(1); //选择的图片宽高比
	const ctx = uni.createCanvasContext('sudokuSource');
	const coverImages = ref([{
			src: '../../static/images/border-vertical-flower.png',
		},
		{
			src: '../../static/images/border-vertical-golden.png',
		},
		{
			src: '../../static/images/border-horizontal-bird.png',
		},
		{
			src: '../../static/images/border-horizontal-cloud.png',
		},
	]);
	const sourceSrc = ref(null);
	const clipImgDatas = ref([]); // only save nine images
	const savaImgDatas = ref([]); //the finally datas contain nine images and background image
	//填充九宫格占位
	for (let i = 0; i < 9; i++) {
		imgs.value.push(i);
	}

	function drawSudokuImg(isSetBackground) {
		loading.value = true;
		const {
			screenWidth
		} = uni.getWindowInfo();

		// 图片宽度统一拉伸到等于屏幕宽度，暂不采用小图原比例居中显示
		adapterW.value = screenWidth; //图片适配宽度，需要根据原图是否大于手机当前屏幕宽度来进行调整
		adapterH.value = parseInt(adapterW.value / selectWHPercent.value);
		ctx.drawImage(sourceSrc.value, 0, 0, adapterW.value, adapterH.value);
		// ctx.draw();
		// return false;
		if (previewBgSrc.value) {
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(previewBgSrc.value, 0, 0, adapterW.value, adapterH.value);
		}
		ctx.draw(false, () => {
			const offsetPxRow = parseInt(adapterW.value / 3);
			const offsetPxCol = parseInt(adapterH.value / 3);
			console.log('offsetPxRow:',offsetPxRow);
			console.log('offsetPxCol:',offsetPxCol);
			savaImgDatas.value = [];
			!isSetBackground && (clipImgDatas.value = []);
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
							!isSetBackground && clipImgDatas.value.push(tempFilePath);
							savaImgDatas.value.push(tempFilePath);
							loading.value=false;
						},
						fail(err) {
							console.log('err:', err);
							loading.value=false;
							//in the low performance phone, should be draw again
							if(col==2 && row==2){
								drawSudokuImg(isSetBackground);
							}
						}
					})
				}
			}
		});
	}

	//切换装饰图
	const handleChangeCoverImage = (coverSrc) => {
		if(!savaImgDatas.value.length){
			return false;
		}
		previewBgSrc.value = coverSrc;
		drawSudokuImg(true);
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
						const {
							width,
							height
						} = imgInfo;
						selectWHPercent.value = (width / height).toFixed(2);
						sourceSrc.value = res.tempFilePaths[0];
						previewBgSrc.value = null; //clear the background image
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
		.climp-imgs-wrapper {
			//use layout of flex
			//each line set three children elements of 'image' and each child element's gap is 10px
			margin: 30rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: relative;
			image {
				width: 33%;
				margin-bottom: 1px;
				z-index: -1;
			}
			&-bg{
				width: 100% !important;
				height: 100% !important;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2 !important;
			}
		}
		#sudokuSource {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transform: translateY(-200%);
		}
		canvas[id^="img-"] {
			width: 100px;
			height: 100px;
			border: 1px solid red;
			margin-bottom: 20rpx;
		}
		.adpater-title{
			padding-left: 18rpx;
			font-weight: bold;
			font-size: 36rpx;
			color: #ec226f;
			margin-bottom: 30rpx;
		}
		.bks-wrapper {
			display: flex;
			justify-content: space-around;
			.bks-item {
				width: 23vw;
				background-size: cover;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image {
					width: 100%;
					height: 100%;
				}

			}
		}
		&-bt-wrapper{
			display: flex;
			justify-content: space-between;
			button{
				width: 45%;
				margin: 30rpx auto;
				font-size: 32rpx;
			}
		}
	}
</style>