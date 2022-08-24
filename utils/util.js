const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const getUUID = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";
 
  var uuid = s.join("");
  return uuid
}

const defaultColors=['#FF8126','#3775E2','#F154A6','#22AE36','#000000']

const defaultTodos =[{
  id: "1",
  content: "你好呀！欢迎使用猫豆待办。",
  isDone: false,
  color:defaultColors[0]
}, {
  id: "2",
  content: "点击输入框，开始输入待办吧！",
  isDone: false,
  color:defaultColors[1]
}, {
  id: "10",
  content: "可以给待办选择不同颜色。",
  isDone: false,
  color:defaultColors[1]
}, {
  id: "3",
  content: "←点击左边这个按钮，完成待办。",
  isDone: false,
  color:defaultColors[1]
}, {
  id: "4",
  content: "点击待办文字，查看详情。",
  isDone: false,
  color:defaultColors[2]
}, {
  id: "5",
  content: "这里显示的是已完成的待办。",
  isDone: true,
  color:defaultColors[3]
}, {
  id: "6",
  content: "←点击这个按钮，将待办重新激活。",
  isDone: true,
  color:defaultColors[4]
}]

module.exports = {
    formatTime,
    getUUID,
    defaultTodos,
    defaultColors
}