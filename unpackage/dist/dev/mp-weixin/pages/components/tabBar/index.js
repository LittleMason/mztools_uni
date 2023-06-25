"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    tabBar: Object,
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  created() {
    console.log("1111:", this.tabBar);
  },
  methods: {
    handleTabClick(index) {
      if (index === this.activeIndex) {
        return;
      }
      const { pagePath } = this.tabBar.list[index];
      common_vendor.index.redirectTo({
        url: pagePath
      });
      this.activeIndex = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabBar.list, (item, index, i0) => {
      return {
        a: $props.activeIndex === index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: index,
        d: $props.activeIndex === index ? 1 : "",
        e: common_vendor.o(($event) => $options.handleTabClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mz/mztools_uni/pages/components/tabBar/index.vue"]]);
wx.createComponent(Component);
