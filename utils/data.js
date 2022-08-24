const chinaStandard = [
  // BMI 中国标准
  // 分类	BMI 范围
  // 偏瘦	<= 18.4
  // 正常	18.5 ~ 23.9
  // 过重	24.0 ~ 27.9
  // 肥胖	>= 28.0
  {
    min:0,
    max:18.4,
    type:"偏瘦",
  },
  {
    min:18.5,
    max:23.9,
    type:"正常",
  },
  {
    min:24.0,
    max:27.9,
    type:"过重",
  },
  {
    min:28.0,
    max:9999999,
    type:"肥胖",
  }
]




module.exports = {
	chinaStandard,
}