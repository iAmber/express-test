# 使用Velocity模板引擎的Express框架搭建


## 什么是 Express

Express 是一个基于 Node.js 平台的极简、灵活的 web应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。您可以前往官网查看API和使用指南：
#### [Express 官网](http://www.expressjs.com.cn//)

### 1. 安装步骤 [安装步骤](http://www.th7.cn/web/js/201404/29836.shtml)

### 2. 修改模板配置（默认jade）
>* 安装velocityjs插件，npm install velocityjs
>* 修改package.json的dependencies中增加"velocityjs":"~0.7.5",
>* 修改app.js，将模板换成velocity
```javascript
//头部增加对象
var velocity = require('velocityjs');
var fs = require('fs');  
var cwd = process.cwd();
//修改引擎配置
app.set('view engine', 'vm');
//在这一行后面加上下面的引擎解析代码
app.use(express.static(path.join(__dirname, 'public')));
app.engine('vm',function(path,options,fn){  
        var template = fs.readFileSync(path).toString();  
        var macros = {  
            parse: function(file) {  
                var template = fs.readFileSync(cwd + '/' + file).toString()  
                return this.eval(template);  
            }  
        }  
        try{  
            fn(null, velocity.render(template, options, macros))  
        }catch(err){  
            console.log(err);  
            fn(err)  
        }  
});
```

> * 建立index.vm文件，修改代码显示传入的内容。注意编码。
> * 修改routes路径下的index.js，增加代码
```javascript
router.get('/index', function(req, res) {
  res.render('index', { title: 'Express' ,content: '这是一些的话'});
});
module.exports = router;//这一行前面加上代码，这样首页（“/”,”/index”）就同时指向了index
```
> * 公司的模版的文件名里面都有”.”,但是express的基本代码里面有一些处理会让这种文件名识别错误，我们需要修改node_modules\express\lib\view.js文件中的function View(name, options) 的定义。
```javascript
var ext = this.ext = extname(name); 修改为：
var ext = null;
```
### 3. 示例Example

https://github.com/iAmber/express-test



