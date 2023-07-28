"use strict";
const common_vendor = require("../../../common/vendor.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      columns: ["地区", "#92", "#95", "#98", "#0"],
      datas: []
    };
  },
  methods: {
    init() {
      app.globalData.apiRequest({
        fullUrl: "http://api.txapi.cn/v1/oil_price",
        success: (res) => {
          console.log("res:", res);
          const { code, data } = res;
          if (code === 200) {
            this.datas = data;
          }
        }
      });
    }
  },
  created() {
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.columns, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: index === 0 ? 1 : ""
      };
    }),
    b: common_vendor.f($data.datas, (item, index, i0) => {
      return {
        a: common_vendor.f(item, (item1, key, index1) => {
          return {
            a: common_vendor.t(item1),
            b: index1 === 4 ? 1 : ""
          };
        }),
        b: "td" + index,
        c: "tr" + index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/ai/capability/capability.vue"]]);
wx.createPage(MiniProgramPage);
