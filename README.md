<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

[![node version][node-image]][node-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_8.0.0-green.svg
[node-url]: http://nodejs.org/download/

### 介绍
NodeExpressAdmin为后台权限管理系统模板 

### 技术栈
Framework: Express

db: mysql

ORM: sequelize

Cache: redis

ECMAScript: ES6

### 项目运行

环境：
- node >=8, 推荐LTS 10+
- mysql >= 5.6
- redis 

```
//copy config.js，config.js为本地配置文件，加入了gitignore
$ cp config.default.js config.js

$ npm install

//mysql中手动建数据库，执行以下命令同步表
$ node dbsync

$ npm start

```

### 项目布局

```
.
├── assets                          静态资源目录
│   ├── css                         自定义css
│   ├── fonts                       字体
│   ├── images                      网站图标
│   ├── js                          自定义js
│   └── libs                        第三方资源库
├── common                          公共组件
│   ├── logger.js                   日志  
│   ├── upload_multer.js            上传
│   └── xxx.js                      其他（后续增加）
├── controller                      控制器
│   ├── login.js                    登录控制器 
│   ├── user.js                     用户控制器
│   ├── xxxx.js                     其他（后续增加）
├── logs                            日志文件
├── middleware                      中间件
│   ├── auth.js                     权限验证    
│   └── xxxx.js                     其他（后续增加）
├── models                          模型(数据库)
│   ├── index.js                    db配置及加载模型
│   └── user.js                     用户模型
├── upload                          上传文件夹
│   └── xxxx.png                     
├── views                           视图
├── app.js                          启动文件
├── config.default.js               默认配置     
├── config.js                       加载实际配置（本地）         
├── dbsync.js                       数据同步             
├── package.json                    配置文件
├── README.md                       项目说明
└── router.js                       路由表

```
