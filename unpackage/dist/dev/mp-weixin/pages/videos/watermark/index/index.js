"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_util = require("../../../../utils/util.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      videoUrl: "https://v.douyin.com/iF1TAe2/"
    };
  },
  onLoad: function() {
  },
  onShow() {
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
      var today = utils_util.util.formatDate(/* @__PURE__ */ new Date(), "");
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
    parsePlatform(url) {
      const domainArr = url.match(/:\/\/(.[^/]+)/)[1];
      console.log("domainArr:", domainArr);
      const domain = domainArr.split(":")[0];
      let platKey = "";
      const platUrlMap = {
        douyin: ["douyin.com"],
        weishi: ["qq.com"],
        kuaishou: ["kuaishou.com", "chenzhongtech.com", "kuaishouapp.com"],
        zuiyou: ["izuiyou.com"],
        pipixia: ["hulushequ.com", "pipix.com"],
        pipigaoxiao: ["ippzone.com"]
      };
      for (let key in platUrlMap) {
        const item = platUrlMap[key];
        item.forEach((item2) => {
          if (domain.indexOf(item2) > -1) {
            platKey = key;
          }
        });
      }
      return platKey;
    },
    matchUrl(str) {
      let match = str.match(/((https?|ftp):\/\/)?([A-Z0-9]+\.)+[A-Z]{2,6}(\/?[A-Z0-9]+\??([A-Z0-9]+\=[A-Z0-9]+(\&[A-Z0-9]+\=[A-Z0-9]+)*)?)*/gi);
      return match ? match[0] : "";
    },
    // 视频解析
    parseVideo: function() {
      const platforms = {
        douyin: "http://api.txapi.cn/v1/parse_short_video/dy",
        weishi: "http://api.txapi.cn/v1/parse_short_video/ws",
        kuaishou: "http://api.txapi.cn/v1/parse_short_video/ks",
        xiaohongshu: "http://api.txapi.cn/v1/parse_short_video/xhs",
        pipixia: "http://api.txapi.cn/v1/c/parse_short_video/ppx",
        zuiyou: "http://api.txapi.cn/v1/c/parse_short_video/zy"
      };
      const platformKey = this.parsePlatform(this.videoUrl);
      const fullUrl = platforms[platformKey];
      if (!fullUrl) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入正确的地址！"
        });
        return false;
      }
      const uniCo = common_vendor.Bs.importObject("request-agent-middleware");
      const datas = {
        token: app.globalData.txAPIToken,
        url: this.matchUrl(this.videoUrl)
      };
      uniCo.agent(fullUrl, datas, { method: "GET" }).then((res) => {
        const {
          code,
          data
        } = res.data;
        if (code === 200) {
          const {
            cover_url,
            video_url,
            title
          } = data;
          common_vendor.index.setStorageSync("dailyFreeParseNum", common_vendor.index.getStorageSync("dailyFreeParseNum") - 1);
          common_vendor.index.navigateTo({
            url: "../video/video?url=" + encodeURIComponent(video_url) + "&image=" + encodeURIComponent(cover_url) + "&preview=1&title=" + encodeURIComponent(title)
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/mztools_uni/pages/videos/watermark/index/index.vue"]]);
wx.createPage(MiniProgramPage);
