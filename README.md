# ProudCat Web
html5 web 项目实践，resutful 风格后台API，自适应电脑和手机平台。

## 主要的技术
  - html5
  - css3(bootstrap)
  - javascript  (jquery)
  - mongodb3.0.7 (mongoose)
  - nodejs4.2.1 (express)


## 环境配置
  - 安装配置 [node.js](http://nodejs.org/)。
  - 安装配置 [mongodb](http://www.mongodb.org/downloads)，解压后将bin目录加到path。


## 开发工具
  - HTTP请求测试工具: postman (chrome extension)
  - IDE: webstorm/atom/sublime text
  - mongodb client GUI : [mongochef](http://3t.io/mongochef/download/) 个人版(free)


## 项目使用说明
  - git clone 项目。
  - 在项目根目录运行`$ npm install`下载项目依赖的库。
  - 配置mongodb 用户（如果mongo已经配置好了或者自己手动配置则忽略这条）。
    - 注意：以下只在mac上测试通过，windows上有可能有个地方会有问题。
    - 到 ./script 目录下执行`$ node setup_db.js`。
    - 执行`$ ./start_auth.sh` or `$  ./start_auth.bat`启动数据库。
  - 项目根目录下执行 `$ node app.js`启动项目或者用webstorm(神器)打开启动项目。
  - 可以用curl或者postman测试项目了，因为目前没有前端和测试代码。。。


## 目前状况
  - 紧锣密鼓开发中。


## License

Copyright (c) 2015 ProudCat &lt;koalaylj@gmail.com&gt;
MIT
