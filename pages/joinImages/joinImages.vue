<!-- 找个删除或关闭logo，封装个全局icon组件 支持svg 字体和image标签 默认是使用font-family  -->
<!-- 完成拖动改变顺序功能 -->
<template>
  <view class="join-images">
    <drag v-model="imgUrlArr"> </drag>
    <!-- 吸底的两个按钮 -->
    <view class="bottom-btns" v-show="successUpload">
      <view class="bottom-btns-item" @tap="handleConcat('horizonConcat')">
        横向拼接
      </view>
      <view class="bottom-btns-item" @tap="handleConcat('verticalConcat')">
        竖向拼接
      </view>
    </view>
    <canvas
      :style="'width: ' + canvasWidth + 'px; height:' + canvasHeight + 'px;'"
      id="joinCanvas"
      canvas-id="joinCanvas"
      class="join-canvas"
    >
    </canvas>
    <preview
      ref="preview"
      :data="concatImage"
      :previewImgMode="previewImgMode"
    />
  </view>
</template>

<script>
import { business } from "../../utils/index.js";
import Preview from "./joinPreview.vue";
export default {
  components: {
    Preview,
  },
  data() {
    return {
      imgUrlArr: [], // 存放选择的图片路径数组
      dragSrcIndex: null,
      drawImgs: [],
      successUpload: false,
      canvasHeight: 100,
      canvasWidth: 100,
      savaImgDatas: [],
      concatImage: "", //生成后的图片,
      previewImgMode: "aspectFit",
    };
  },
  mounted() {
  },
  methods: {
    openPreview() {
      this.$refs.preview.open("center");
    },
    saveImage() {
      business.saveImage2Photo("canvas", this.concatImage);
    },
    //canvas转图片
    canvasToImg() {
      uni.canvasToTempFilePath(
        {
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
          },
        },
        this
      );
    },

    horizonConcat() {
      //横向拼接图片功能
      this.previewImgMode = "aspectFit";
      this.drawImgs = [];
      //using canvas to concat images in horizon
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#joinCanvas")
        .boundingClientRect((res) => {
          // 创建canvas上下文对象
          const ctx = uni.createCanvasContext("joinCanvas", this);
          // 遍历图片数组，加载图片
          for (let i = 0; i < this.imgUrlArr.length; i++) {
            uni.getImageInfo({
              src: this.imgUrlArr[i],
              success: (res) => {
                let imgWidth = res.width;
                let imgHeight = res.height;
                const drawH = 500;
                this.canvasHeight = drawH;
                const selectWHPercent = (imgWidth / imgHeight).toFixed(2);
                const drawW = parseInt(drawH * selectWHPercent);
                this.drawImgs[i] = {
                  height: drawH,
                  path: this.imgUrlArr[i],
                  width: drawW,
                };
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
                      const previewImgsWidth = this.drawImgs
                        .slice(0, inx)
                        .map((item) => {
                          return item.width;
                        });
                      const currentX = previewImgsWidth.reduce((pre, cur) => {
                        return pre + cur;
                      }, 0);
                      ctx.drawImage(path, currentX, 0, width, height);
                    });
                    ctx.draw();
                    //将canvas转换为图片
                    this.canvasToImg();
                  });
                }
              },
              fail: (res) => {
                console.log("获取图片信息失败");
              },
            });
          }
        })
        .exec();
    },
    verticalConcat() {
      this.previewImgMode = "aspectFit";
      this.drawImgs = [];
      //using canvas to concat images in vertical
      const { screenWidth } = uni.getWindowInfo();
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#joinCanvas")
        .boundingClientRect((res) => {
          // 创建canvas上下文对象
          const ctx = uni.createCanvasContext("joinCanvas", this);
          // 遍历图片数组，加载图片
          for (let i = 0; i < this.imgUrlArr.length; i++) {
            uni.getImageInfo({
              src: this.imgUrlArr[i],
              success: (res) => {
                let imgWidth = res.width;
                let imgHeight = res.height;
                const drawW = parseInt(screenWidth * 0.95);
                this.canvasWidth = drawW;
                const selectWHPercent = (imgWidth / imgHeight).toFixed(2);
                const drawH = parseInt(drawW / selectWHPercent);
                this.drawImgs[i] = {
                  height: drawH,
                  path: this.imgUrlArr[i],
                  width: drawW,
                };
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
                      const previewImgsHeight = this.drawImgs
                        .slice(0, inx)
                        .map((item) => {
                          return item.height;
                        });
                      const currentY = previewImgsHeight.reduce((pre, cur) => {
                        return pre + cur;
                      }, 0);
                      ctx.drawImage(path, 0, currentY, width, height);
                    });
                    ctx.draw();
                    //将canvas转换为图片
                    this.canvasToImg();
                    this.successUpload = true;
                  });
                }
              },
            });
          }
        })
        .exec();
    },
    handleConcat(methodName) {
		//if haven't upload images, return
		if(!this.imgUrlArr.length) return;
		this.openPreview();
		this[methodName]();
	},
  },
};
</script>

<style lang="less" scoped>
.join-images {
  padding: 40rpx;
  padding-bottom: 200rpx;
  .select-image {
    width: 27vw;
    height: 29vw;
    background-color: #337aff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    color: #fff;
    border-radius: 10rpx;
    overflow: hidden;
  }
  .btn-select {
    width: 27vw;
    height: 29vw;
    background-color: #337aff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    color: #fff;
    border-radius: 10rpx;
  }
  .bottom-btns {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #337aff;
    font-size: 30rpx;
    color: #fff;
    text-align: center;
    z-index: 99;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      background-color: #fff;
      width: 1px;
    }
    &-item {
      padding: 30rpx 20rpx;
      flex: 1;
    }
  }
  button {
    margin: 40rpx auto;
    width: 90%;
  }
  .join-canvas {
    position: absolute;
    top: 0;
    transform: translateY(-150%);
  }
  .preview-tip {
    color: red;
    font-size: 24rpx;
    margin-bottom: 16rpx;
    text-align: center;
  }
}
</style>
