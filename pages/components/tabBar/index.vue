<template>
  <view class="custom-tabbar">
    <view
      v-for="(item, index) in tabBar.list"
      :key="index"
      class="custom-tabbar-item"
      :class="{ 'custom-tabbar-item-active': activeIndex === index }"
      @click="handleTabClick(index)"
    >
      <image
        :src="activeIndex === index ? item.selectedIconPath : item.iconPath"
        class="custom-tabbar-icon"
      />
      <view class="custom-tabbar-text">{{ item.text }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabBar: Object,
	activeIndex:{
		type:Number,
		default:0
	}
  },
  data() {
    return {
    }
  },
  created() {
  	console.log('1111:',this.tabBar);
  },
  methods: {
    handleTabClick(index) {
      if (index === this.activeIndex) {
        return
      }
      const {pagePath} = this.tabBar.list[index]
      uni.redirectTo({
      	url:pagePath
      })
      this.activeIndex = index
    }
  }
}
</script>

<style>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98upx;
  border-top: 1upx solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5upx 0upx;
  background-color: #fff;
}

.custom-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-tabbar-item-active {
  color: #337AFF;
}

.custom-tabbar-icon {
  width: 50upx;
  height: 50upx;
  margin-bottom: 3upx;
}

.custom-tabbar-text {
  font-size: 24upx;
}
</style>
