<template>
	<view class="page-oil-price">
		<view class="page-oil-price-title">
			全国各省实时油价信息
		</view>
		<view class="page-oil-price-table">
			<view class="page-oil-price-table-th">
				<view v-for="(item,index) in columns" :key="index" class="page-oil-price-table-td" :class="{'placeName':index===0}">
					{{item}}
				</view>
			</view>
			<view class="page-oil-price-table-tr" v-for="(item,index) in datas" :key="'tr'+index">
				<view class="page-oil-price-table-td" v-for="(item1,key,index1) in item" :key="'td'+index" :class="{'placeName':index1===4}">
					{{item1}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				columns:['地区','#92','#95','#98','#0'],
				datas:[]
			}
		},
		methods: {
			init(){
				app.globalData.apiRequest({
					fullUrl:'http://api.txapi.cn/v1/oil_price',
					success:(res)=>{
						console.log('res:',res);
						const {code,data} = res;
						if(code===200){
							this.datas = data;
						}
					}
				})
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="less">
.page-oil-price{
	padding-bottom: 80rpx;
	&-title{
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		font-size: 24rpx;
		color: #b6b6b6;  
	}
	&-table{
		&-th{
			display: flex;
			background-color: #fc4444;
			color: white;
			position: sticky;
			top: 0px;
		}
		&-tr{
			display: flex;
			flex-direction: row-reverse;
		}
		&-td{
			width: 20%;
			padding: 20rpx 0;
			text-align: center;
			border-bottom: 1px solid #e5e5e5;
		}
		.placeName{
			background-color: #ff8902;
			color: white;
		}
	}
}
</style>
