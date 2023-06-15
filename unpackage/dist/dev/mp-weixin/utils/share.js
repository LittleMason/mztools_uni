"use strict";
const common_vendor = require("../common/vendor.js");
const share = {
  data() {
    return {
      //设置默认的分享参数
      //如果页面不设置share，就触发这个默认的分享
      share: {
        title: "曼珠工具箱",
        //自定义标题
        path: `/pages/index/index`,
        //默认跳转首页
        imageUrl: ""
        //可设置默认分享图，不设置默认截取头部5:4
      }
    };
  },
  onShareAppMessage(res) {
    let that = this;
    let pages = getCurrentPages();
    let nowPage = pages[pages.length - 1];
    that.share.path = `/${nowPage.route}`;
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res2) {
        console.log("success(res)==", res2);
        common_vendor.index.showToast({
          title: "分享成功"
        });
      },
      fail(res2) {
        console.log("fail(res)==", res2);
        common_vendor.index.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    };
  },
  onShareTimeline(res) {
    let that = this;
    let pages = getCurrentPages();
    let nowPage = pages[pages.length - 1];
    that.share.path = `/${nowPage.route}`;
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res2) {
        console.log("success(res)==", res2);
        common_vendor.index.showToast({
          title: "分享成功"
        });
      },
      fail(res2) {
        console.log("fail(res)==", res2);
        common_vendor.index.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    };
  }
};
exports.share = share;
