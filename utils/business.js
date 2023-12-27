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

export async function initUserInfo(postToken){
	let tempFiles;
	const token = postToken || uni.getStorageSync('token');
	const selfData = this.globalData?this.globalData:this;
	if(token){
		const {uid} = uniCloud.getCurrentUserInfo();
		const db = uniCloud.database();
		const userRecord = await db.collection('uni-id-users').doc(uid).field({nickname:true,avatar:true}).get();
		const {data} = userRecord.result;
		console.log('userRecord:',data);
		if(data[0].nickname){
			selfData.userInfo.nickname = data[0].nickname;
		}
		if(data[0].avatar){
			const avatarUrl = data[0].avatar
			//阿里云的处理方式：
			selfData.userInfo.avatar = avatarUrl;
			//腾讯云的处理方式：
			// tempFiles = await uniCloud.getTempFileURL({
			// 	fileList:[avatarUrl]
			// })
			// const {fileList} = tempFiles;
			// selfData.userInfo.avatar = fileList[0].download_url;
		}
	}
	return tempFiles;
}
