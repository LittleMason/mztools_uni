// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
	async getRandomSentence(){
		const cnUrl = 'https://api.xygeng.cn/one';
		const enUrl = 'https://api.quotable.io/random';
		const httpClient = uniCloud.httpclient;
		const datas=[];
		
		// Request the Chinese URL
		const cnRes = await httpClient.request(cnUrl, {
			method: 'GET',
			dataType: 'json'
		})
		cnRes.data.data.author = cnRes.data.data.name;
		datas.push(cnRes.data.data);
		
		// Request the English URL
		const enRes = await httpClient.request(enUrl, {
			method: 'GET',
			dataType: 'json'
		})
		datas.push(enRes.data);
		
		return datas;
	}
}
