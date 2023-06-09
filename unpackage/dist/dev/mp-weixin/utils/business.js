"use strict";
const common_vendor = require("../common/vendor.js");
function isAuth() {
  common_vendor.index.showModal({
    content: "由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权",
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.openSetting({
          success: (result) => {
            console.log(result.authSetting);
          }
        });
      }
    }
  });
}
function downLoadImg(params) {
  common_vendor.index.showLoading({
    title: "加载中"
  });
  common_vendor.index.downloadFile({
    url: app.globalData.downLoadUrl,
    success: (res) => {
      common_vendor.index.hideLoading();
      if (res.statusCode === 200) {
        common_vendor.index.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            common_vendor.index.showToast({
              title: "保存成功",
              icon: "none"
            });
          },
          fail: function() {
            common_vendor.index.showToast({
              title: "保存失败，请稍后重试",
              icon: "none"
            });
          }
        });
      }
    },
    fail: (err) => {
      common_vendor.index.showToast({
        title: "失败啦",
        icon: "none"
      });
    }
  });
}
function canvasToTempFilePath(filePaths) {
  filePaths.forEach((item) => {
    common_vendor.index.saveImageToPhotosAlbum({
      filePath: item,
      success: function() {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none"
        });
      },
      fail: function() {
        console.log("保存失败：", item);
        common_vendor.index.showToast({
          title: "保存失败，请稍后重试",
          icon: "none"
        });
      }
    });
  });
}
function saveImage2Photo(key, params) {
  common_vendor.index.authorize({
    scope: "scope.writePhotosAlbum",
    success: () => {
      const callMaps = {
        url: downLoadImg,
        canvas: canvasToTempFilePath
      };
      callMaps[key](params);
    },
    fail: () => {
      common_vendor.index.getSetting({
        success: (result) => {
          if (!result.authSetting["scope.writePhotosAlbum"]) {
            isAuth();
          }
        }
      });
    }
  });
}
exports.saveImage2Photo = saveImage2Photo;
