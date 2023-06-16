<template>
    <view class="wrap">
        <video class="video-box" :src="dataUrl" :poster="dataImage" v-if="preview != 0 && dataUrl != ''"></video>
        <image class="video-box" :src="dataImage" v-else></image>
        <view style="font-size: 10px; text-align: center; color: #858585">服务器带宽较小，建议直接复制地址浏览器下载</view>
        <button @getuserinfo="postSave" class="parsing" openType="getUserInfo">保存到相册</button>
        <button @tap="copyUrl" class="parsing copy-url">复制地址</button>
        <button @tap="goBack" class="parsing go-back">返回首页</button>
    </view>
</template>

<script>
//获取应用实例
var app = getApp();
var n = '';
export default {
    data() {
        return {
            dataUrl: '',
            dataImage: '',
            preview: 0
        };
    },
    onLoad: function (options) {
        this.setData({
            dataUrl: decodeURIComponent(options.url),
            dataImage: decodeURIComponent(options.image),
            preview: options.preview
        });
    },
    onUnload: function () {
        if (n) {
            n.abort();
        }
    },
    methods: {
        goBack: function () {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },

        copyUrl: function () {
            uni.setClipboardData({
                data: this.dataUrl,
                success: function (a) {
                    uni.showToast({
                        title: '复制成功',
                        duration: 1200
                    });
                }
            });
        },

        download: function () {
            var that = this;
            var e = app.globalData.downloadPrefix + that.dataUrl; // 无法直接下载资源域下的资源，需要通过nginx中转一层
            uni.showLoading({
                title: '保存中 0%'
            });
            (n = uni.downloadFile({
                url: e,
                success: function (o) {
                    uni.hideLoading();
                    uni.saveVideoToPhotosAlbum({
                        filePath: o.tempFilePath,
                        success: function (o) {
                            that.showToast('保存成功', 'success');
                            setTimeout(function () {
                                uni.setClipboardData({
                                    data: ''
                                });
                                that.goBack();
                            }, 1000);
                        },
                        fail: function (o) {
                            that.showToast('保存失败');
                        }
                    });
                },
                fail: function (o) {
                    n = null;
                    uni.hideLoading();
                    that.showToast('下载失败');
                }
            })).onProgressUpdate(function (o) {
                if (100 === o.progress) {
                    ('');
                } else {
                    uni.showLoading({
                        title: '保存中 ' + o.progress + '%'
                    });
                }
            });
        },

        postSave: function (o) {
            var that = this;
            uni.getSetting({
                success: function (o) {
                    if (o.authSetting['scope.writePhotosAlbum']) {
                        that.download();
                    } else {
                        uni.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: function () {
                                that.download();
                            },
                            fail: function (o) {
                                uni.showModal({
                                    title: '提示',
                                    content: '视频保存到相册需获取相册权限请允许开启权限',
                                    confirmText: '确认',
                                    cancelText: '取消',
                                    success: function (o) {
                                        if (o.confirm) {
                                            uni.openSetting({
                                                success: function (o) {}
                                            });
                                        } else {
                                            ('');
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },

        showToast: function (o) {
            if (arguments.length > 1 && void 0 !== arguments[1]) {
                var t = arguments[1];
            } else {
                var t = 'none';
            }
            if (arguments.length > 2 && void 0 !== arguments[2]) {
                var n = arguments[2];
            } else {
                var n = 1500;
            }
            uni.showToast({
                title: o,
                icon: t,
                duration: n
            });
        }
    }
};
</script>
<style>
.video-box {
    display: block;
    width: 560rpx;
    height: 700rpx;
    margin: 40rpx auto;
}

.parsing {
    overflow: hidden;
    display: block;
    width: 664rpx;
    height: 88rpx;
    line-height: 88rpx;
    color: #fff;
    background-color: #337aff;
    box-shadow: 0 14rpx 28rpx rgba(51, 122, 255, 0.3);
}

.copy-url {
    color: #fff;
    background-color: green;
    border: 1px solid rgba(5, 5, 5, 0.1);
    box-shadow: none;
    margin-top: 40rpx;
}

.go-back {
    color: #000;
    background-color: #f8f8f8;
    border: 1px solid rgba(5, 5, 5, 0.1);
    box-shadow: none;
    margin-top: 40rpx;
}
</style>
