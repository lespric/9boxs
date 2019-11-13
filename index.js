var nineBoxs = {
  boxsList: document.getElementById("nineBoxs").getElementsByClassName("box"),
  btnStart: document.getElementById("start"),
  btnEnd: document.getElementById("end"),
  // 获取document的Dom树中的box类名的元素节点，以及两个按钮的元素节点

  colorRandom: function() {
    var thisColor = "#";
    for (var i = 0; i < 6; i++) {
      thisColor += ((Math.random() * 16) | 0).toString(16);
    } // 通过随机十六进制的每个字符，来实现十六进制颜色的随机

    if (thisColor !== "#ffa600") {
      return thisColor;
    } else {
      return this.colorRandom();
    } // 定义输出值与原本颜色不相等
  },
  // 声明颜色随机的函数

  boxRandom: function() {
    var a = Math.floor(Math.random() * 9),
      b = Math.floor(Math.random() * 9),
      c = Math.floor(Math.random() * 9);

    if ((a - b) * (a - c) * (b - c)) {
      // 根据以上乘积不等于0，得a、b、c互不相等，若等于0或NaN，则是false
      this.boxsList[a].style.backgroundColor = this.colorRandom();
      this.boxsList[b].style.backgroundColor = this.colorRandom();
      this.boxsList[c].style.backgroundColor = this.colorRandom();
      // 由于该数组的项比较少，所以展开循环来提高性能

      console.log(a, b, c); // 方便打印显示来查看随机数字
    } else {
      this.boxRandom();
    } // 定义输出的数组内，每个项的位置互不相等
  },
  // 声明位置随机的函数

  boxRecover: function() {
    for (i = 0; i < this.boxsList.length; i++) {
      this.boxsList[i].style.backgroundColor = "#ffa600";
    }
  },
  // 声明颜色恢复的函数，多用length属性，防止数组越界而报错

  bgColorChange: function() {
    nineBoxs.boxRecover();
    nineBoxs.boxRandom();
  },
  // 先恢复原本颜色，再应用随机颜色，确保重复调用时保证只有三个随机颜色
  intervalId: {},
  // 声明一个定时器的对象
  
  btnDisabled: false,
  // 设置按钮的开关变量
};
// 创建一个全局对象，把该页面的变量和函数放在其中，以免与其他全局变量混合而影响调用

nineBoxs.btnStart.onclick = function() {
  if (!nineBoxs.btnDisabled) {
    nineBoxs.btnDisabled = true;
    // 防止重复点击来重复调用click事件处理程序
    this.className = "start-flicker btn-active";
    nineBoxs.btnEnd.className = "end-flicker btn-hover";
    // 点击后按钮变色，采用更改类名，来尽量给JS/CSS解耦
  
    nineBoxs.intervalId = setInterval(nineBoxs.bgColorChange, 1000);
    // 设置间歇调用；
  }
};
// 点击后，九宫格随机变色

nineBoxs.btnEnd.onclick = function() {
  this.className = "end-flicker btn-active";
  nineBoxs.btnStart.className = "start-flicker btn-hover";
  // 点击后按钮变色
  nineBoxs.btnDisabled = false;
  // 复原按钮的开关变量
  clearInterval(nineBoxs.intervalId);
  nineBoxs.boxRecover();
};
// 点击后取消间歇调用，并恢复原本颜色

/* GlobalObeject for nineBoxs {
  boxsList ← 每个方盒的元素节点的数组
  btnStart ← “开始闪”按钮的元素节点
  btnEnd ← “结束闪”按钮的元素节点
  bgColorChange ← 储存定时器的对象

  colorRandom ← 颜色随机的函数方法 {
    for i ← 0 to 5
      do colorCode ← ((Math.random() * (n-m) + m) | 0 ) toString(16)
         // 十六进制颜色的单个字符，取一位数并通过toString方法转为字符，而随机数中上式表示m~n的范围内
         thisColor ← # + colorCode[0]~[5];
      end

    if thisColor != 原本颜色
      then return thisColor
      else colorRandom() //重新执行colorRandom()方法，直到与原本颜色不相等
  }

  boxRandom ← 位置随机的函数方法 {
    a, b, c ← Math.floor(Math.random() * [m~n]) //再向下取舍，因floor的各个随机数概率差不多
    if (a-b)*(a-c)*(b-c) != 0 //a不等于b，且a不等于c，且b不等于c，即三个随机数互不相等
      then boxsList[a~c].style.backgroundColor ← colorRandom() //赋值给随机三个方盒随机的颜色
      else boxRandom() //重新执行boxRandom()方法，直到互不相等
  }

  boxRecover ← 恢复原本颜色的函数方法 {
    for i 0 to 8
      do boxList[i].style.backgroundColor ← 原本颜色
    end
  }
}
// 定义一个专属于九宫格页面的全局对象

btnStart.onclick ← 点击开始闪按钮触发的随机变色事件 {
   btnStart.style.className ← 点击状态的CSS类，为了解耦
   btnEnd.style.className ← 默认状态的CSS类

   bgColorChange ← setInterval(
     {
     boxRecover() // 恢复原本颜色
     boxRandom() // 位置随机且随机变色
     }
     1000ms // 添加个每1秒变化一次的定时器
   )
}
btnEnd.onclick ← 点击结束闪按钮触发的取消变化事件 {
   btnEnd.style.className ← 点击状态的CSS类，为了解耦
   btnStart.style.className ← 默认状态的CSS类
   
   clearInterval(bgColorChange) // 在变化事件的对象删除定时器，即停止重复执行
   boxRecover() // 恢复原本颜色
}
*/
