import {
  chinaStandard
} from "../../utils/data"

Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    height: [], // 输入的身高
    weight: [], // 输入的体重
    defaultHeight: '输入身高', // 默认内容
    defaultWeight: '输入体重', // 默认内容
    keyShow: true, // 是否展示键盘
    cursorIndex: '', // 插入光标位置
    inputLengthMax: 3, // 最大长度
    currentInputType: "height", // 当前聚焦的数据框
    bmiResult: null, //BMI计算结果
    bmiResultType: "", //BMI计算结果
    bmiResultIndex: "", //BMI计算结果
    isShowResult: false, //是否显示结果
    refreshAnimation:null  //刷新按钮出场动画
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    console.log("statusBarHeight", systemInfo.statusBarHeight)
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })
  },
  //点击界面键盘消失
  hindKeyboard() {
    this.setData({
      keyShow: false
    });
  },
  //点击输入框，键盘显示
  showKeyboard(e) {
    let {
      type
    } = e.currentTarget.dataset

    this.setData({
      keyShow: true,
      currentInputType: type
    });
  },
  // 获取插入光标位置
  getStrPosition(e) {
    let {
      strIndex
    } = e.currentTarget.dataset
    this.setData({
      cursorIndex: strIndex
    })
  },
  keyTap(e) {
    wx.vibrateShort()
    if (this.data.currentInputType === "height") {
      this.onHeightInput(e);
    } else {
      this.onWeightInput(e);
    }
  },
  onHeightInput(e) {
    let {
      keys
    } = e.currentTarget.dataset,
      height = this.data.height.join(''), // 转为字符串
      strLen = height.length, {
        cursorIndex,
        inputLengthMax
      } = this.data
    switch (keys) {
      case '-1':
        if (cursorIndex > 0 && cursorIndex !== strLen) {
          // 从插入光标开始删除元素
          this.data.height.splice(cursorIndex - 1, 1)
          height = this.data.height.join('')
        } else {
          height = height.substr(0, height.length - 1)
        }
        if (!strLen || cursorIndex === strLen) { // 插入光标位置重置
          this.setData({
            cursorIndex: ''
          })
        }
        // 删除点 组件中可以用Observer监听删除点和删除0的情况
        if (height[0] === '0') {
          height = height.substr(1, height.length - 1)
        }
        break
      default:
        if (height[0] === '0') {
          height = height.substr(1, height.length - 1)
        }
        if (strLen < inputLengthMax) {
          height += keys
        }
        break
    }
    this.setData({
      height: height.split('')
    }) // 转为数组
  },
  onWeightInput(e) {
    let {
      keys
    } = e.currentTarget.dataset,
      weight = this.data.weight.join(''), // 转为字符串
      strLen = weight.length, {
        cursorIndex,
        inputLengthMax
      } = this.data
    switch (keys) {
      case '-1':
        if (cursorIndex > 0 && cursorIndex !== strLen) {
          // 从插入光标开始删除元素
          this.data.weight.splice(cursorIndex - 1, 1)
          weight = this.data.weight.join('')
        } else {
          weight = weight.substr(0, weight.length - 1)
        }
        if (!strLen || cursorIndex === strLen) { // 插入光标位置重置
          this.setData({
            cursorIndex: ''
          })
        }
        // 删除点 组件中可以用Observer监听删除点和删除0的情况
        if (weight[0] === '0') {
          weight = weight.substr(1, weight.length - 1)
        }
        break
      default:
        if (weight[0] === '0') {
          weight = weight.substr(1, weight.length - 1)
        }
        if (strLen < inputLengthMax) {
          weight += keys
        }
        break
    }
    this.setData({
      weight: weight.split('')
    }) // 转为数组
  },
  keyConfirm() {
    wx.vibrateShort()
    if (this.data.currentInputType === "height") {
      this.setData({
        currentInputType: "weight"
      })
      return
    }
    if (this.data.currentInputType === "weight" && this.data.height.length > 0 && this.data.weight.length > 0) {
      this.compute()
    }
  },
  go() {
    if (!this.data.bmiResult) {
      this.compute()
    } else {
      this.setData({
        height: [],
        weight: [],
        keyShow: true,
        cursorIndex: '',
        currentInputType: "height", // 当前聚焦的数据框
        bmiResult: null, //BMI计算结果
        isShowResult: false //是否显示结果
      })
    }
  },
  compute() {
    let h = parseInt(this.data.height.join(""));
    let w = parseInt(this.data.weight.join(""));
    if (h <= 0) {
      wx.showToast({
        title: '身高不能为0',
        icon: 'none'
      })
      return
    }
    if (w <= 0) {
      wx.showToast({
        title: '体重不能为0',
        icon: 'none'
      })
      return
    }
    this.hindKeyboard()

    let result = w / Math.pow(h / 100, 2)
    let bmiResult = Math.round(result * 10) / 10
    chinaStandard.forEach((item, index) => {
      if (bmiResult >= item.min && bmiResult <= item.max) {
      let animation = wx.createAnimation({
          duration:10000,
          timingFunction:'ease',
          delay:100,
          transformOrigin:"50% 50% 0"
          })
          animation.rotate(150).step()
        this.setData({
          bmiResult,
          isShowResult: true,
          bmiResultType: item.type,
          bmiResultIndex: index,
          refreshAnimation: animation.export()
        })

        
      }
    })
  },
})