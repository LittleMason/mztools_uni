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
			handleEditUser(){
				const uniCo = uniCloud.importObject('uni-id-co'); 
				const {uid} = uniCloud.getCurrentUserInfo();
				console.log('uid:',uid);
				uniCo.updateUser({uid,nickname:this.nickname,username:uid})
			}
		},
		created() {
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