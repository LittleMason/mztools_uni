"use strict";
const common_vendor = require("../../../common/vendor.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      dream: "",
      analyses: [],
      emptyText: "",
      hasResult: true
    };
  },
  methods: {
    //http://api.txapi.cn/v1/c/duke_zhou_oneiromancy
    async handleQuery() {
      const uniCo = common_vendor.Ws.importObject("request-agent-middleware");
      const reg = /^梦见(有|了)?/;
      const kw = this.dream.replace(reg, "");
      console.log("kw", kw);
      const datas = {
        token: app.globalData.txAPIToken,
        kw
      };
      const res = await uniCo.agent("https://api.txapi.cn/v1/c/duke_zhou_oneiromancy", datas);
      console.log("res:", res);
      const { data, status } = res;
      if (status === 200) {
        this.analyses = data.data;
        this.hasResult = !!data.data.length;
        this.emptyText = data.msg;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(_ctx.input),
    b: common_vendor.o(($event) => $data.dream = $event),
    c: common_vendor.p({
      errorMessage: true,
      focus: true,
      placeholder: "输入梦见内容,如:梦见皇帝、梦见兔子等",
      modelValue: $data.dream
    }),
    d: common_vendor.p({
      title: "周公解梦",
      subTitle: "输入梦见内容,如:梦见皇帝、梦见兔子等",
      type: "line",
      padding: true
    }),
    e: common_vendor.o((...args) => $options.handleQuery && $options.handleQuery(...args)),
    f: $data.hasResult
  }, $data.hasResult ? {
    g: common_vendor.f($data.analyses, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text)
      };
    })
  } : {
    h: common_vendor.t($data.emptyText)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9a97b4a0"], ["__file", "D:/workspace/mztools_uni/pages/ai/fortune-telling/fortune-telling.vue"]]);
wx.createPage(MiniProgramPage);
