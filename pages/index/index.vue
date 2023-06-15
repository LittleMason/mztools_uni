<template>
	<view class="container">
		<view class="swiper-wrapper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5 * 1000" :duration="500">
				<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
				<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
				<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
			</swiper>
		</view>
		<view class="block-wrapper">
			<view class="title">文本处理</view>
			<uni-grid :column="4" :showBorder="false">
				<uni-grid-item v-for="(item,index) in textArr" :key="index">
					<view class="item-block" @click="hanleItem">
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="block-wrapper">
			<view class="title">图像</view>
			<uni-grid :column="4" :showBorder="false">
				<uni-grid-item v-for="(item,index) in imgArr" :key="index">
					<view class="item-block" @click="()=>{hanleItem(item)}">
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const textArr = [
	{
		text: '文字九宫格',
		path: ''
	},
	{
		text: '文字转图片',
		path: ''
	},
	{
		text: '翅膀昵称',
		path: ''
	},
	{
		text: '花式字体',
		path: ''
	},
	{
		text: '尖叫字',
		path: ''
	},
	{
		text: '字符表情',
		path: ''
	},
	{
		text: '520文字',
		path: ''
	},
	{
		text: '金额转大写',
		path: ''
	}
];
const imgArr = [
	{
		text:'精选壁纸',
		path:''
	},
	{
		text:'九宫格切图',
		path:'/pages/sudokuClimp/sudokuClimp'
	},
	{
		text:'截图拼接',
		path:'/pages/joinImages/joinImages'
	},
	{
		text:'图片压缩',
		path:''
	},
	{
		text:'带壳截图',
		path:''
	},
	{
		text:'生成二维码',
		path:''
	},
	{
		text:'解码二维码',
		path:''
	},
	{
		text:'图像取色',
		path:''
	},
	{
		text:'图加马赛克',
		path:''
	},
]
const hanleItem = (item)=>{
	console.log('item:',item)
	uni.navigateTo({
		url:item.path
	})
	
}

</script>

<style lang="less" scoped>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
	.item-block{
		text-align: center;
	}
}
</style>
