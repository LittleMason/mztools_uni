"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_business = require("../../utils/business.js");
const Preview = () => "./joinPreview2.js";
const _sfc_main = {
  components: {
    Preview
  },
  data() {
    return {
      imgUrlArr: [],
      // 存放选择的图片路径数组
      dragSrcIndex: null,
      drawImgs: [],
      successUpload: false,
      canvasHeight: 100,
      canvasWidth: 100,
      savaImgDatas: [],
      concatImage: "",
      //生成后的图片,
      previewImgMode: "aspectFit"
    };
  },
  mounted() {
    this.openPreview();
  },
  methods: {
    openPreview() {
      this.$refs.preview.open("center");
    },
    saveImage() {
      utils_business.saveImage2Photo("canvas", this.concatImage);
    },
    //canvas转图片
    canvasToImg() {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "joinCanvas",
        fileType: "jpg",
        x: 0,
        y: 0,
        width: this.canvasWidth,
        height: this.canvasHeight,
        success: (res) => {
          this.concatImage = res.tempFilePath;
        },
        fail: (res) => {
          console.log("canvas转换图片失败");
        }
      }, this);
    },
    horizonConcat() {
      this.previewImgMode = "aspectFit";
      this.drawImgs = [];
      common_vendor.index.getWindowInfo();
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#joinCanvas").boundingClientRect((res) => {
        const ctx = common_vendor.index.createCanvasContext("joinCanvas", this);
        for (let i = 0; i < this.imgUrlArr.length; i++) {
          common_vendor.index.getImageInfo({
            src: this.imgUrlArr[i],
            success: (res2) => {
              let imgWidth = res2.width;
              let imgHeight = res2.height;
              const drawH = 500;
              this.canvasHeight = drawH;
              const selectWHPercent = (imgWidth / imgHeight).toFixed(2);
              const drawW = parseInt(drawH * selectWHPercent);
              this.drawImgs[i] = { height: drawH, path: this.imgUrlArr[i], width: drawW };
              if (i === this.imgUrlArr.length - 1) {
                const imgWidths = this.drawImgs.map((item) => {
                  return item.width;
                });
                const fullWidth = imgWidths.reduce((pre, cur) => {
                  return pre + cur;
                }, 0);
                console.log("fullWidth:", fullWidth);
                this.canvasWidth = fullWidth;
                this.$nextTick(() => {
                  this.drawImgs.forEach((item, inx) => {
                    const { height, path, width } = item;
                    const previewImgsWidth = this.drawImgs.slice(0, inx).map((item2) => {
                      return item2.width;
                    });
                    const currentX = previewImgsWidth.reduce((pre, cur) => {
                      return pre + cur;
                    }, 0);
                    ctx.drawImage(path, currentX, 0, width, height);
                  });
                  ctx.draw();
                  this.canvasToImg();
                });
              }
            },
            fail: (res2) => {
              console.log("获取图片信息失败");
            }
          });
        }
      }).exec();
    },
    verticalConcat() {
      this.previewImgMode = "aspectFit";
      this.drawImgs = [];
      const {
        screenWidth
      } = common_vendor.index.getWindowInfo();
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#joinCanvas").boundingClientRect((res) => {
        const ctx = common_vendor.index.createCanvasContext("joinCanvas", this);
        for (let i = 0; i < this.imgUrlArr.length; i++) {
          common_vendor.index.getImageInfo({
            src: this.imgUrlArr[i],
            success: (res2) => {
              let imgWidth = res2.width;
              let imgHeight = res2.height;
              const drawW = parseInt(screenWidth * 0.95);
              this.canvasWidth = drawW;
              const selectWHPercent = (imgWidth / imgHeight).toFixed(2);
              const drawH = parseInt(drawW / selectWHPercent);
              this.drawImgs[i] = { height: drawH, path: this.imgUrlArr[i], width: drawW };
              if (i === this.imgUrlArr.length - 1) {
                const imgHeights = this.drawImgs.map((item) => {
                  return item.height;
                });
                const fullHeight = imgHeights.reduce((pre, cur) => {
                  return pre + cur;
                }, 0);
                console.log("fullHeight:", fullHeight);
                this.canvasHeight = fullHeight;
                this.$nextTick(() => {
                  this.drawImgs.forEach((item, inx) => {
                    const { height, path, width } = item;
                    const previewImgsHeight = this.drawImgs.slice(0, inx).map((item2) => {
                      return item2.height;
                    });
                    const currentY = previewImgsHeight.reduce((pre, cur) => {
                      return pre + cur;
                    }, 0);
                    ctx.drawImage(path, 0, currentY, width, height);
                  });
                  ctx.draw();
                  this.canvasToImg();
                  this.successUpload = true;
                });
              }
            }
          });
        }
      }).exec();
    }
  }
};
if (!Array) {
  const _easycom_drag2 = common_vendor.resolveComponent("drag");
  const _easycom_icons2 = common_vendor.resolveComponent("icons");
  const _component_preview = common_vendor.resolveComponent("preview");
  (_easycom_drag2 + _easycom_icons2 + _component_preview)();
}
const _easycom_drag = () => "../../components/drag/drag.js";
const _easycom_icons = () => "../../components/icons/icons.js";
if (!Math) {
  (_easycom_drag + _easycom_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.imgUrlArr = $event),
    b: common_vendor.p({
      modelValue: $data.imgUrlArr
    }),
    c: common_vendor.p({
      type: "icon-add",
      size: "40",
      color: "#fff"
    }),
    d: common_vendor.o((...args) => $options.horizonConcat && $options.horizonConcat(...args)),
    e: common_vendor.p({
      type: "icon-save",
      size: "40",
      color: "#fff"
    }),
    f: common_vendor.o((...args) => $options.verticalConcat && $options.verticalConcat(...args)),
    g: $data.successUpload,
    h: $data.concatImage,
    i: $data.concatImage,
    j: $data.previewImgMode,
    k: common_vendor.o((...args) => _ctx.handlePreview && _ctx.handlePreview(...args)),
    l: common_vendor.s("width: " + $data.canvasWidth + "px; height:" + $data.canvasHeight + "px;"),
    m: common_vendor.sr("preview", "5bb3e2c2-3")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5bb3e2c2"], ["__file", "D:/workspace/mztools_uni/pages/joinImages/joinImages.vue"]]);
wx.createPage(MiniProgramPage);
