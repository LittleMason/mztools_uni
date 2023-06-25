<template>
    <view style="height: 100%">
        <view class="no-data" v-if="!list || list.length == 0">暂无相关信息~</view>
        <view class="container">
            <view class="scroll-gap"></view>
            <view class="video-box shadow" v-for="(item, index) in list" :key="index">
                <view class="video-btm">
                    <view class="video-title ellipsis" @tap="Copy_video_info" @longpress="Copy_video_info" :data-content="item.url" data-tip="复制成功">{{ item.url }}</view>
                    <button :data-content="item" openType="share">
                        <icon color="#9cf" :size="30" type="share"></icon>
                    </button>
                </view>

                <view class="video-cover" v-if="preview != 0">
                    <image
                        class="video-cover-poster"
                        mode="aspectFit"
                        :src="item.image_url"
                        @tap="Copy_video_info"
                        @longpress="Copy_video_info"
                        :data-content="item.image_url"
                        data-tip="图片链接已复制"
                    ></image>
                    <icon @tap="videoPlay" :data-idx="index" class="video-cover-icon" color="#00c8fd" :size="55" type="bofang"></icon>
                    <text class="video-date">{{ item.updated_at }}</text>
                </view>

                <view class="btn">
                    <button class="btn-left" @tap="Copy_video_info" @longpress="Copy_video_info" :data-content="item.url" data-tip="视频地址已复制">复制链接</button>
                    <button class="btn-center" @tap="Download" :data-link="item.url">重新下载</button>
                    <button class="btn-right" @tap="DEL" :data-key="index" :data-id="item.id">删除记录</button>
                </view>
            </view>
            <view class="scroll-gap"></view>
        </view>
    </view>
</template>

<script>
// pages/history/history.js
var app = getApp();

// 在页面中定义插屏广告

