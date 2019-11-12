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
  }
  // 声明颜色恢复的函数，多用length属性，防止数组越界而报错
};
// 创建一个全局对象，把该页面的变量和函数放在其中，以免与其他全局变量混合而影响调用

nineBoxs.btnStart.onclick = function() {
  this.className = "btn-active";
  nineBoxs.btnEnd.className = "end-flicker";
  // 点击后按钮变色，采用更改类名，来尽量给JS/CSS解耦

  bgColorChange = setInterval(function() {
    nineBoxs.boxRecover();
    nineBoxs.boxRandom();
  }, 1000);
  // 设置间歇调用，先恢复原本颜色，再应用随机颜色，确保重复调用时保证只有三个随机颜色；
  // 由于没有用var声明，所以该变量是全局变量且不属于nineBoxs对象中，所以可以被其他函数内部访问

//   this.getStop = (function() {
//     return bgColorChange;
//   })(); 
  // 尝试使用特权方法访问私有变量，但只要是放在nineBoxs对象里面就无法彻底停止；
};

nineBoxs.btnEnd.onclick = function() {
  this.className = "btn-active";
  nineBoxs.btnStart.className = "start-flicker";
  // 点击后按钮变色

  clearInterval(bgColorChange);
  nineBoxs.boxRecover();
};
// 点击后取消间歇调用，并恢复原本颜色
