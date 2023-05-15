"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_business = require("../../utils/business.js");
const _sfc_main = {
  __name: "sudokuClimp",
  setup(__props) {
    const successUpload = common_vendor.ref(true);
    const imgs = common_vendor.ref([]);
    const adapterH = common_vendor.ref(0);
    const adapterW = common_vendor.ref(0);
    const selectWHPercent = common_vendor.ref(1);
    const ctx = common_vendor.index.createCanvasContext("sudokuSource");
    const coverImages = common_vendor.ref([
      {
        src: "../../static/images/260.jpg",
        class: "img-demo1"
      },
      {
        src: "../../static/images/20170709213934_Q8YTF.jpeg",
        class: "img-demo2"
      }
    ]);
    common_vendor.ref(null);
    const sourceSrc = common_vendor.ref(null);
    const savaImgDatas = common_vendor.ref([]);
    for (let i = 0; i < 9; i++) {
      imgs.value.push(i);
    }
    function drawSudokuImg(coverSrc) {
      const {
        screenWidth
      } = common_vendor.index.getWindowInfo();
      adapterW.value = screenWidth;
      adapterH.value = parseInt(adapterW.value / selectWHPercent.value);
      ctx.drawImage(sourceSrc.value, 0, 0, adapterW.value, adapterH.value);
      if (coverSrc) {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(coverSrc, 0, 0, adapterW.value / 2, adapterH.value / 2);
      }
      ctx.draw(false, () => {
        const offsetPxRow = parseInt(adapterW.value / 3);
        const offsetPxCol = parseInt(adapterH.value / 3);
        savaImgDatas.value = [];
        for (let col = 0; col < 3; col++) {
          for (let row = 0; row < 3; row++) {
            common_vendor.index.canvasToTempFilePath({
              canvasId: "sudokuSource",
              x: row * offsetPxRow,
              y: col * offsetPxCol,
              width: offsetPxRow,
              height: offsetPxCol,
              success(res) {
                const {
                  tempFilePath
                } = res;
                savaImgDatas.value.push(tempFilePath);
              },
              fail(err) {
                console.log("err:", err);
              }
            });
          }
        }
      });
    }
    const handleChangeCoverImage = (coverSrc) => {
      drawSudokuImg(coverSrc);
    };
    const handleChoseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        success: function(res) {
          successUpload.value = true;
          common_vendor.index.getImageInfo({
            src: res.tempFilePaths[0],
            success(imgInfo) {
              const { width, height } = imgInfo;
              selectWHPercent.value = (width / height).toFixed(2);
              sourceSrc.value = res.tempFilePaths[0];
              drawSudokuImg();
            }
          });
        }
      });
    };
    const handleSaveImage = () => {
      utils_business.saveImage2Photo("canvas", savaImgDatas.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleChoseImage),
        b: adapterH.value + "px",
        c: common_vendor.f(coverImages.value, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.class),
            b: common_vendor.o(() => {
              handleChangeCoverImage(item.src);
            })
          };
        }),
        d: successUpload.value
      }, successUpload.value ? {
        e: common_vendor.o(handleSaveImage)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/mz/mztools/mztools/pages/sudokuClimp/sudokuClimp.vue"]]);
wx.createPage(MiniProgramPage);