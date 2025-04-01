const fs = require('fs');
const item = JSON.parse('{"ip_location":"北京","following_count":91,"follower_count":107,"favoriting_count":143}');
const data = require('./datame.json')
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return [year, '-', month, '-', day, ' ', hours, ':', minutes, ':', seconds].join('')
}

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
  // 若不一致，将 item 添加到 data 中
  item.update_time = formatDate(new Date());
  data.push(item);
  // 将更新后的数据转换为字符串，并添加 var data = 和 ]
  const newData = JSON.stringify(data, null, 2)
  // 将新数据写入 data.json 文件
  fs.writeFileSync('datame.json', newData);
  console.log('Data has been updated in data.json.');
} else {
  console.log('The data in  and the last item in data.json are the same. No update needed.');
}
} catch (error) {
  console.error('Error parsing data.json:', error);
}
