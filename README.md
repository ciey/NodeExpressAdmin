<p align="center">
    <img
      alt="Node.js"
      src="https://user-images.githubusercontent.com/3664948/63746652-ec549200-c8d7-11e9-8b5f-4d398e975e05.png"
      width="894"
    />
</p>

[![node version](https://img.shields.io/badge/node.js-%3E=_8.0.0-green.svg)](http://nodejs.org/download/)
[![express](https://img.shields.io/badge/express-%5E4.17.1-green.svg)](https://expressjs.com)
[![mysql](https://img.shields.io/badge/mysql-%5E2.17.1-green.svg)](https://github.com/mysqljs/mysql)

### 介绍
NodeExpressAdmin为后台权限管理系统 

[node后台权限管理系统(1)—权限设计](https://github.com/ciey/NodeExpressAdmin/issues/1)

[node后台权限管理(2)—界面设计及实现](https://github.com/ciey/NodeExpressAdmin/issues/2)

[node后台权限管理(3)—异常处理](https://github.com/ciey/NodeExpressAdmin/issues/3)

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

// models/sql/express_admin_init.sql 执行并初始化数据
// 默认初设账户admin/admin, test/test
$ npm start

```

### 项目布局

```
.
├── assets                          静态资源目录
│   ├── css                         自定义css
│   ├── images                      自定义图片
│   ├── js                          自定义js
│   └── libs                        第三方资源库
├── common                          公共组件
│   ├── logger.js                   日志
│   └── xxx.js                      其他（后续增加）
├── controller                      控制器
│   ├── login.js                    登录控制器 
│   ├── system.js                   系统控制器
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
