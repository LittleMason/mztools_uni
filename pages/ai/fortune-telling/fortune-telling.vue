<template>
	<view class="fortune-telling">
		<uni-section class="dream-section"  title="周公解梦" subTitle="输入梦见内容,如:梦见皇帝、梦见兔子等" type="line" padding>
			<uni-easyinput errorMessage v-model="dream" focus placeholder="输入梦见内容,如:梦见皇帝、梦见兔子等" @input="input"></uni-easyinput>
		</uni-section>
		<button class="analysis-btn" @click="handleQuery" type="warn">开始解梦</button>
		<view class="dream-analysis">
			<view class="item" v-for="(item,index) in analyses" v-if="hasResult">
				{{item.text}}
			</view>
			<view class="empty" v-else>
				{{ emptyText }}
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				dream:'',
				analyses:[],
				emptyText:'',
				hasResult:true
			}
		},
		methods: {
			//http://api.txapi.cn/v1/c/duke_zhou_oneiromancy
			
			async handleQuery(){
				const uniCo = uniCloud.importObject('request-agent-middleware');
				const reg = /^梦见(有|了)?/;
				const kw = this.dream.replace(reg,'');
				console.log("kw",kw);
				const datas = {
						token: app.globalData.txAPIToken,
						kw
				}
				const res = await uniCo.agent('https://api.txapi.cn/v1/c/duke_zhou_oneiromancy',datas);
				console.log('res:',res);
				const {data,status} = res;
				if(status===200){
					this.analyses = data.data;
					this.hasResult = !!data.data.length;
					this.emptyText = data.msg;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.fortune-telling{
	.dream-section{
	}
	.analysis-btn{
		margin-top:24rpx;
	}
	.dream-analysis{
		padding: 40rpx;
		.item{
			font-size: 28rpx;
			text-indent: 56rpx;
			margin-bottom: 30rpx;
		}
	}
}
</style>
