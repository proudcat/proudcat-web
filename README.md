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
  - 安装配置 [mongodb](http://www.mongodb.org/downloads),bin目录加到path。


## 项目使用说明
  - git clone 项目。
  - 项目根目录运行`$ npm install`下载依赖库。
  - 配置mongodb（如果mongo已经配置好了或者自己手动配置则忽略这条）。
    - 修改 `./script/db/mongod.cfg` & `mongod_auth.cfg`中`systemLog.path`(日志)和`storage.dbPath`(数据库)为你实际的路径，注意这两个路径必须存在，而且配置文件是YAML格式的，空白符不对都汇引起错误，修改时候请注意不要加多余空白或者删减空白符(谢特)。
    - 执行`$ node ./script/setup_db.js`。
    - 执行`$ ./script/start_auth.sh` or `$  ./script/start_auth.bat`启动数据库。
  - 执行 `$ node app.js`启动项目或者用webstorm(神器)导入项目后启动。
  - 可以用curl或者postman测试项目了，因为目前没有前端和测试代码。。。


## 开发工具
  - HTTP请求测试工具: postman (chrome extension)
  - IDE: webstorm/atom/sublime text
  - mongodb client GUI : [mongochef](http://3t.io/mongochef/download/) 个人版(free)


## 目前状况
  - 紧锣密鼓开发中。


## License

Copyright (c) 2015 ProudCat &lt;koalaylj@gmail.com&gt;
MIT
