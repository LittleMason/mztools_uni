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
  onShow: function() {
    console.log("asda112");
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
    async handleEditUser() {
      const uniCo = common_vendor.Ds.importObject("uni-id-co");
      const { uid } = common_vendor.Ds.getCurrentUserInfo();
      uniCo.updateUser({ uid, nickname: this.nickname, username: uid }).then(async (res) => {
        const { errCode } = res;
        if (!errCode) {
          const db = common_vendor.Ds.database();
          const userRecord = await db.collection("uni-id-users").doc(uid).field({ nickname: true, avatarUrl: true }).get();
          const { data } = userRecord.result;
          console.log("userRecord:", userRecord);
          app.globalData.userInfo.nickname = data[0].nickname;
          common_vendor.index.showToast({
            icon: "success",
            title: "编辑成功！",
            success() {
              common_vendor.index.navigateBack();
            }
          });
        }
      });
    }
  },
  created() {
    console.log("asda");
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/mine/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
