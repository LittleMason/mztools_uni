export function isAuth() {
	uni.showModal({
		content: '由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权',
		success: (res) => {
			if (res.confirm) {
				uni.openSetting({
					success: (result) => {
						console.log(result.authSetting);
					}
				});
			}
		}
	});
}
export function downLoadImg(params) {
	uni.showLoading({
		title: '加载中'
	});
	uni.downloadFile({
		url: app.globalData.downLoadUrl,
		success: (res) => {
			uni.hideLoading();
			if (res.statusCode === 200) {
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: function() {
						uni.showToast({
							title: "保存成功",
							icon: "none"
						});
					},
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
							icon: "none"
						});
					}
				});
			}
		},
		fail: (err) => {
			uni.showToast({
				title: "失败啦",
				icon: "none"
			});
		}
	})
}
function canvasToTempFilePath(filePaths){
	filePaths.forEach(item=>{
		uni.saveImageToPhotosAlbum({
			filePath:item,
			success: function() {
				uni.showToast({
					title: "保存成功",
					icon: "none"
				});
			},
			fail: function() {
				console.log('保存失败：',item);
				uni.showToast({
					title: "保存失败，请稍后重试",
					icon: "none"
				});
			}
		});
	})
}
export function saveImage2Photo(key,params) {
	uni.authorize({
		scope: 'scope.writePhotosAlbum',
		success: () => {
			// 已授权,执行对应回调
			const callMaps = {
				url:downLoadImg,
				canvas:canvasToTempFilePath
			}
			callMaps[key](params);
		},
		fail: () => {
			// 拒绝授权，获取当前设置
			uni.getSetting({
				success: (result) => {
					if (!result.authSetting['scope.writePhotosAlbum']) {
						isAuth()
					}
				}
			});
		}
	})
}
export const videoTabBars = {
		"custom": false,
		"color": "#dbdbdb",
		"selectedColor": "#337AFF",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",
		"list": [
			{
				"pagePath": "/pages/videos/watermark/index/index",
				"text": "首页",
				"iconPath": "/static/images/icon-home.png",
				"selectedIconPath": "/static/images/icon-home-selected.png"
			},
			{
				"pagePath": "/pages/videos/watermark/mine/mine",
				"text": "我的",
				"iconPath": "/static/images/icon-me.png",
				"selectedIconPath": "/static/images/icon-me-selected.png"
			}
		]
	}
