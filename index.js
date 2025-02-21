const fs = require('fs');
const item = JSON.parse('${{ steps.prepare-item.outputs.item }}');
const data = require('./data.json')

try {

// 获取最后一条记录
const lastItem = data[data.length - 1];

// 对比字段
const isSame = 
	item.ip_location === lastItem.ip_location &&
	item.following_count === lastItem.following_count &&
	item.follower_count === lastItem.follower_count &&
	item.favoriting_count === lastItem.favoriting_count;

if (!isSame) {
	// 若不一致，将 item 添加到 dataArray 中
	dataArray.push(item);
	// 将更新后的数据转换为字符串，并添加 var data = 和 ]
	const newData = JSON.stringify(dataArray, null, 2)
	// 将新数据写入 data.json 文件
	fs.writeFileSync('data.json', newData);
	console.log('Data has been updated in data.json.');
} else {
	console.log('The data in $item and the last item in data.json are the same. No update needed.');
}
} catch (error) {
	console.error('Error parsing data.json:', error);
}