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
    const swipers = [
      {
        url: "../../static/images/lotus.png",
        lang: "cn"
      },
      {
        url: "../../static/images/green.png",
        lang: "en"
      }
    ];
    const swiperDatas = common_vendor.ref([]);
    const handle = (item) => {
      common_vendor.index.navigateTo({
        url: item.path
      });
    };
    const middlewareNet = common_vendor.Ys.importObject("middleware-net");
    middlewareNet.getRandomSentence().then((sentences) => {
      swiperDatas.value = sentences;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swipers, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(swiperDatas.value[index].content),
            c: common_vendor.t(swiperDatas.value[index].author),
            d: index
          };
        }),
        b: 5 * 1e3,
        c: common_vendor.f(imgArr, (item, index, i0) => {
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
        d: common_vendor.p({
          column: 3,
          showBorder: false
        }),
        e: common_vendor.f(AIArr, (item, index, i0) => {
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
          column: 3,
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
          column: 3,
          showBorder: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
