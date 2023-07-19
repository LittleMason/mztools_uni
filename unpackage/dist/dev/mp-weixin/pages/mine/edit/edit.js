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
      app.globalData.userInfo.avatarUrl = avatarUrl;
    },
    handleEditUser() {
      const uniCo = common_vendor.Ds.importObject("uni-id-co");
      const { uid } = common_vendor.Ds.getCurrentUserInfo();
      console.log("uid:", uid);
      uniCo.updateUser({ uid, nickname: this.nickname, username: uid });
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
    c: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    d: common_vendor.o((...args) => $options.handleEditUser && $options.handleEditUser(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/mine/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
