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
        path: ""
      },
      {
        text: "文字转图片",
        path: ""
      },
      {
        text: "翅膀昵称",
        path: ""
      },
      {
        text: "花式字体",
        path: ""
      },
      {
        text: "尖叫字",
        path: ""
      },
      {
        text: "字符表情",
        path: ""
      },
      {
        text: "520文字",
        path: ""
      },
      {
        text: "金额转大写",
        path: ""
      }
    ];
    const imgArr = [
      {
        text: "精选壁纸",
        path: ""
      },
      {
        text: "九宫格切图",
        path: ""
      },
      {
        text: "截图拼接",
        path: ""
      },
      {
        text: "图片压缩",
        path: ""
      },
      {
        text: "带壳截图",
        path: ""
      },
      {
        text: "生成二维码",
        path: ""
      },
      {
        text: "解码二维码",
        path: ""
      },
      {
        text: "图像取色",
        path: ""
      },
      {
        text: "图加马赛克",
        path: ""
      }
    ];
    const hanleItem = (item) => {
      console.log("item:", item);
      common_vendor.index.navigateTo({
        url: "/pages/sudokuClimp/sudokuClimp"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: 5 * 1e3,
        b: common_vendor.f(textArr, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: common_vendor.o(hanleItem, index),
            c: index,
            d: "1cf27b2a-1-" + i0 + ",1cf27b2a-0"
          };
        }),
        c: common_vendor.p({
          column: 4,
          showBorder: false
        }),
        d: common_vendor.f(imgArr, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: common_vendor.o(() => {
              hanleItem(item);
            }, index),
            c: index,
            d: "1cf27b2a-3-" + i0 + ",1cf27b2a-2"
          };
        }),
        e: common_vendor.p({
          column: 4,
          showBorder: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mz/mztools/mztools/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
