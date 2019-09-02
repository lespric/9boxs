# 任务1-九宫格

## 注释：Markdown格式

* [Markdown格式](https://blog.csdn.net/qq_27674439/article/details/93116914)
* 在VSCode中，下载安装**markdownlint**插件，即可自动识别md格式文件的错误，以下划曲线表示，点击小黄灯泡可以弹出错误解释。

## 一、任务目标

![任务目标](https://github.com/lespric/practise/blob/master/CSS-9/target.gif)

## 二、任务难点

1. 响应式设计：适配不同的设备及分辨率的屏幕，都能达到图片等比缩放的效果;
2. 盒模型布局：各元素以九宫格布局呈现，居中且等距分布；

## 三、成果呈现

![任务成果](https://github.com/lespric/practise/blob/master/CSS-9/result.gif)

## 四、开发过程

### 1. 开发前

#### step.1 分析html所需运用的标签

a. 因无文字及图片，而图形由CSS绘制，由此只需实现划分出九个区域，从而通过CSS的选择器来给九个区域应用样式，从而实现九个圆角方格；

b. 由此选择div来划分区域，如九宫格视为一个整体即一个模块，则在划分出一个大区域后再细分九个区域，通过对不同的div运用类（class）来区分；

#### step.2 分析CSS的盒模型布局模式

a. 由于div属于块状元素，块状元素都是占据一整行，需要改变为内联元素或内联块状元素，才可以多个元素并列一行；
b. 实现[九宫格布局](https://blog.csdn.net/jnshu_it/article/details/86611426)分为两种：

* 一种是转变为[浮动模型](https://www.cnblogs.com/python-machine/p/7966358.html)（**float**）
* 在CSS文件里，通过添加**float:left**，来使所有块状元素转变为内联块状元素，并都左对齐，且会自动换行，可以实现例如文字流式的效果，通过定义元素的外边距（margin）即可完成间距；
* 缺点：由于浮动模型中各元素移动到碰到另一元素的边框或包含框就停止，若各元素的盒高度不同，就会出现错落不齐，如word的图片围绕效果；

* 另一种是[弹性布局盒模型](www.ruanyifeng.com/blog/2015/07/flex-grammar.html)（**Flexible Box**）
* 在CSS文件里，通过添加**display:flex**，来创建一个flex容器，其所有子元素都会变为容器成员（内联块状元素），实现各元素等比缩放的效果，甚至缩放时各元素的缩放比例都可以不同；
* 缺点：部分较老的浏览器的兼容性不好，需要添加前缀；

#### step3. 分析响应式布局设计的要点

a. 在Responsive布局中，可以毫无保留的丢弃：

* 第一， 尽量少用无关紧要的div；
* 第二，不要使用内联元素（inline）；
* 第三，尽量少用JS或flash；
* 第四，丢弃没用的绝对定位和浮动样式；
* 第五，用宽度的百分比来代替元素的宽高、边距、圆角大小等，不用固定数值；
* 第六、页面布局中的关键部分（元素）不要过分的依赖现代技巧来实现，比如说CSS3特效或者JS脚本；

b. 帮助Responsive确定更好，更干净的布局：

* 第一，使用HTML5 Doctype和相关指南；
* 第二，重置好你的样式（reset.css）；
* 第三，一个简单的有语义的核心布局；
* 第四，给重要的网页元素使用简单的技巧，比如导航菜单之类元素

c. 快速测试的方法：

* 首先禁掉页面中所有的样式（以及与样式相关的信息），在浏览器中打开，如果内容排列有序，方便阅读，结构就可以；

### 2. 开发中

#### step1 搭建环境

a. 下载VSCode后，搜索**HTML Boilerplate**插件并安装，并在第一行输入html，选择下拉列表的html5模板，来应用html5模板；

b. 下载chrome浏览器，通过（**Ctrl+Shift+I/F12**）来打开开发者工具，可以在网页上调试在不同分辨率的屏幕下的效果；

c. 其中html5模板中，**<!DOCTYPE>**声明必须是 HTML 文档的第一行，位于 html 标签之前，同时在 html 标签内添加 meta 标签，来通过标记控制viewpoint；

* **!DOCTYPE**是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令，而html5只有一种：<!DOCTYPE html>，由此浏览器才能感知是哪种文档类型来呈现；  
* **meta**中的视口元素，设置页面宽度适配设备的屏幕宽度，并设置在首次加载时初始缩放级别为1.0，从而达到宽度自适应的效果；  
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

#### step2 编写html文档

a. 首先，在**head**内（不是在 style 标签内）使用 link 标签将css样式文件链接到HTML文件内；  
`<link href="index.css"  rel="stylesheet"  type="text/css" />`

b. 在 body 内，先创建一个整体模块 div，并赋予**class**即类的属性名称方便CSS里进行选择，再在其内部创建九个子元素 div，并赋予同一个类的属性名称，方便全部选择；

c. 由于图形绘制在CSS文件内，所以html文件的div模块建立空模块即可，并右键-格式化来调整缩进及分行格式；

#### step3 编写CSS文档

a. 首先，清除浏览器的默认脏边距，而一般用body而不是用* 作为选择器来清除，因为 *为通配符，会遍历所有标签，一方面效率较慢，另一方面会清除表格需要的格式：  
`body{margin:0;  padding:0;}`

b. 然后，建立一个flex容器

* 设置子元素的排列方向（**flex-direction**）及换行方式（**flex-wrap**），默认为从左向右水平排列（row）及不换行（nowrap），可通过如下  
`flex-flow:row wrap;`  
flex-flow`是flex-direction属性和flex-wrap属性的简写形式，默认值为row wrap，从而设置为自动换行到最左边；  
* 再设置第一个子元素的起始位置，justify-content属性定义了项目在主轴（水平方向）上的对齐方式，align-items属性定义项目在交叉轴（垂直方向）上如何对齐，通过如下，从而使得第一个子元素的起始位置在flex容器即大模块的左上角；  
`justify-content: flex-start;align-items: flex-start;`
* 再设置子元素的缩放属性，用flex来代替flex-shrink（缩小比例）、flex-grow（放大比例）和flex-basis（固定空间），默认为0 1 auto，通过如下  
`flex:auto;//auto (1 1 auto) 和 none (0 0 auto)`  
数值越大，缩放的比例越大，相同则等比缩放；

c. 之后，给子元素定义圆角正方形

* 设置子元素的背景颜色（background-color），一般应用[十六进制颜色](https://www.jianshu.com/p/98df921d4959)或者rgba（另加透明度）；
* 设置子元素的宽高，在响应式设计中，以屏幕宽度为基准，数值都以宽度的百分比表示，而子元素的高度以padding-top（数值为[宽度的百分比](https://www.cnblogs.com/linguoguo/p/4942034.html)）表示，如padding-top等于width的数值，子元素便为正方形，如  
`width:30%;padding-top:30%;`
* 边距（margin）及圆角大小以宽度的百分比表示，因为用户浏览的方式都是垂直滚动，如有水平滚动则影响体验，所以都以可视范围的宽度（device-width）作为参考；

d. 最后，完善等距布局

* 由于子元素间的外边距（margin）会相互影响而不会重叠，则一般设置子元素的上右边或下左边（上右下左的顺序）为同一数值，其余两边为0，由flex容器的内边距（padding）来定义；  
* 宽度计算：device-width（可视屏幕宽度100%）=padding（容器的下左内边距2.5%）+width（子元素宽度30%）* 3+margin（子元素的上右外边距2.5%）* 3

#### step4 上线测试

a. 初步测试：用chrome浏览器的[开发者工具](https://segmentfault.com/a/1190000000683599)测试，直接双击index.html在chrome打开，再用Ctrl+Shift+I打开开发者工具，模拟在不同分辨率的屏幕及移动设备上的布局情况；

b. 进一步测试：用[nginx模拟](https://www.zhihu.com/question/41430703)到手机测试，通过下载安装nginx并配置好链接本地文件，再查看电脑ip地址，且手机与电脑连同一个wifi，即可在手机浏览器输入**电脑ip/index.html**即可模拟；

### 3. 开发后

#### 验收标准

a. 还原设计图

* 圆角：宽度的10%  
* 颜色：#FFA600  
* 设计图：等距居中九宫格布局；

b. 自适应：宽度无滚动条，经chrome测试，格子随屏幕等比缩放；

c. 移动端：手机模拟符合九宫格宽度等同屏幕宽度；  

d. 编码规范  

* UTF-8: meta的charset默认UTF-8  
* 标签均小写 & 闭合  
* 元素属性值已用双引号包含  
* css外联引用  
* css不用id控制样式，都用类控制  
* 用div实现布局  

#### 深度思考

##### <!DOCTYPE>声明

* <!DOCTYPE>声明是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令，不是HTML标签，由此浏览器才能获知正确的文档类型来呈现；

##### 盒模型

* 盒模型是运用CSS技术的一种常用思维模式，通过将HTML文档元素都生成一个类似于盒子的矩形框，并围绕矩形框定义一系列与盒子相关的属性，可以更加形象地设置各元素的布局结构；
* **content**：内容，呈现盒子的主要信息内容，内容可以是文字、图片等多种类型，主要有三个属性：width、height和overflow，前两者定义内容宽高，后者定义溢出内容的处理方法；
* **padding**：填充，即内容与边框之间的空间，也是内边距，通过padding-top/bottom/left/right或padding来定义内容与边框的距离，设置盒子的背景色时，可以使背景色延申到填充区域；
* **border**：边框，以围绕填充区域的外边呈现，通过定义border的类型、颜色、粗细、圆角大小、背景图片等来定义border的样式，类似于描边效果；
* **margin**：距离，即边框与相邻其他元素的距离，也是外边距，会与相邻元素的外边距或内边距相加后得到两元素边框间的距离，可以定义为负值，来产生重叠效果；

##### 标签元素

* **block**：块状元素，常用的块状元素标签都有结束符，每个块级元素占据页面一整行或父容器的宽度100%，元素的高度、宽度、行高以及顶和底边距都可设置；
* **inline**：内联元素，常用的内联元素标签无需结束符，每个内联元素可以并列一行，元素的高度、宽度及顶和底边距不能设置，其宽度就是包含的文字或图片的宽度；
* **inline-block**：内联块状元素，常用的标签为 img 、input ，每个内联标签元素可以并列一行，且其高度、宽度、及顶和底边距都可以设置；

##### chrome浏览器的调试

**Elements**：从浏览器的角度，可以看到渲染页面所需要的HTML、CSS和DOM对象，还可以编辑来改变呈现效果；

a. **HTML文档部分**：可以对HTML文档中的DOM节点进行处理，把鼠标悬浮在某一节点，对应的元素会在页面以盒子形式指示出来，右键DOM节点可以进行修改：

* Add Attribute: 在标签中增加新的属性；
* Force Element State: 有时候为页面元素添加一些动态的样式，比如当鼠标悬停在元素上时的样式，可以使用Force Element State强制元素状态，便于调试
* Edit as HTML: 以HTML形式更改页面元素；
* Copy XPath: 复制XPath；
* Delete Node: 删除DOM节点；
* Break On: 设置DOM 断点；

b. **CSS文档部分**：显示当前选中的标签的CSS样式、属性等，以及盒模型的直观图形；

* Styles: 显示用户定义的样式，比如请求的default.css中的样式，和通过Javasript生成的样式，还有开发者工具添加的样式
* Computed: 显示开发者工具计算好的元素样式；
* Event Listeners: 显示当前HTML、DOM节点和其祖先节点的所有JavaScript事件监听器，这里的监听脚本可以来自Chrome的插件。可以点击右边小漏斗形状(filter)选择只显示当前节点的事件监听器。
* DOM Breakpoints: 列出所有的DOM 断点；
* Properties: 超级全面地列出当前选中内容的属性，不过基本很少用到。
* .cls：当前标签添加新的选择器，新建立的样式为inspector-stylesheet，此外，也可以直接在原有的样式上增加、修改、禁用样式属性；
* .hov：可以查看鼠标各种交互动作时的CSS样式；

**Network**：可以看到页面向服务器请求了哪些资源、资源的大小以及加载资源花费的时间，也能看到哪些资源不能成功加载，以及查看HTTP的请求头，返回内容等；

a. **默认显示的功能列**：

* Name/Path: 资源名称以及URL路径；
* Method: HTTP请求方法；
* Status/Text: HTTP状态码/文字解释；
* Type: 请求资源的MIME类型；
* Initiator解释请求是怎么发起的，有四种可能的值：
* Parser：请求是由页面的HTML解析时发送的；
* Redirect：请求是由页面重定向发送的；
* Script：请求是由script脚本处理发送的；
* Other：请求是由其他过程发送的，比如页面里的link链接点击，在地址栏输入URL地址。
* Size/Content: Size是响应头部和响应体结合起来的大小，Content是请求内容解码后的大小。
* Time/Latency: Time是从请求开始到接收到最后一个字节的总时长，Latency是从请求开始到接收到第一个字节的时间；
* Timeline: 显示网络请求的可视化瀑布流，鼠标悬停在某一个时间线上，可以显示整个请求各部分花费的时间。

b. **另外的六个小功能**：

* Record Network Log: 红色表示此时正在记录资源请求信息；
* Clear: 清空所有的资源请求信息；
* Filter: 过滤资源请求信息；
* Use small resource raws: 每一行显示更少的内容；
* Perserve Log: 再次记录请求的信息时不擦出之前的资源信息；
* Disable cache: 不允许缓存的话，所有资源均重新加载。

**Sources**: 主要用来调试js；

**Timeline**: 提供了加载页面时花费时间的完整分析，所有事件，从下载资源到处理Javascript，计算CSS样式等花费的时间都展示在Timeline中；

**Profiles**: 分析web应用或者页面的执行时间以及内存使用情况；

**Resources**: 对本地缓存（IndexedDB、Web SQL、Cookie、应用程序缓存、Web Storage）中的数据进行确认及编辑；

**Audits**: 分析页面加载的过程，进而提供减少页面加载时间、提升响应速度的方案；

**Console**: 显示各种警告与错误信息，并且提供了shell用来和文档、开发者工具交互。

##### 九宫格的实现方式

a. 一种是转变为浮动模型（float）

* 实现：通过添加float:left，来使所有块状元素转变为内联块状元素，并都左对齐，且会自动换行，可以实现例如文字流式的效果，通过定义元素的外边距（margin）即可完成间距；
* 优点：浏览器兼容性好；
* 缺点：由于浮动模型中各元素移动到碰到另一元素的边框或包含框就停止，如各元素的盒高度不同，就会出现错落不齐，如word的图片围绕效果，移动端问题较多；

b. 另一种是弹性布局盒模型（Flexible Box）

* 实现：通过添加display:flex，来创建一个flex容器，其所有子元素都会变为容器成员（内联块状元素），实现各元素等比缩放的效果，甚至缩放时各元素的缩放比例都可以不同；
* 优点：移动设备友好，即便内容的大小和动态未知也可以有效地设置布局；
* 缺点：部分较老的浏览器的兼容性不好，需要添加前缀；

##### IDE

a. 说明：指的是集成开发环境，用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面等工具；

b. 特点：集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套，具备这一特性的软件都可以独立运行并可以自动生成；

c. 与文本编辑器的比较：

* 优点：节省时间与精力，因集成而不用切换软件且减少失误，在同一个开发环境可以建立统一开发标准，并且可以方便管理开发进程；
* 缺点：也因集成具有一定的学习门槛，对于初学者不适合作为学习一种新语言时的工具使用，而且因自动识别而会忽略一些坏代码或设计，不利于代码完善；

##### &lt;meta&gt;对viewpoint的作用

a. 添加meta：可以设置页面宽度适配设备的屏幕宽度，并设置在首次加载时初始缩放级别为1.0，从而达到宽度自适应的效果；

b. 不加meta：在不同设备上尤其在移动设备显示，会导致布局错乱，缩放比例出错。
