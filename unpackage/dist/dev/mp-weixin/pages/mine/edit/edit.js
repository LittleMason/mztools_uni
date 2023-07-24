"use strict";
const common_vendor = require("../../../common/vendor.js");
var app = getApp();
const _sfc_main = {
  data() {
    return {
      avatar: "",
      nickname: "",
      uid: ""
    };
  },
  onShow: function() {
  },
  methods: {
    async init() {
      const { avatar, nickname } = app.globalData.userInfo;
      common_vendor.Ds.importObject("uni-id-co");
      const { uid } = common_vendor.Ds.getCurrentUserInfo();
      this.avatar = avatar;
      this.nickname = nickname;
      this.uid = uid;
    },
    onChooseAvatar(e) {
      const {
        avatarUrl: avatar
      } = e.detail;
      common_vendor.Ds.importObject("uni-id-co");
      console.log("avatar:", avatar);
      common_vendor.index.showLoading({
        title: "头像上传中..."
      });
      common_vendor.Ds.uploadFile({
        filePath: avatar,
        cloudPath: `images/${Date.now()}.jpeg`,
        success: (res) => {
          console.log("res:", res);
          common_vendor.index.hideLoading();
          this.avatar = avatar;
          app.globalData.userInfo.avatar = avatar;
          const { fileID } = res;
          common_vendor.Ds.database().collection("uni-id-users").doc(this.uid).update({ avatar: fileID });
        },
        complete() {
          common_vendor.index.hideLoading();
        }
      });
    },
    async handleEditUser() {
      common_vendor.Ds.database().collection("uni-id-users").doc(this.uid).update({ nickname: this.nickname }).then(async (res) => {
        const { errCode } = res;
        if (!errCode) {
          const db = common_vendor.Ds.database();
          const userRecord = await db.collection("uni-id-users").doc(this.uid).field({ nickname: true, avatar: true }).get();
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
    console.log("created");
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatar,
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: $data.nickname,
    d: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    e: common_vendor.o((...args) => $options.handleEditUser && $options.handleEditUser(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/mine/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
