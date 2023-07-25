<template>
	<view class="page-oil-price">
		<view class="page-oil-price-title">
			全国各省实时油价信息
		</view>
		<view class="page-oil-price-table">
			<view class="page-oil-price-table-th">
				<view v-for="(item,index) in columns" :key="index" class="page-oil-price-table-td">
					{{item}}
				</view>
			</view>
			<view class="page-oil-price-table-tr" v-for="(item,index) in datas" :key="'tr'+index">
				<view class="page-oil-price-table-td" v-for="(item,key,index) in item" :key="'td'+index">
					{{item}}
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
				columns:['地区','#92','#95','#98','#0'].reverse(),
				datas:[]
			}
		},
		methods: {
			init(){
				app.globalData.apiRequest({
					fullUrl:'http://api.txapi.cn/v1/oil_price',
					success:(res)=>{
						console.log('res:',res);
						const {data:{code,data}} = res;
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
		}
		&-td{
			width: 20%;
			padding: 20rpx 0;
			text-align: center;
			border-bottom: 1px solid #e5e5e5;
		}
	}
}
</style>
