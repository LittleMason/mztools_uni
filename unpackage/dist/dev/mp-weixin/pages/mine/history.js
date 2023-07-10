"use strict";
const common_vendor = require("../../common/vendor.js");
var app = getApp();
const _sfc_main = {
  components: {},
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      // loading标识，防止多次请求
      preview: 0,
      downloadIndex: ""
    };
  },
  /**
   * 组件的属性列表
   */
  props: {},
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
    },
    onShow: function() {
      this.history();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
      this.page = this.page + 1;
      this.history();
    },
    /**
     * 历史解析记录
     */
    history: function() {
      this.loading = true;
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      app.globalData.apiRequest({
        url: "/records",
        data: {
          page: this.page
        },
        success: (res) => {
          this.list = this.list.concat(res.data.data);
          this.preview = res.data.preview;
        },
        complete: (res) => {
          this.loading = false;
          common_vendor.index.hideLoading();
        }
      });
    },
    videoPlay: function(e) {
      var t = e.currentTarget.dataset.idx;
      var a = this.downloadIndex;
      if (a) {
        var n = common_vendor.index.createVideoContext("download" + a);
        n.seek(0);
        n.pause();
        this.downloadIndex = t;
        common_vendor.index.createVideoContext("download" + a).play();
      } else {
        this.downloadIndex = t;
        common_vendor.index.createVideoContext("download" + t).play();
      }
    },
    /**
     * 重新下载
     * 复制原始链接跳转首页重新让用户解析
     * @param e
     */
    Download: function(e) {
      console.log(e);
      common_vendor.index.setClipboardData({
        data: e.currentTarget.dataset.link
      });
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    DEL: function(e) {
      var id = e.currentTarget.dataset.id;
      var key = e.currentTarget.dataset.key;
      common_vendor.index.showModal({
        title: "提示",
        content: "你确定要删除吗？",
        success: (res) => {
          if (res.confirm) {
            app.globalData.apiRequest({
              url: "/records/" + id,
              method: "DELETE",
              success: (res2) => {
                this.list.splice(key, 1);
                this.list = this.list;
              }
            });
          } else if (res.cancel)
            ;
        }
      });
    },
    //复制视频详情内容
    Copy_video_info: function(t) {
      common_vendor.index.setClipboardData({
        data: t.currentTarget.dataset.content,
        success: function(a) {
          common_vendor.index.showToast({
            title: t.currentTarget.dataset.tip,
            duration: 1200
          });
        }
      });
    },
    onShareAppMessage: function(e) {
      if ("button" === e.from) {
        var i = e.target.dataset.content;
        return {
          title: i.title,
          imageUrl: i.cover,
          path: "/pages/index/index?history=" + i.url
        };
      }
      return {
        title: this.config_data_list.share_title,
        path: "/pages/index/index",
        imageUrl: this.config_data_list.share_imageUrl,
        success: function(e2) {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success",
            duration: 2e3
          });
        },
        fail: function(e2) {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.list || $data.list.length == 0
  }, !$data.list || $data.list.length == 0 ? {} : {}, {
    b: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.url),
        b: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        c: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        d: item.url,
        e: item
      }, $data.preview != 0 ? {
        f: item.image_url,
        g: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        h: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        i: item.image_url,
        j: common_vendor.o((...args) => $options.videoPlay && $options.videoPlay(...args), index),
        k: index,
        l: common_vendor.t(item.updated_at)
      } : {}, {
        m: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        n: common_vendor.o((...args) => $options.Copy_video_info && $options.Copy_video_info(...args), index),
        o: item.url,
        p: common_vendor.o((...args) => $options.Download && $options.Download(...args), index),
        q: item.url,
        r: common_vendor.o((...args) => $options.DEL && $options.DEL(...args), index),
        s: index,
        t: item.id,
        v: index
      });
    }),
    c: $data.preview != 0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/mine/history.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
