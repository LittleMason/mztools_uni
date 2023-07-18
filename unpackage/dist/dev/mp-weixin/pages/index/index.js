"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const textArr = [
      {
        text: "文字九宫格",
        path: "",
        icon: "../../static/images/text-night-climp.png"
      },
      {
        text: "文字转图片",
        path: "",
        icon: "../../static/images/text-text-to-image.png"
      },
      {
        text: "翅膀昵称",
        path: "",
        icon: "../../static/images/text-wing-nickname.png"
      },
      {
        text: "花式字体",
        path: "",
        icon: "../../static/images/text-flower.png"
      }
    ];
    const imgArr = [
      {
        text: "九宫格切图",
        path: "/pages/sudokuClimp/sudokuClimp",
        icon: "../../static/images/img-night-climp.png"
      },
      {
        text: "长图拼接",
        path: "/pages/joinImages/joinImages",
        icon: "../../static/images/img-climp-join.png"
      }
    ];
    const videoArr = [
      {
        text: "视频去水印",
        path: "/pages/videos/watermark/index/index",
        icon: "../../static/images/video-water.png"
      }
    ];
    const handle = (item) => {
      console.log("item:", item);
      common_vendor.index.navigateTo({
        url: item.path
      });
    };
    const handleDemo = () => {
      common_vendor.Ds.callFunction({
        name: "demo",
        data: { sex: "男" },
        success(res) {
          console.log("res:", res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: 5 * 1e3,
        b: common_vendor.o(handleDemo),
        c: common_vendor.f(textArr, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: common_vendor.o(handle, index),
            d: index,
            e: "1cf27b2a-1-" + i0 + ",1cf27b2a-0"
          };
        }),
        d: common_vendor.p({
          column: 4,
          showBorder: false
        }),
        e: common_vendor.f(imgArr, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: common_vendor.o(() => {
              handle(item);
            }, index),
            d: index,
            e: "1cf27b2a-3-" + i0 + ",1cf27b2a-2"
          };
        }),
        f: common_vendor.p({
          column: 4,
          showBorder: false
        }),
        g: common_vendor.f(videoArr, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: common_vendor.o(() => {
              handle(item);
            }, index),
            d: index,
            e: "1cf27b2a-5-" + i0 + ",1cf27b2a-4"
          };
        }),
        h: common_vendor.p({
          column: 4,
          showBorder: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mztools_uni/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
