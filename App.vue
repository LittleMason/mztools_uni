<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
		    userInfo: null,
		    hasUserInfo: false,
		    apiDomain: 'http://127.0.0.1:8000/api',
		
		    //生产
		    downloadPrefix: 'http://127.0.0.1:8000/download?url=',
		
		    // 通过代理服务器中转（微信限制资源域名，不同平台cdn域名千变万化）
		    defaultDailyFreeParseNum: 10,
		
		    /**
		     * 登陆并获取用户信息、token
		     * @param {*} callback
		     */
		    getUserInfo: function (callback = null) {
		        // 登录
		        uni.login({
		            success: (res) => {
		                // 发送 res.code 到后台换取 openId, sessionKey, unionId
		                var code = res.code;
		                // 获取用户信息
		                uni.getSetting({
		                    success: (res) => {
		                        if (res.authSetting['scope.userInfo']) {
		                            console.log(1);
		                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		                            uni.getUserInfo({
		                                success: (res) => {
		                                    console.log(2);
		                                    // 可以将 res 发送给后台解码出 unionId
		                                    this.userInfo = res.userInfo;
		                                    this.hasUserInfo = true;
		                                    if (!this.checkIsLogin()) {
		                                        console.log(3);
		                                        this.getToken(code, res.encryptedData, res.iv);
		                                    }
		
		                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		                                    // 所以此处加入 callback 以防止这种情况
		                                    if (callback) {
		                                        callback(res);
		                                    }
		                                }
		                            });
		                        }
		                    }
		                });
		            }
		        });
		    },
		
		    //全局统一调用接口的方法
		    apiRequest: function (options) {
		        uni.request({
		            url: this.apiDomain + options.url,
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
		    getToken(code, encryptedData, iv, callback = null) {
		        //调后端接口获取token
		        this.apiRequest({
		            url: '/auth/login',
		            method: 'POST',
		            data: {
		                code: code,
		                data: encryptedData,
		                iv: iv
		            },
		            success: (res) => {
		                uni.setStorageSync('token', res.data.token);
		                if (callback) {
		                    callback();
		                }
		            }
		        });
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
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
