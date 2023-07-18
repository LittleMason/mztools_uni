"use strict";
const common_vendor = require("../../../common/vendor.js");
var app = getApp();
const _sfc_main = {
  data() {
    return {
      avatarUrl: "",
      nickname: ""
    };
  },
  methods: {
    init() {
      const { avatarUrl, nickname } = app.globalData.userInfo;
      this.avatarUrl = avatarUrl;
      this.nickname = nickname;
    },
    onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail;
      this.userInfo.avatarUrl = avatarUrl;
      app.globalData.userInfo.avatarUrl = avatarUrl;
    }
  },
  created() {
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatarUrl,
    b: $data.nickname,
    c: common_vendor.o(($event) => $data.nickname = $event.detail.value)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/mine/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
