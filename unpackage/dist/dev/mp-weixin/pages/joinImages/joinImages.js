"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_business = require("../../utils/business.js");
const _sfc_main = {
  data() {
    return {
      imgUrlArr: [],
      // 存放选择的图片路径数组
      drawImgs: [],
      successUpload: false,
      canvasHeight: 0,
      canvasWidth: 0,
      savaImgDatas: []
    };
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        success: (res) => {
          this.imgUrlArr = [...this.imgUrlArr, ...res.tempFilePaths];
          console.log("this.imgUrlArr:", this.imgUrlArr);
          this.canvasHeight = 0;
          this.loadImg();
        }
      });
    },
    saveImage() {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "imgBed",
        fileType: "jpg",
        x: 0,
        y: 0,
        width: this.canvasWidth,
        height: this.canvasHeight,
        success: (res) => {
          this.savaImgDatas.push(res.tempFilePath);
          utils_business.saveImage2Photo("canvas", this.savaImgDatas);
          common_vendor.index.showToast({
            title: "图片保存成功"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: "图片保存失败"
          });
        }
      }, this);
    },
    loadImg() {
      common_vendor.index.getWindowInfo();
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#imgBed").boundingClientRect((res) => {
        const ctx = common_vendor.index.createCanvasContext("imgBed", this);
        for (let i = 0; i < this.imgUrlArr.length; i++) {
          common_vendor.index.getImageInfo({
            src: this.imgUrlArr[i],
            success: (res2) => {
              let imgWidth = res2.width;
              let imgHeight = res2.height;
              const {
                screenWidth
              } = common_vendor.index.getWindowInfo();
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
                this.successUpload = true;
              }
            }
          });
        }
      }).exec();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.canvasHeight + "px",
    b: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    c: common_vendor.o((...args) => $options.saveImage && $options.saveImage(...args)),
    d: $data.successUpload
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/mztools_uni/pages/joinImages/joinImages.vue"]]);
wx.createPage(MiniProgramPage);
