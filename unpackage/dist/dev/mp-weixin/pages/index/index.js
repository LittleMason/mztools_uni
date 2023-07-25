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
    const imgArr = [
      {
        text: "九宫格切图",
        path: "/pages/sudokuClimp/sudokuClimp",
        icon: "../../static/images/img-night-climp.png"
      },
      {
        text: "长图拼接1",
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
    const AIArr = [
      {
        text: "智能聊天",
        path: "/pages/ai/chat/index",
        icon: "../../static/images/ai.png"
      },
      {
        text: "油价查询",
        path: "/pages/ai/capability/capability",
        icon: "../../static/images/oil-price.png"
      },
      {
        text: "周公解梦",
        path: "/pages/ai/fortune-telling/fortune-telling",
        icon: "../../static/images/fortune-telling.png"
      }
    ];
    const handle = (item) => {
      console.log("item:", item);
      common_vendor.index.navigateTo({
        url: item.path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: 5 * 1e3,
        b: common_vendor.f(imgArr, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: common_vendor.o(() => {
              handle(item);
            }, index),
            d: index,
            e: "1cf27b2a-1-" + i0 + ",1cf27b2a-0"
          };
        }),
        c: common_vendor.p({
          column: 3,
          showBorder: false
        }),
        d: common_vendor.f(AIArr, (item, index, i0) => {
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
        e: common_vendor.p({
          column: 3,
          showBorder: false
        }),
        f: common_vendor.f(videoArr, (item, index, i0) => {
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
        g: common_vendor.p({
          column: 3,
          showBorder: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mztools_uni/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
