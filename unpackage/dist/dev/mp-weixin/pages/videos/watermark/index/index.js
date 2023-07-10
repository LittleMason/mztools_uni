"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_util = require("../../../../utils/util.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      videoUrl: "https://v.douyin.com/JxHkvPT/"
    };
  },
  onLoad: function() {
  },
  onShow() {
    common_vendor.index.getClipboardData({
      success: (res) => {
        var str = res.data.trim();
        if (this.regUrl(str)) {
          common_vendor.index.showModal({
            title: "检测到剪切板有视频地址，是否自动填入？",
            success: (res2) => {
              if (res2.confirm) {
                this.videoUrl = str;
              }
            }
          });
        }
      }
    });
  },
  methods: {
    // 清空输入框
    inputClear: function() {
      this.videoUrl = "";
    },
    // 视频地址匹配是否合法
    regUrl: function(t) {
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(t);
    },
    submit: function() {
      var num;
      var today = utils_util.util.formatDate(new Date(), "");
      var lastParseDate = common_vendor.index.getStorageSync("lastParseDate");
      if (lastParseDate != today) {
        common_vendor.index.setStorageSync("lastParseDate", today);
        common_vendor.index.setStorageSync("dailyFreeParseNum", app.globalData.defaultDailyFreeParseNum);
        num = app.globalData.defaultDailyFreeParseNum;
      } else {
        num = common_vendor.index.getStorageSync("dailyFreeParseNum");
      }
      if (num > 0) {
        this.parseVideo();
      } else {
        common_vendor.index.showToast({
          title: "免费解析次数已用完！",
          icon: "none"
        });
      }
    },
    // 视频解析
    parseVideo: function() {
      app.globalData.apiRequest({
        url: "/video-parse",
        method: "POST",
        data: {
          url: this.videoUrl
        },
        success: (res) => {
          var noWaterUrl = encodeURIComponent(res.data.url);
          var imageUrl = encodeURIComponent(res.data.image);
          var preview = res.data.preview;
          common_vendor.index.setStorageSync("dailyFreeParseNum", common_vendor.index.getStorageSync("dailyFreeParseNum") - 1);
          common_vendor.index.navigateTo({
            url: "../video/video?url=" + noWaterUrl + "&image=" + imageUrl + "&preview=" + preview
          });
        },
        fail: (res) => {
          console.log("res:", res);
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "error"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n("swiper-item " + _ctx.item),
    b: common_vendor.n("swiper-item " + _ctx.item),
    c: $data.videoUrl,
    d: common_vendor.o(($event) => $data.videoUrl = $event.detail.value),
    e: $data.videoUrl == ""
  }, $data.videoUrl == "" ? {} : {}, {
    f: common_vendor.o((...args) => $options.inputClear && $options.inputClear(...args)),
    g: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/videos/watermark/index/index.vue"]]);
wx.createPage(MiniProgramPage);
