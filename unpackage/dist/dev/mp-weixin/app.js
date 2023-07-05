"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_share = require("./utils/share.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/sudokuClimp/sudokuClimp.js";
  "./pages/joinImages/joinImages.js";
  "./pages/mine/mine.js";
  "./pages/videos/watermark/index/index.js";
  "./pages/videos/watermark/video/video.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    apiDomain: "http://127.0.0.1:8000/api",
    //生产
    downloadPrefix: "http://127.0.0.1:8000/download?url=",
    // 通过代理服务器中转（微信限制资源域名，不同平台cdn域名千变万化）
    defaultDailyFreeParseNum: 10,
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
                console.log(1);
                common_vendor.index.getUserInfo({
                  success: (res3) => {
                    console.log(2);
                    this.userInfo = res3.userInfo;
                    this.hasUserInfo = true;
                    if (!this.checkIsLogin()) {
                      console.log(3);
                      this.getToken(code, res3.encryptedData, res3.iv);
                    }
                    if (callback) {
                      callback(res3);
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
    apiRequest: function(options) {
      common_vendor.index.request({
        url: this.apiDomain + options.url,
        method: options.method ? options.method : "GET",
        header: {
          Authorization: "Bearer " + common_vendor.index.getStorageSync("token"),
          Accept: "application/json"
        },
        dataType: "json",
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
    getToken(code, encryptedData, iv, callback = null) {
      this.apiRequest({
        url: "/auth/login",
        method: "POST",
        data: {
          code,
          data: encryptedData,
          iv
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.token);
          if (callback) {
            callback();
          }
        }
      });
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
