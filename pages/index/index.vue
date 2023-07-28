<template>
	<view class="container">
		<view class="swiper-wrapper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="false" :interval="5 * 1000" :duration="500">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<view class="swiper-item" :style="{backgroundImage:`url(${item.url})`}">
						<view class="swiper-item-content">
							{{swiperDatas[index].content}}
						</view>
						<view class="swiper-item-author">
							----  {{swiperDatas[index].creator}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
<!-- 		<view @click="handleDemo">
			获取信息
		</view> -->
<!-- 		<view class="block-wrapper">
			<view class="block-wrapper-title">文本处理</view>
			<uni-grid :column="4" :showBorder="false">
				<uni-grid-item v-for="(item,index) in textArr" :key="index">
					<view class="item-block" @click="handle">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="text">{{ item.text }}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view> -->
		<view class="block-wrapper">
			<view class="block-wrapper-title">图像处理</view>
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item v-for="(item,index) in imgArr" :key="index">
					<view class="item-block" @click="()=>{handle(item)}">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="text">{{ item.text }}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="block-wrapper">
			<view class="block-wrapper-title">AI模块</view>
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item v-for="(item,index) in AIArr" :key="index">
					<view class="item-block" @click="()=>{handle(item)}">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="text">{{ item.text }}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="block-wrapper">
			<view class="block-wrapper-title">视频处理</view>
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item v-for="(item,index) in videoArr" :key="index">
					<view class="item-block" @click="()=>{handle(item)}">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="text">{{ item.text }}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
const app = getApp();
const textArr = [
	{
		text: '文字九宫格',
		path: '',
		icon:'../../static/images/text-night-climp.png'
	},
	{
		text: '文字转图片',
		path: '',
		icon:'../../static/images/text-text-to-image.png'
	},
	{
		text: '翅膀昵称',
		path: '',
		icon:'../../static/images/text-wing-nickname.png'
	},
	{
		text: '花式字体',
		path: '',
		icon:'../../static/images/text-flower.png'
	}
];
const imgArr = [
	{
		text:'九宫格切图',
		path:'/pages/sudokuClimp/sudokuClimp',
		icon:'../../static/images/img-night-climp.png'
	},
	{
		text:'长图拼接1',
		path:'/pages/joinImages/joinImages',
		icon:'../../static/images/img-climp-join.png'
	},
]
const videoArr = [
	{
		text:'视频去水印',
		path:'/pages/videos/watermark/index/index',
		icon:'../../static/images/video-water.png'
	}
]
const AIArr = [
	{
		text:'智能聊天',
		path:'/pages/ai/chat/index',
		icon:'../../static/images/ai.png'
	},{
		text:'油价查询',
		path:'/pages/ai/capability/capability',
		icon:'../../static/images/oil-price.png'
	},{
		text:'周公解梦',
		path:'/pages/ai/fortune-telling/fortune-telling',
		icon:'../../static/images/fortune-telling.png'
	},
]
const swipers = [
	{
		url:'../../static/images/lotus.png'
	},
	{
		url:'../../static/images/green.png'
	}
];
const swiperDatas = ref([]);
const handle = (item)=>{
	console.log('item:',item)
	uni.navigateTo({
		url:item.path
	})
}
const handleDemo = ()=>{
	// let data = uniCloud.getCurrentUserInfo();
	uniCloud.callFunction({
		name:'demo',
		data:{sex:'男'},
		success(res) {
			console.log('res:',res);
		}
	})
}
swipers.forEach(()=>{
	swiperDatas.value = [];
	app.globalData.apiRequest({
		fullUrl:'https://api.txapi.cn/v1/hitokoto',
		success:(res)=>{
			console.log('res:',res);
			const { code,data } =res;
			if(code===200){
				swiperDatas.value.push(data);
			}
		}
	})
})
</script>

<style lang="less" scoped>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
	.swiper-wrapper{
		margin-bottom: 40rpx;
		swiper{
			min-height: 60vw;
		}
		.swiper-item{
			font-family: "Bitstream Vera Serif Bold";
			height: 100%;
			background-size: 100% 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			flex-direction: column;
			padding: 0 30rpx;
			font-size: 32rpx;
			background-repeat: no-repeat;
			background-position: center;
			font-weight: bold;
			&-content{
				text-indent: 72rpx;
			}
			&-author{
				margin-top: 20rpx;
				text-align: right;
				padding-right: 40rpx;
				position: relative;
				
			}
		}
	}
	.item-block{
		text-align: center;
		image{
			width: 64rpx;
		}
	}
	.block-wrapper{
		&-title{
			font-weight: bold;
			margin-bottom: 30rpx;
			font-size: 30rpx;
		}
	}
}
</style>
