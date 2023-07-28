"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_business = require("./utils/business.js");
const utils_share = require("./utils/share.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/sudokuClimp/sudokuClimp.js";
  "./pages/joinImages/joinImages.js";
  "./pages/mine/mine.js";
  "./pages/mine/edit/edit.js";
  "./pages/mine/history.js";
  "./pages/videos/watermark/index/index.js";
  "./pages/videos/watermark/video/video.js";
  "./pages/ai/chat/index.js";
  "./pages/ai/capability/capability.js";
  "./pages/ai/fortune-telling/fortune-telling.js";
}
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const _sfc_main = {
  onLaunch: async function() {
    utils_business.initUserInfo.call(this);
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上 123123！");
    console.log("App Launch");
  },
  onShow: function() {
    this.refreshToken();
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    userDefaultLogin: () => {
      common_vendor.index.login({
        async success(res) {
          const uniIdCo = common_vendor.Ds.importObject("uni-id-co");
          const logined = await uniIdCo.loginByWeixin({
            code: res.code
          });
          console.log("logined:", logined);
        }
      });
    },
    refreshToken() {
      const tokenExpired = common_vendor.index.getStorageSync("uni_id_token_expired") || 0;
      const token = common_vendor.index.getStorageSync("token");
      const currentTime = Date.now();
      const tokenIsExpired = tokenExpired - currentTime < 10 * 3600;
      console.log("tokenIsExpired:", tokenIsExpired);
      const uniCo = common_vendor.Ds.importObject("uni-id-co");
      if (tokenIsExpired && token) {
        uniCo.refreshToken().then((res) => {
          console.log("刷新token:", res);
          const { newToken: { token: token2, tokenExpired: tokenExpired2 } } = res;
          common_vendor.index.setStorageSync("token", token2);
          common_vendor.index.setStorageSync("uni_id_token", token2);
          common_vendor.index.setStorageSync("uni_id_token_expired", tokenExpired2);
        }, (error) => {
          console.log("刷新失败：", error);
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        });
      }
      console.log("tokenIsExpired:", tokenIsExpired);
    }
  },
  globalData: {
    userInfo: {
      avatar: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      nickname: "小白"
    },
    hasUserInfo: false,
    apiDomain: "http://127.0.0.1:8000/api",
    txAPIToken: "TOMTWTRw2ZiZ0W",
    txAPITokenSecret: "c10181f23359f4139a479723f04eb502",
    //生产
    downloadPrefix: "http://127.0.0.1:8000/download?url=",
    // 通过代理服务器中转（微信限制资源域名，不同平台cdn域名千变万化）
    defaultDailyFreeParseNum: 30,
    /**
     * 登陆并获取用户信息、token
     * @param {*} callback
     */
    getUserInfo: function(callback = null) {
      common_vendor.index.login({
        success: (res) => {
          var code = res.code;
          common_vendor.index.getSetting({
            success: (res2) => {
              if (res2.authSetting["scope.userInfo"]) {
                common_vendor.index.getUserInfo({
                  success: (res3) => {
                    if (!this.checkIsLogin()) {
                      this.getToken(code, res3.encryptedData, res3.inviteCode).then((res4) => {
                        if (callback) {
                          common_vendor.index.hideLoading();
                          callback({ code: 200, data: res4 });
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
          common_vendor.index.hideLoading();
        }
      });
    },
    //全局统一调用接口的方法
    apiRequest: function(options) {
      const url = options.fullUrl ? options.fullUrl : this.apiDomain + options.url;
      common_vendor.index.request({
        url,
        method: options.method ? options.method : "GET",
        header: {
          Authorization: "Bearer " + common_vendor.index.getStorageSync("token"),
          Accept: "application/json"
        },
        dataType: "json",
        data: { ...options.data, token: "TOMTWTRw2ZiZ0W" },
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
              common_vendor.index.showToast({
                title: "请求地址不存在",
                icon: "none"
              });
              break;
            default:
              common_vendor.index.showToast({
                title: "出错了～请稍后再试",
                icon: "none"
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
      if (common_vendor.index.getStorageSync("token") != "") {
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
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.showToast({
        title: "请先登录!",
        icon: "none",
        success: (res) => {
          common_vendor.index.switchTab({
            url: "/pages/mine/mine"
          });
        }
      });
    },
    /**
     * 获取token
     */
    async getToken(code, encryptedData, inviteCode, callback = null) {
      this.userInfo;
      const uniCo = common_vendor.Ds.importObject("uni-id-co");
      try {
        const res = await uniCo.loginByWeixin({ code, inviteCode });
        const { token } = res.newToken;
        console.log("this-getToken:", this);
        const tempFiles = await utils_business.initUserInfo.call(this, token);
        console.log("tempFiles:", tempFiles);
        common_vendor.index.showToast({
          title: "登录成功！",
          icon: "success",
          success: (res2) => {
            common_vendor.index.setStorageSync("token", token);
          }
        });
        return tempFiles;
        console.log("res:", res);
      } catch (e) {
        console.log("error:", e);
      }
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/mztools_uni/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.mixin(utils_share.share);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
