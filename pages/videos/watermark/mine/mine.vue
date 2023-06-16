<template>
    <view class="center">
        <view class="blue-top">
            <view class="user-card">
                <view class="card-top">
                    <view class="user-top">
                        <view class="user-vip" style="position: relative">
                            <image class="user-pic" :src="hasUserInfo ? userInfo.avatarUrl : '/static/images/my.png'"></image>
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
                <icon class="icon1" color="#00c8fd" :size="50" type="download"></icon>
                <text class="list-text">下载记录查询</text>
                <icon class="icon2" color="#8a8a8a" :size="30" type="youjiantou"></icon>
            </navigator>
            <!-- navigator target="miniProgram"/ -->
            <button class="center-list-item" openType="contact">
                <icon class="icon1" color="#00c8fd" :size="50" type="kefu"></icon>
                <text class="list-text">联系客服</text>
                <icon class="icon2" color="#8a8a8a" :size="30" type="youjiantou"></icon>
            </button>
            <button class="center-list-item" openType="share">
                <icon class="icon1" color="#00c8fd" :size="40" type="share"></icon>
                <text class="list-text">分享</text>
                <icon class="icon2" color="#8a8a8a" :size="30" type="youjiantou"></icon>
            </button>
            <button @tap="showQrcode" open-type="navigate" class="center-list-item">
                <icon class="icon1" color="#00c8fd" :size="50" type="zan1"></icon>
                <text class="list-text">赞赏支持</text>
                <icon class="icon2" color="#8a8a8a" :size="30" type="youjiantou"></icon>
            </button>
        </view>
        <view class="relief">© 2020 yaqi.wang</view>
		<video-tab-bar :tabBar="videoTabBars" :activeIndex="1"/>
    </view>
</template>

<script>
import icon from './icon/index';
import util from '../../../../utils/util.js';
import VideoTabBar from '../../../components/tabBar/index.vue';
import { videoTabBars } from '../../../../utils/business.js'
var app = getApp();
export default {
    components: {
        icon,
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
                this.setData({
                    hasUserInfo: false
                });
            }
            if (app.globalData.hasUserInfo) {
                this.setData({
                    userInfo: app.globalData.userInfo,
                    hasUserInfo: app.globalData.hasUserInfo
                });
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
                this.setData({
                    userInfo: app.globalData.userInfo,
                    hasUserInfo: app.globalData.hasUserInfo
                });
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
            this.setData({
                dailyFreeParseNum: num
            });
        },
        /**
         * 获取总解析次数
         */
        getTotalParseNum() {
            app.globalData.apiRequest({
                url: '/records/total',
                success: (res) => {
                    this.setData({
                        totalParseNum: res.data.total_num
                    });
                }
            });
        },
        //打赏
        showQrcode() {
            uni.previewImage({
                urls: ['https://m1-1253159997.image.myqcloud.com/images/f58330a41a41d8776db5a7860eb2c9b5.JPG'],
                current: 'https://m1-1253159997.image.myqcloud.com/images/f58330a41a41d8776db5a7860eb2c9b5.JPG' // 当前显示图片的http链接
            });
        },

        //分享小程序
        onShareAppMessage: function () {
            return {
                title: this.config_base_list.share_title ? this.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
                path: '/pages/index/index',
                imageUrl: this.config_base_list.share_imageUrl ? this.config_base_list.share_imageUrl : '/static/images/share.jpg',
                success: function (e) {
                    uni.showToast({
                        title: '分享成功',
                        icon: 'success',
                        duration: 2000
                    });
                },
                fail: function (e) {
                    uni.showToast({
                        title: '分享失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            };
        }
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
    position: absolute;
    top: -26rpx;
}

.center .blue-top .user-card .card-top .user-top .user-vip {
    width: 130rpx;
    height: 130rpx;
    margin: 0 auto;
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
    margin-top: 20rpx;
}

.center .blue-top .user-card .card-top .user-top .user-board .user-name {
    color: #1f1f1f;
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
}

.center-list-item:last-child {
    border-bottom: 0;
}

.center-list-item .icon1 {
    display: block;
    height: 114rpx;
    width: 50rpx;
    line-height: 114rpx;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50rpx 50rpx;
    color: #00c8fd;
    text-align: left;
    margin-right: 18rpx;
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
