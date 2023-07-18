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
      app,
      isLogin: app.globalData.checkIsLogin()
    };
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
    },
    onShow: function() {
      if (this.isLogin) {
        this.getTotalParseNum();
      }
      this.getDailyFreeParseNum();
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
        const { code } = res;
        if (code === 200)
          this.isLogin = true;
      });
    },
    /**
     * 获取当日免费次数
     * 使用本地存储，不走服务端
     */
    getDailyFreeParseNum() {
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
      this.dailyFreeParseNum = num;
    },
    /**
     * 获取总解析次数
     */
    getTotalParseNum() {
    },
    //打赏
    showQrcode() {
      common_vendor.index.previewImage({
        urls: ["http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4"],
        current: "http://photocq.photo.store.qq.com/psc?/V10npdo11GG6Tp/es2MkY2PTea.oVL6KUJJIFOSmcKTHd*Cuyf*6EvWFnIzJ.pRRfl1cROyN3XzE6b599JWHEkkwi6i4rHrpms87g!!/b&bo=kAEVAZABFQEDCC0!&rf=viewer_4"
        // 当前显示图片的http链接
      });
    },
    handleEdit() {
      common_vendor.index.navigateTo({
        url: "/pages/mine/edit/edit"
      });
    }
  },
  created: function() {
    this.onShow();
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
    a: !$data.isLogin
  }, !$data.isLogin ? {} : {}, {
    b: $data.isLogin
  }, $data.isLogin ? {
    c: common_vendor.o((...args) => $options.handleEdit && $options.handleEdit(...args))
  } : {}, {
    d: !$data.isLogin
  }, !$data.isLogin ? {
    e: common_vendor.p({
      type: "contact",
      size: "50",
      color: "#ccc"
    })
  } : {
    f: $data.app.globalData.userInfo.avatarUrl
  }, {
    g: !$data.isLogin
  }, !$data.isLogin ? {
    h: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {}, {
    i: $data.isLogin
  }, $data.isLogin ? {
    j: common_vendor.t($data.app.globalData.userInfo.nickname)
  } : {}, {
    k: common_vendor.t($data.dailyFreeParseNum),
    l: common_vendor.t($data.totalParseNum),
    m: common_vendor.p({
      type: "download-filled",
      size: "30",
      color: "#00c8fd"
    }),
    n: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    o: common_vendor.p({
      type: "phone-filled",
      size: "30",
      color: "#00c8fd"
    }),
    p: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    q: common_vendor.p({
      type: "redo-filled",
      size: "30",
      color: "#00c8fd"
    }),
    r: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    s: common_vendor.p({
      type: "hand-up-filled",
      size: "30",
      color: "#00c8fd"
    }),
    t: common_vendor.p({
      type: "right",
      size: "20",
      color: "#8a8a8a"
    }),
    v: common_vendor.o((...args) => $options.showQrcode && $options.showQrcode(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
