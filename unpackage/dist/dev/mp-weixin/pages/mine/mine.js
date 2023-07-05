"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_util = require("../../utils/util.js");
var app = getApp();
const _sfc_main = {
  components: {},
  data() {
    return {
      dailyFreeParseNum: "--",
      totalParseNum: "--",
      userInfo: null,
      hasUserInfo: false
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
        this.hasUserInfo = false;
      }
      if (app.globalData.hasUserInfo) {
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = app.globalData.hasUserInfo;
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
        this.userInfo = app.globalData.userInfo;
        this.hasUserInfo = app.globalData.hasUserInfo;
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
      this.dailyFreeParseNum = num;
    },
    /**
     * 获取总解析次数
     */
    getTotalParseNum() {
      app.globalData.apiRequest({
        url: "/records/total",
        success: (res) => {
          this.totalParseNum = res.data.total_num;
        }
      });
    },
    //打赏
    showQrcode() {
      common_vendor.index.previewImage({
        urls: ["http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4"],
        current: "http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4"
        // 当前显示图片的http链接
      });
    }
  },
  created: function() {
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasUserInfo
  }, !$data.hasUserInfo ? {
    b: common_vendor.p({
      type: "contact",
      size: "50",
      color: "#ccc"
    })
  } : {
    c: $data.userInfo.avatarUrl
  }, {
    d: !$data.hasUserInfo
  }, !$data.hasUserInfo ? {
    e: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {}, {
    f: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    g: common_vendor.t($data.userInfo.nickName)
  } : {}, {
    h: common_vendor.t($data.dailyFreeParseNum),
    i: common_vendor.t($data.totalParseNum),
    j: common_vendor.p({
      type: "download-filled",
      size: "30",
      color: "#00c8fd"
    }),
    k: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    l: common_vendor.p({
      type: "phone-filled",
      size: "30",
      color: "#00c8fd"
    }),
    m: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    n: common_vendor.p({
      type: "redo-filled",
      size: "30",
      color: "#00c8fd"
    }),
    o: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    p: common_vendor.p({
      type: "hand-up-filled",
      size: "30",
      color: "#00c8fd"
    }),
    q: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    r: common_vendor.o((...args) => $options.showQrcode && $options.showQrcode(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
