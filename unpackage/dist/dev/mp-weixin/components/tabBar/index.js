"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    tabBar: Object
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    handleTabClick(index) {
      if (index === this.activeIndex) {
        return;
      }
      const item = this.tabBar.list[index];
      common_vendor.index.switchTab({ url: item.pagePath });
      this.activeIndex = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabBar.list, (item, index, i0) => {
      return {
        a: $data.activeIndex === index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: index,
        d: $data.activeIndex === index ? 1 : "",
        e: common_vendor.o(($event) => $options.handleTabClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mztools_uni/components/tabBar/index.vue"]]);
wx.createComponent(Component);
