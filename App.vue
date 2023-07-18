<script>
	export default {
		onLaunch: async function() {
			// this.userDefaultLogin();
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上 123123！')
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			userDefaultLogin:()=>{
				uni.login({
					async success(res) {
						const uniIdCo = uniCloud.importObject('uni-id-co')
						const logined = await uniIdCo.loginByWeixin({
							code:res.code
						})
						console.log('logined:',logined);
					}
				})
			}
		},
		globalData: {
			userInfo: {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '小白'
			},
			hasUserInfo: false,
			apiDomain: 'http://127.0.0.1:8000/api',
			txAPIToken:'TOMTWTRw2ZiZ0W',
			txAPITokenSecret:'c10181f23359f4139a479723f04eb502',
			//生产
			downloadPrefix: 'http://127.0.0.1:8000/download?url=',

			// 通过代理服务器中转（微信限制资源域名，不同平台cdn域名千变万化）
			defaultDailyFreeParseNum: 3,

			/**
			 * 登陆并获取用户信息、token
			 * @param {*} callback
			 */
			getUserInfo: function(callback = null) {
				// 登录
				uni.login({
					success: (res) => {
						// 发送 res.code 到后台换取 openId, sessionKey, unionId
						var code = res.code;
						// 获取用户信息
						uni.getSetting({
							success: (res) => {
								if (res.authSetting['scope.userInfo']) {
									// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
									uni.getUserInfo({
										success: (res) => {
											// 可以将 res 发送给后台解码出 unionId

											if (!this.checkIsLogin()) {
												this.getToken(code, res
													.encryptedData, res.inviteCode).then(res=>{
														if (callback) {
															uni.hideLoading();
															callback({code:200});
														}
													});
											}
										}
									});
								}
							}
						});
					},
					complete() {
						uni.hideLoading();
					}
				});
			},

			//全局统一调用接口的方法
			apiRequest: function(options) {
				const url = options.fullUrl?options.fullUrl:this.apiDomain + options.url;
				uni.request({
					url,
					method: options.method ? options.method : 'GET',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token'),
						Accept: 'application/json'
					},
					dataType: 'json',
					data: options.data,
					success: (res) => {
						switch (res.statusCode) {
							case 200:
								options.success(res);
								break;
							case 401:
								this.toLogin();
								break;
							case 422:
								break;
							case 404:
								uni.showToast({
									title: '请求地址不存在',
									icon: 'none'
								});
								break;
							default:
								uni.showToast({
									title: '出错了～请稍后再试',
									icon: 'none'
								});
						}
					},
					fail: (res) => {
						if (options.fail) {
							options.fail(res);
						}
					},
					complete: (res) => {
						if (options.complete) {
							options.complete(res);
						}
					}
				});
			},

			/**
			 * 验证登录
			 */
			checkIsLogin(autoLogin = false) {
				if (uni.getStorageSync('token') != '') {
					return true;
				}
				if (autoLogin) {
					this.toLogin();
				} else {
					return false;
				}
			},

			/**
			 * 跳转登陆页
			 */
			toLogin() {
				this.hasUserInfo = false;
				this.userInfo = null;
				uni.removeStorageSync('token');
				uni.showToast({
					title: '请先登录!',
					icon: 'none',
					success: (res) => {
						uni.switchTab({
							url: '/pages/mine/mine'
						});
					}
				});
			},

			/**
			 * 获取token
			 */
			async getToken(code, encryptedData, inviteCode, callback = null) {
				const {nickname,avatarUrl} = this.userInfo;
				//调后端接口获取token
				const uniCo = uniCloud.importObject('uni-id-co');
				try{
					const res = await uniCo.loginByWeixin({code,inviteCode});
					const {token} = res.newToken;
					uni.showToast({
						title: '登录成功！',
						icon: 'success',
						success: (res) => {
							uni.setStorageSync('token',token)
						}
					});
					console.log('res:',res);
				}catch(e){
					//TODO handle the exception
					console.log('error:',e);
				}
				
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #fff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	.mine,
	.mine-edit {
		wx-button {
			position: relative;
			display: block;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			border-radius: 0;
			-webkit-tap-highlight-color: transparent;
			font-size: inherit;
			text-align: inherit;
			text-decoration: none;
			line-height: inherit;
			overflow: hidden;
			color: inherit;
			background-color: inherit;
		}

		wx-button::after {
			border: none;
		}
	}
</style>