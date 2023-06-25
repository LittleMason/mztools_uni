<template>
    <view class="center">
        <view class="blue-top">
            <view class="user-card">
                <view class="card-top">
                    <view class="user-top">
                        <view class="user-vip" style="position: relative">
							<uni-icons type="contact" size="50" color="#ccc" v-if="!hasUserInfo"></uni-icons>
                            <image class="user-pic" :src="userInfo.avatarUrl" v-else/>
                        </view>
                        <view class="user-board">
                            <button v-if="!hasUserInfo" class="user-name" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登陆</button>
                            <view v-if="hasUserInfo" class="user-name">{{ userInfo.nickName }}</view>
                        </view>
                    </view>
                </view>
                <view class="card-bottom">
                    <view class="left">
                        <view class="count">
                            <text class="num">{{ dailyFreeParseNum }} 次</text>
                        </view>
                        <text class="txt">今日免费次数</text>
                    </view>
                    <view class="right">
                        <view class="count">
                            <text class="num">{{ totalParseNum }} 次</text>
                        </view>
                        <text class="txt">共为您解析次数</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="center-list">
            <navigator class="center-list-item" url="/pages/mine/history">
                <uni-icons type="download-filled" size="30" color="#00c8fd"></uni-icons>
                <text class="list-text">下载记录查询</text>
                <uni-icons type="right" size="20" color="#8a8a8a"></uni-icons>
            </navigator>
            <!-- navigator target="miniProgram"/ -->
            <button class="center-list-item" openType="contact">
                <uni-icons type="phone-filled" size="30" color="#00c8fd"></uni-icons>
                <text class="list-text">联系客服</text>
                <uni-icons type="right" size="20" color="#8a8a8a"></uni-icons>
            </button>
            <button class="center-list-item" openType="share">
                <uni-icons type="redo-filled" size="30" color="#00c8fd"></uni-icons>
                <text class="list-text">分享</text>
                <uni-icons type="right" size="20" color="#8a8a8a"></uni-icons>
            </button>
            <button @tap="showQrcode" open-type="navigate" class="center-list-item">
                <uni-icons type="hand-up-filled" size="30" color="#00c8fd"></uni-icons>
                <text class="list-text">赞赏支持</text>
                <uni-icons type="right" size="20" color="#8a8a8a"></uni-icons>
            </button>
        </view>
		<video-tab-bar :tabBar="videoTabBars" :activeIndex="1"/>
    </view>
</template>

<script>
import util from '../../../../utils/util.js';
import VideoTabBar from '../../../components/tabBar/index.vue';
import { videoTabBars } from '../../../../utils/business.js'
var app = getApp();
export default {
    components: {
		VideoTabBar
    },
    data() {
        return {
            dailyFreeParseNum: '--',
            totalParseNum: '--',
            userInfo: null,
            hasUserInfo: false,
			videoTabBars
        };
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function () {},
        onShow: function () {
            if (!app.globalData.checkIsLogin()) {
				this.hasUserInfo = false;
            }
            if (app.globalData.hasUserInfo) {
				this.userInfo = app.globalData.userInfo;
				this.hasUserInfo = app.globalData.hasUserInfo;
            }
            // 获取每日剩余免费解析次数
            this.getDailyFreeParseNum();
            // 获取当前用户总解析次数
            this.getTotalParseNum();
        },
        /**
         * 授权登录
         */
        getUserInfo(e) {
            if (e.detail.errMsg !== 'getUserInfo:ok') {
                uni.showToast({
                    title: '未授权，登录失败',
                    icon: 'none'
                });
                return false;
            }
            uni.showLoading({
                title: '正在登录',
                mask: true
            });
            // 执行登录
            app.globalData.getUserInfo((res) => {
				this.userInfo = app.globalData.userInfo;
				this.hasUserInfo = app.globalData.hasUserInfo;
                uni.hideLoading();
            });
        },
        /**
         * 获取当日免费次数
         * 使用本地存储，不走服务端
         */
        getDailyFreeParseNum() {
            var num;
            var today = util.formatDate(new Date(), '');
            var lastParseDate = uni.getStorageSync('lastParseDate');
            if (lastParseDate != today) {
                uni.setStorageSync('lastParseDate', today);
                uni.setStorageSync('dailyFreeParseNum', app.globalData.defaultDailyFreeParseNum);
                num = app.globalData.defaultDailyFreeParseNum;
            } else {
                num = uni.getStorageSync('dailyFreeParseNum');
            }
			this.dailyFreeParseNum = num;
        },
        /**
         * 获取总解析次数
         */
        getTotalParseNum() {
            app.globalData.apiRequest({
                url: '/records/total',
                success: (res) => {
					this.totalParseNum = res.data.total_num;
                }
            });
        },
        //打赏
        showQrcode() {
            uni.previewImage({
                urls: ['http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4'],
                current: 'http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4' // 当前显示图片的http链接
            });
        },
    },
    created: function () {}
};
</script>
<style>
/* pages/mini/mini.wxss */