export default {
    components: {
    },
    data() {
        return {
            list: [],
            page: 1,
            loading: false,

            // loading标识，防止多次请求
            preview: 0,

            downloadIndex: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function () {},
        onShow: function () {
            this.history();
        },
        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {
            this.setData({
                page: this.page + 1
            });
            this.history();
        },
        /**
         * 历史解析记录
         */
        history: function () {
            this.setData({
                loading: true
            });
            uni.showLoading({
                title: '加载中...'
            });
            app.globalData.apiRequest({
                url: '/records',
                data: {
                    page: this.page
                },
                success: (res) => {
                    console.log(res);
                    this.setData({
                        list: this.list.concat(res.data.data),
                        preview: res.data.preview
                    });
                },
                complete: (res) => {
                    this.setData({
                        loading: false
                    });
                    uni.hideLoading();
                }
            });
        },
        videoPlay: function (e) {
            var t = e.currentTarget.dataset.idx;
            var a = this.downloadIndex;
            if (a) {
                var n = uni.createVideoContext('download' + a);
                n.seek(0);
                n.pause();
                this.setData({
                    downloadIndex: t
                });
                uni.createVideoContext('download' + a).play();
            } else {
                this.setData({
                    downloadIndex: t
                });
                uni.createVideoContext('download' + t).play();
            }
        },
        /**
         * 重新下载
         * 复制原始链接跳转首页重新让用户解析
         * @param e
         */
        Download: function (e) {
            console.log(e);
            uni.setClipboardData({
                data: e.currentTarget.dataset.link
            });
            uni.reLaunch({
                url: '/pages/index/index'
            });
        },
        DEL: function (e) {
            var id = e.currentTarget.dataset.id;
            var key = e.currentTarget.dataset.key;
            uni.showModal({
                title: '提示',
                content: '你确定要删除吗？',
                success: (res) => {
                    if (res.confirm) {
                        app.globalData.apiRequest({
                            url: '/records/' + id,
                            method: 'DELETE',
                            success: (res) => {
                                this.list.splice(key, 1);
                                this.setData({
                                    list: this.list
                                });
                            }
                        });
                    } else if (res.cancel) {
                    }
                }
            });
        },
        //复制视频详情内容
        Copy_video_info: function (t) {
            uni.setClipboardData({
                data: t.currentTarget.dataset.content,
                success: function (a) {
                    uni.showToast({
                        title: t.currentTarget.dataset.tip,
                        duration: 1200
                    });
                }
            });
        },
        onShareAppMessage: function (e) {
            if ('button' === e.from) {
                var i = e.target.dataset.content;
                return {
                    title: i.title,
                    imageUrl: i.cover,
                    path: '/pages/index/index?history=' + i.url
                };
            }
            return {
                title: this.config_data_list.share_title,
                path: '/pages/index/index',
                imageUrl: this.config_data_list.share_imageUrl,
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
page {
    background: #f5f5f5;
}
.container {
    padding: 0;
}

.no-data {
    text-align: center;
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

.user-info-btn {
    display: block;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    text-align: left;
}

.user-info-btn:after {
    padding: 0;
    margin: 0;
    background: none;
    border: none;
}

.index-tab {
    width: 750rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background: #fff;
    height: 90rpx;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}

.index-tab-item {
    flex: 1;
    height: 90rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b3b3b3;
    font-weight: bold;
    background: #fff;
}

.index-tab-item.active {
    color: #333;
    position: relative;
}

.index-tab-item.active::before {
    content: '';
    display: block;
    width: 100rpx;
    height: 4rpx;
    background: #333;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -50rpx;
}

.scroll-gap {
    height: 10rpx;
}

.music-box {
    width: 710rpx;
    background: #f2d14f;
    margin: 0 auto;
}

.music-item {
    width: 710rpx;
    margin: 0 auto;
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: flex-start;
    height: 120rpx;
    border-bottom: 1px solid #eee;
}

.music-audio {
    width: 80rpx;
    height: 80rpx;
    position: relative;
    margin-left: 20rpx;
    border-radius: 8rpx;
    overflow: hidden;
}

.music-img {
    width: 80rpx;
    height: 80rpx;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}

.music-icon {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    left: 10rpx;
    top: 10rpx;
    z-index: 2;
}

.music-content {
    width: 500rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333;
    font-size: 28rpx;
    margin-left: 20rpx;
    height: 120rpx;
}

.music-title-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.music-title {
    max-width: 320rpx;
}

.music-author {
    font-size: 22rpx;
    color: #8d9099;
    margin-top: 10rpx;
}

.music-iconfont {
    width: 20rpx;
    height: 20rpx;
    margin-right: 4rpx;
}

.music-hot {
    width: 150rpx;
    margin-left: 10rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #8d9099;
}

.music-hot-icon {
    width: 30rpx;
    height: 30rpx;
}

.music-btns {
    width: 60rpx;
    height: 90rpx;
    margin-right: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

.icon-copy {
    color: #9cc;
    padding: 0 8rpx 0 8rpx;
}

.icon-download {
    color: #ccf;
    padding: 0 8rpx 0 8rpx;
}

.icon-share2 {
    color: #9cf;
    font-size: 50rpx;
}

.icon-play2 {
    color: #ccc;
}

.video-list {
    width: 100%;
}

.video-box {
    width: 670rpx;
    padding: 20rpx;
    margin: 0 auto 20rpx;
    background: #fff;
    border-radius: 4rpx;
}

.video-item {
    width: 100%;
    height: 260rpx;
}

.video-cover {
    width: 100%;
    height: 260rpx;
    background: #171a23;
    position: relative;
}

.video-cover-poster {
    width: 100%;
    height: 260rpx;
}

.video-cover-icon {
    position: absolute;
    left: 45%;
    bottom: 40%;
}

.video-date {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #999;
    text-align: center;
    font-size: 22rpx;
    width: 150rpx;
}

.video-title-box {
    height: 50rpx;
    font-size: 24rpx;
    color: #333;
    margin-bottom: 20rpx;
}

.video-btm {
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.video-title {
    width: 600rpx;
    color: #666;
    font-size: 24rpx;
}

.video-name-box {
    justify-content: flex-start;
}

.video-name {
    max-width: 440rpx;
}

.video-avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}

.btn {
    padding-top: 15rpx;
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-left {
    float: left;
    width: 33%;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    background: #00c8fd;
    display: block;
    border-radius: 10rpx;
    font-size: 30rpx;
}

.btn-center {
    float: left;
    width: 33%;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    background: #39b54a;
    display: block;
    border-radius: 10rpx;
    font-size: 30rpx;
}

.btn-right {
    float: left;
    width: 33%;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    background: #ec2b2b;
    display: block;
    border-radius: 10rpx;
    font-size: 30rpx;
}
</style>
