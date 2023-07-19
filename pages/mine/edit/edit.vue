<template>
	<view class="mine-edit">
		<view class="avator-box">
			<button class="avator-btn" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
				<image class="avatar-image" :src="avatarUrl"></image>
			</button>
		</view>
		<view class="form-item">
			<view class="form-item-label">
				昵称
			</view>
			<input v-model="nickname" type="nickname" class="weui-input" placeholder="请输入昵称" />
		</view>
		<view class="enter-btn" @click="handleEditUser">确认修改</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				avatarUrl: '',
				nickname:'',
			};
		},
		onShow:function(){
			console.log('asda112');
		},
		methods: {
			init() {
				const {avatarUrl,nickname} = app.globalData.userInfo;
				this.avatarUrl = avatarUrl;
				this.nickname = nickname;
			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				app.globalData.userInfo.avatarUrl = avatarUrl; 
			},
			async handleEditUser(){
				const uniCo = uniCloud.importObject('uni-id-co'); 
				const {uid} = uniCloud.getCurrentUserInfo();
				uniCo.updateUser({uid,nickname:this.nickname,username:uid}).then(async (res)=>{
					const {errCode} = res;
					if(!errCode){
						const db = uniCloud.database();
						const userRecord = await db.collection('uni-id-users').doc(uid).field({nickname:true,avatarUrl:true}).get();
						const {data} = userRecord.result;
						console.log('userRecord:',userRecord);
						app.globalData.userInfo.nickname = data[0].nickname;
						// app.globalData.userInfo.avatarUrl = data[0].avatarUrl;
						uni.showToast({
							icon:'success',
							title:'编辑成功！',
							success() {
								uni.navigateBack();
							}
						})
					}
				})
			}
		},
		created() {
			console.log('asda');
			this.init()
		}
	}
</script>

<style lang="less">
	.mine-edit{
		.enter-btn {
			margin: 40rpx auto;
			width: 90%;
			background-color: #e64340;
			color: #fff;
			font-size: 36rpx;
			text-align: center;
			height: 92rpx;
			line-height: 92rpx;
			border-radius: 10rpx;
		}
		.avator-box {
			padding: 100rpx 0;
			.avator-btn {
				.avatar-image {
					display: block;
					width: 56px;
					height: 56px;
					margin: 0 auto;
				}
			}
		}
		.form-item{
			display: flex;
			border-top: 1px solid #efefef;
			border-bottom: 1px solid #efefef;
			padding: 30rpx;
			&-label{
				flex: 0 160rpx;
			}
		}
	}
	
</style>