'use strict';
/**
 * router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系，
 * 框架约定 router.js 文件用于统一所有路由规则。
 * 通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起可以更方便的来查看全局的路由规则。
 */
const router = require('express').Router(),
    auth = require('./middleware/auth'),
    login = require('./controller/login'),
    system = require('./controller/system'),
    main = require('./controller/main');

//登录
router.get('/login', login.showLogin);
router.post('/login', login.login);
router.get('/logout', login.logout);

router.get('/main', auth.loginRequired, main.showMain);

//用户管理
router.get('/system/userList', auth.authUserPermission, system.showUserList);
router.get('/system/getUserPage', auth.authUserPermission, system.getUserPage);
router.get('/system/userEdit/:id', auth.authUserPermission, system.showUserEdit);
router.post('/system/userEdit/:id', auth.authUserPermission, system.saveUserEdit);
router.post('/system/deleteUser/:id', auth.authUserPermission, system.deleteUser);

//菜单管理
router.get('/system/menuList', auth.authUserPermission, system.showMenuList);
router.get('/system/getMenuPage', auth.authUserPermission, system.getMenuPage);
router.get('/system/menuEdit/:id', auth.authUserPermission, system.showMenuEdit);
router.post('/system/menuEdit/:id', auth.authUserPermission, system.saveMenuEdit);
router.post('/system/deleteMenu/:id', auth.authUserPermission, system.deleteMenu);
router.get('/system/getMenuSelectJson', auth.loginRequired, system.getMenuSelectJson);
router.get('/system/getMenuTreeJson', auth.loginRequired, system.getMenuTreeJson);
router.get('/system/getMenuTreeJsonByUser', auth.loginRequired, system.getMenuTreeJsonByUser);

//部门管理
router.get('/system/branchList', auth.authUserPermission, system.showBranchList);
router.get('/system/getBranchPage', auth.authUserPermission, system.getBranchPage);
router.get('/system/branchEdit/:id', auth.authUserPermission, system.showBranchEdit);
router.post('/system/branchEdit/:id', auth.authUserPermission, system.saveBranchEdit);
router.post('/system/deleteBranch/:id', auth.authUserPermission, system.deleteBranch);
router.get('/system/getBranchSelectJson', auth.loginRequired, system.getBranchSelectJson);
router.get('/system/getBranchTreeJson', auth.loginRequired, system.getBranchTreeJson);

//职位管理
router.get('/system/positionList', auth.authUserPermission, system.showPositionList);
router.get('/system/getPositionPage', auth.authUserPermission, system.getPositionPage);
router.get('/system/positionEdit/:id', auth.authUserPermission, system.showPositionEdit);
router.post('/system/positionEdit/:id', auth.authUserPermission, system.savePositionEdit);
router.post('/system/deletePosition/:id', auth.authUserPermission, system.deletePosition);
router.get('/system/getPositionTreeJson', auth.loginRequired, system.getPositionTreeJson);

// 未找到路由
router.use((req, res) => {
    res.render('404');
});
module.exports = router; //导出