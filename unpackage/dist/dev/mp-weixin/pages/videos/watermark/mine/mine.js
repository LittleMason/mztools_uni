"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_util = require("../../../../utils/util.js");
const utils_business = require("../../../../utils/business.js");
const icon = () => "./icon/index.js";
const VideoTabBar = () => "../../../components/tabBar/index.js";
var app = getApp();
const _sfc_main = {
  components: {
    icon,
    VideoTabBar
  },
  data() {
    return {
      dailyFreeParseNum: "--",
      totalParseNum: "--",
      userInfo: null,
      hasUserInfo: false,
      videoTabBars: utils_business.videoTabBars
    };
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
    },
    onShow: function() {
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
      this.getDailyFreeParseNum();
      this.getTotalParseNum();
    },
    /**
     * 授权登录
     */
    getUserInfo(e) {
      if (e.detail.errMsg !== "getUserInfo:ok") {
        common_vendor.index.showToast({
          title: "未授权，登录失败",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading({
        title: "正在登录",
        mask: true
      });
      app.globalData.getUserInfo((res) => {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.hasUserInfo
        });
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 获取当日免费次数
     * 使用本地存储，不走服务端
     */
    getDailyFreeParseNum() {
      var num;
      var today = utils_util.util.formatDate(/* @__PURE__ */ new Date(), "");
      var lastParseDate = common_vendor.index.getStorageSync("lastParseDate");
      if (lastParseDate != today) {
        common_vendor.index.setStorageSync("lastParseDate", today);
        common_vendor.index.setStorageSync("dailyFreeParseNum", app.globalData.defaultDailyFreeParseNum);
        num = app.globalData.defaultDailyFreeParseNum;
      } else {
        num = common_vendor.index.getStorageSync("dailyFreeParseNum");
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
        url: "/records/total",
        success: (res) => {
          this.setData({
            totalParseNum: res.data.total_num
          });
        }
      });
    },
    //打赏
    showQrcode() {
      common_vendor.index.previewImage({
        urls: ["https://m1-1253159997.image.myqcloud.com/images/f58330a41a41d8776db5a7860eb2c9b5.JPG"],
        current: "https://m1-1253159997.image.myqcloud.com/images/f58330a41a41d8776db5a7860eb2c9b5.JPG"
        // 当前显示图片的http链接
      });
    },
    //分享小程序
    onShareAppMessage: function() {
      return {
        title: this.config_base_list.share_title ? this.config_base_list.share_title : "推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用",
        path: "/pages/index/index",
        imageUrl: this.config_base_list.share_imageUrl ? this.config_base_list.share_imageUrl : "/static/images/share.jpg",
        success: function(e) {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success",
            duration: 2e3
          });
        },
        fail: function(e) {
          common_vendor.index.showToast({
            title: "分享失败",
            icon: "none",
            duration: 2e3
          });
        }
      };
    }
  },
  created: function() {
  }
};
if (!Array) {
  const _component_video_tab_bar = common_vendor.resolveComponent("video-tab-bar");
  _component_video_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasUserInfo ? $data.userInfo.avatarUrl : "/static/images/my.png",
    b: !$data.hasUserInfo
  }, !$data.hasUserInfo ? {
    c: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {}, {
    d: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    e: common_vendor.t($data.userInfo.nickName)
  } : {}, {
    f: common_vendor.t($data.dailyFreeParseNum),
    g: common_vendor.t($data.totalParseNum),
    h: common_vendor.o((...args) => $options.showQrcode && $options.showQrcode(...args)),
    i: common_vendor.p({
      tabBar: $data.videoTabBars,
      activeIndex: 1
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/videos/watermark/mine/mine.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
