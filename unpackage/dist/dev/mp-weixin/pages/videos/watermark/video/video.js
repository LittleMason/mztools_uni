"use strict";
const common_vendor = require("../../../../common/vendor.js");
getApp();
var n = "";
const _sfc_main = {
  data() {
    return {
      dataUrl: "",
      dataImage: "",
      preview: 0,
      title: ""
    };
  },
  onLoad: function(options) {
    this.dataUrl = decodeURIComponent(options.url);
    this.dataImage = decodeURIComponent(options.image);
    this.title = decodeURIComponent(options.title);
    console.log("options:", options);
    this.preview = options.preview;
  },
  onUnload: function() {
    if (n) {
      n.abort();
    }
  },
  methods: {
    goBack: function() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    copyUrl: function() {
      common_vendor.index.setClipboardData({
        data: this.dataUrl,
        success: function(a) {
          common_vendor.index.showToast({
            title: "复制成功",
            duration: 1200
          });
        }
      });
    },
    download: function() {
      var that = this;
      var e = this.dataUrl;
      common_vendor.index.showLoading({
        title: "保存中 0%"
      });
      (n = common_vendor.index.downloadFile({
        url: e,
        success: function(o) {
          common_vendor.index.hideLoading();
          common_vendor.index.saveVideoToPhotosAlbum({
            filePath: o.tempFilePath,
            success: function(o2) {
              that.showToast("保存成功", "success");
              setTimeout(function() {
                common_vendor.index.setClipboardData({
                  data: ""
                });
                that.goBack();
              }, 1e3);
            },
            fail: function(o2) {
              that.showToast("保存失败");
            }
          });
        },
        fail: function(o) {
          n = null;
          common_vendor.index.hideLoading();
          that.showToast("下载失败");
        }
      })).onProgressUpdate(function(o) {
        if (100 === o.progress)
          ;
        else {
          common_vendor.index.showLoading({
            title: "保存中 " + o.progress + "%"
          });
        }
      });
    },
    postSave: function(o) {
      var that = this;
      common_vendor.index.getSetting({
        success: function(o2) {
          if (o2.authSetting["scope.writePhotosAlbum"]) {
            that.download();
          } else {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success: function() {
                that.download();
              },
              fail: function(o3) {
                common_vendor.index.showModal({
                  title: "提示",
                  content: "视频保存到相册需获取相册权限请允许开启权限",
                  confirmText: "确认",
                  cancelText: "取消",
                  success: function(o4) {
                    if (o4.confirm) {
                      common_vendor.index.openSetting({
                        success: function(o5) {
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    },
    showToast: function(o) {
      if (arguments.length > 1 && void 0 !== arguments[1]) {
        var t = arguments[1];
      } else {
        var t = "none";
      }
      if (arguments.length > 2 && void 0 !== arguments[2]) {
        var n2 = arguments[2];
      } else {
        var n2 = 1500;
      }
      common_vendor.index.showToast({
        title: o,
        icon: t,
        duration: n2
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.preview != 0 && $data.dataUrl != ""
  }, $data.preview != 0 && $data.dataUrl != "" ? {
    b: $data.dataUrl,
    c: $data.dataImage
  } : {
    d: $data.dataImage
  }, {
    e: common_vendor.t($data.title),
    f: common_vendor.o((...args) => $options.postSave && $options.postSave(...args)),
    g: common_vendor.o((...args) => $options.copyUrl && $options.copyUrl(...args)),
    h: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/videos/watermark/video/video.vue"]]);
wx.createPage(MiniProgramPage);
