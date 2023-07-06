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
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				avatarUrl: '',
				nickname:''
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
				this.userInfo.avatarUrl = avatarUrl;
				app.globalData.userInfo.avatarUrl = avatarUrl; 
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style lang="less">
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
</style>