"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  mixins: [],
  props: {
    type: {
      type: String,
      default: "mogujie"
    },
    size: {
      type: [Number, String],
      default: 26
    },
    color: {
      type: String,
      default: "#333333"
    },
    sty: {
      type: String,
      default: ""
    }
  },
  methods: {},
  created: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n("icon icon-" + $props.type),
    b: common_vendor.s("font-size:" + $props.size + "rpx; color:" + $props.color + ";" + $props.sty)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/pages/videos/watermark/mine/icon/index.vue"]]);
wx.createComponent(Component);
