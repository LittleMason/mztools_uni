<template>
	<uni-popup background-color="#fff" @change="change" ref="popup">
		<view 
		class="join-image-preview">
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			open(type='center'){
				this.$refs.popup.open(type)
			},
		}
	}
</script>

<style lang="less" scoped>
.join-image-preview{
	width: 90vw;
	height: 90vh;
	background-color: #fff;
}
</style>
