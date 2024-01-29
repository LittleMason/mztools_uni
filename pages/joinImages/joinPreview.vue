<template>
  <uni-popup background-color="#fff" @change="change" ref="popup">
    <view class="join-image-preview">
	  <icons type="closeempty" class="close-btn" @tap="close"/>
	  <view class="preview-tip" v-show="concatImage">点击图片可以查看预览图</view>
      <image
        :src="data"
        :mode="previewImgMode"
        class="concat-image"
        @tap="handlePreview"
      />
	  <button class="save-btn" type="primary">保存到相册</button>
    </view>
  </uni-popup>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: "",
    },
    previewImgMode: {
      type: String,
      default: "aspectFit",
    },
  },
  data() {
    return {};
  },
  methods: {
    change(e) {
      console.log("当前模式：" + e.type + ",状态：" + e.show);
    },
    open(type = "center") {
      this.$refs.popup.open(type);
    },
	close(){
		this.$refs.popup.close();
	}
  },
};
</script>

<style lang="less" scoped>
.join-image-preview {
  width: 90vw;
  height: 90vh;
  background-color: #fff;
  padding-top: 30rpx;
  .concat-image {
    width: 90%;
    height: 70%;
    display: block;
	margin: 0 auto;
  }
  .close-btn{
	position: absolute;
	right: 10rpx;
	top: 10rpx;
  }
  .save-btn{
	width: 90%;
	margin: 0 auto;
	margin-top: 80rpx;
  }
}
</style>
