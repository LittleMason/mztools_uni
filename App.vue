<script>
import { error } from 'console';
import { initUserInfo } from '@/utils/business.js';
	export default {
		onLaunch: async function() {
			initUserInfo.call(this);
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上 123123！')
			console.log('App Launch');
		},
		onShow:function() {
			this.refreshToken();
			console.log('App Show');
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
			},
			refreshToken(){
				const tokenExpired = uni.getStorageSync('uni_id_token_expired') || 0;
				const token = uni.getStorageSync('token');
				const currentTime = Date.now();
				const tokenIsExpired = tokenExpired - currentTime < 10*3600;
				console.log('tokenIsExpired:',tokenIsExpired);
				const uniCo = uniCloud.importObject('uni-id-co');
				if(tokenIsExpired && token){
					uniCo.refreshToken().then(res=>{
						console.log('刷新token:',res);
						const {newToken:{token,tokenExpired}} =res;
						uni.setStorageSync('token',token);
						uni.setStorageSync('uni_id_token',token);
						uni.setStorageSync('uni_id_token_expired',tokenExpired);
					},error=>{
						console.log('刷新失败：',error);
						uni.removeStorageSync('token');
						uni.reLaunch({
							url:'/pages/index/index'
						})
					});
					
				}
				console.log('tokenIsExpired:',tokenIsExpired);
			}
		},
		globalData: {
			userInfo: {
				avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '小白'
			},
			hasUserInfo: false,
			apiDomain: 'http://127.0.0.1:8000/api',
			txAPIToken:'TOMTWTRw2ZiZ0W',
			txAPITokenSecret:'c10181f23359f4139a479723f04eb502',
			//生产
			downloadPrefix: 'http://127.0.0.1:8000/download?url=',

			// 通过代理服务器中转（微信限制资源域名，不同平台cdn域名千变万化）
			defaultDailyFreeParseNum: 30,
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
							success: (settingRes) => {
								if (settingRes.authSetting['scope.userInfo']) {
									// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
									uni.getUserInfo({
										success: (userInfo) => {
											// 可以将 userInfo 发送给后台解码出 unionId
											console.log('getUserInfo:',userInfo);
											if (!this.checkIsLogin()) {
												this.getToken(code, userInfo
													.encryptedData, userInfo.inviteCode).then(tokenRes=>{
														if (callback) {
															uni.hideLoading();
															console.log('发送给后台解码出 unionId:',tokenRes);
															callback({code:200,data:tokenRes});
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
				//if options.url is not start with http,then add apiDomain before it
				let url = options.url;
				if (!url.startsWith('http')) {
					url = this.apiDomain + url;
				}
				uni.request({
					url,
					method: options.method ? options.method : 'GET',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token'),
						Accept: 'application/json'
					},
					dataType: 'json',
					//if options.noToken is true,then don't add token to data
					data: options.noToken ? options.data : Object.assign({
						token: uni.getStorageSync('token')
					}, options.data),
					success: (res) => {
						switch (res.statusCode) {
							case 200:
								options.success(res.data);
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
				console.log('this.userInfo:',this.userInfo);
				//调后端接口获取token
				const uniCo = uniCloud.importObject('uni-id-co');
				console.log('code:',code);
				console.log('inviteCode:',inviteCode);
				try{
					const res = await uniCo.loginByWeixin({code,inviteCode});
					const {token} = res.newToken;
					console.log('this-getToken:',token);
					const tempFiles = await initUserInfo.call(this,token);
					console.log('tempFiles:',tempFiles);
					uni.showToast({
						title: '登录成功！',
						icon: 'success',
						success: (res) => {
							uni.setStorageSync('token',token);
						}
					});
					return tempFiles
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
	@import '@/customer.css';
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