page {
    background: #f5f5f5;
}

.cu-avatar {
    font-variant: small-caps;
    margin: 0;
    padding: 0;
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    color: var(--white);
    white-space: nowrap;
    position: relative;
    width: 64rpx;
    height: 64rpx;
    background-size: cover;
    background-position: center;
    vertical-align: middle;
    font-size: 1.5em;
}

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

.center {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.center .blue-top {
    width: 750rpx;
    height: 230rpx;
    background: #99ccff;
    border-radius: 0 0 350rpx 350rpx / 0 0 30rpx 30rpx;
    margin-bottom: 160rpx;
}

.center .blue-top .user-card {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 686rpx;
    height: 330rpx;
    background: #fff;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, 28rpx);
    -ms-transform: translate(-50%, 28rpx);
    transform: translate(-50%, 28rpx);
    border-radius: 20rpx;
}

.center .blue-top .user-card .card-top {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    height: 190rpx;
    position: relative;
}

.center .blue-top .user-card .card-top .user-top {
    width: 100%;
}

.center .blue-top .user-card .card-top .user-top .user-vip {
    width: 130rpx;
    height: 130rpx;
    margin: 0 auto;
	text-align: center;
}

.center .blue-top .user-card .card-top .user-top .user-vip .user-pic {
    overflow: hidden;
    display: block;
    width: 130rpx;
    height: 130rpx;
    border-radius: 50%;
    margin: 0 auto;
    background: #fff;
}

.center .blue-top .user-card .card-top .user-top .user-board {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.center .blue-top .user-card .card-top .user-top .user-board .user-name {
    color: #666;
    font-size: 36rpx;
    font-weight: bold;
}

.center .blue-top .user-card .card-top .user-top .user-board .vip-icon {
    display: block;
    width: 44rpx;
    height: 44rpx;
    margin-left: 17rpx;
    margin-top: 2rpx;
}

.center .blue-top .user-card .card-bottom {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 140rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    padding: 18rpx 0;
}

.center .blue-top .user-card .card-bottom .left {
    width: 50%;
    border-right: 1px solid #eee;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.center .blue-top .user-card .card-bottom .right {
    width: 50%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.center .blue-top .user-card .card-bottom .count {
    color: #999;
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
}

.center .blue-top .user-card .card-bottom .count .num {
    color: #00c8fd;
    display: inline;
}

.center .blue-top .user-card .card-bottom .txt {
    color: #1f1f1f;
    font-size: 24rpx;
}

.center-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    margin-top: 20rpx;
    width: 686rpx;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0 auto;
    border-radius: 20rpx;
    overflow: hidden;
}

.center-list-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 114rpx;
    width: 686rpx;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 0rpx 32rpx;
    border-bottom-width: 1px;
    border-color: #eee;
    border-bottom-style: solid;
	align-items: center;
}

.center-list-item:last-child {
    border-bottom: 0;
}

.center-list-item .icon1 {
    display: block;
    width: 50rpx;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50rpx 50rpx;
    color: #00c8fd;
    text-align: left;
    margin-right: 28rpx;
}

.list-text {
    height: 114rpx;
    line-height: 114rpx;
    color: #1f1f1f;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
    font-size: 28rpx;
	margin-left: 15rpx;
}

.icon2 {
    display: block;
    height: 114rpx;
    width: 40rpx;
    line-height: 114rpx;
    color: #8a8a8a;
    text-align: right;
}

.relief {
    font-size: 24rpx;
    color: #999;
    text-align: center;
    padding-top: 30rpx;
}
</style>
