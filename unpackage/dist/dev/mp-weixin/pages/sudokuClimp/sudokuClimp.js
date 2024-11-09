"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_business = require("../../utils/business.js");
const _sfc_main = {
  __name: "sudokuClimp",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const previewBgSrc = common_vendor.ref("");
    const successUpload = common_vendor.ref(false);
    const borderSelectVisible = common_vendor.ref(false);
    const imgs = common_vendor.ref([]);
    const adapterH = common_vendor.ref(0);
    const adapterW = common_vendor.ref(0);
    const selectWHPercent = common_vendor.ref(1);
    const ctx = common_vendor.index.createCanvasContext("sudokuSource");
    const coverImages = common_vendor.ref([
      {
        src: "../../static/images/border-vertical-flower.png"
      },
      {
        src: "../../static/images/border-vertical-golden.png"
      },
      {
        src: "../../static/images/border-horizontal-bird.png"
      },
      {
        src: "../../static/images/border-horizontal-cloud.png"
      }
    ]);
    const sourceSrc = common_vendor.ref(null);
    const clipImgDatas = common_vendor.ref([]);
    const savaImgDatas = common_vendor.ref([]);
    for (let i = 0; i < 9; i++) {
      imgs.value.push(i);
    }
    function drawSudokuImg(isSetBackground) {
      loading.value = true;
      const {
        screenWidth
      } = common_vendor.index.getWindowInfo();
      adapterW.value = screenWidth;
      adapterH.value = parseInt(adapterW.value / selectWHPercent.value);
      ctx.drawImage(sourceSrc.value, 0, 0, adapterW.value, adapterH.value);
      if (previewBgSrc.value) {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(previewBgSrc.value, 0, 0, adapterW.value, adapterH.value);
      }
      ctx.draw(false, () => {
        const offsetPxRow = parseInt(adapterW.value / 3);
        const offsetPxCol = parseInt(adapterH.value / 3);
        console.log("offsetPxRow:", offsetPxRow);
        console.log("offsetPxCol:", offsetPxCol);
        savaImgDatas.value = [];
        !isSetBackground && (clipImgDatas.value = []);
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
                !isSetBackground && clipImgDatas.value.push(tempFilePath);
                savaImgDatas.value.push(tempFilePath);
                loading.value = false;
                borderSelectVisible = true;
              },
              fail(err) {
                console.log("err:", err);
                loading.value = false;
                if (col == 2 && row == 2) {
                  drawSudokuImg(isSetBackground);
                }
              }
            });
          }
        }
      });
    }
    const handleChangeCoverImage = (coverSrc) => {
      if (!savaImgDatas.value.length) {
        return false;
      }
      previewBgSrc.value = coverSrc;
      drawSudokuImg(true);
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
              const {
                width,
                height
              } = imgInfo;
              selectWHPercent.value = (width / height).toFixed(2);
              sourceSrc.value = res.tempFilePaths[0];
              previewBgSrc.value = null;
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
        a: adapterH.value + "px",
        b: previewBgSrc.value,
        c: common_vendor.f(clipImgDatas.value, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        d: borderSelectVisible.value
      }, borderSelectVisible.value ? {
        e: common_vendor.f(coverImages.value, (item, k0, i0) => {
          return {
            a: item.src,
            b: common_vendor.o(() => {
              handleChangeCoverImage(item.src);
            }, item.src),
            c: item.src
          };
        })
      } : {}, {
        f: common_vendor.o(handleSaveImage),
        g: !successUpload.value,
        h: common_vendor.o(handleChoseImage)
      });
    };
  }
};
wx.createPage(_sfc_main);
