const _ = require('lodash'),
    crypto = require('crypto'),
    logger = require('../common/logger'),
    models = require('../models'),
    Op = models.Sequelize.Op;

/** 登录注册相关 */
class loginController {

    /**登录页面 */
    async showLogin(req, res, next) {
        res.render("login", {});
    }

    /** 执行登录 */
    async login(req, res, next) {
        let loginname = req.body.loginname;
        let password = req.body.password;
        const user = await models.user.findOne({
            where: {
                login_name: loginname
            }
        });
        if (user === null) {
            return res.send({
                state: false,
                msg: "用户名或密码错误！"
            })
        }
        if (user.is_enabled == 0) {
            return res.send({
                state: false,
                msg: "禁止登录，请联系管理员！"
            })
        }
        if (crypto.createHash('md5').update(password).digest('hex') === user.login_password) {
            req.session.user = user;

            const userPosition = await models.position.findAll({
                where: {
                    id: {
                        [Op.in]: user.position_id.split(',')
                    }
                },
            });
            let menuId = [];
            if (userPosition.length > 0) {
                userPosition.forEach(element => {
                    menuId = _.union(menuId, element.menu_id.split(','));
                });
            }

            const userMenu = await models.menu.findAll({
                where: {
                    id: {
                        [Op.in]: menuId

                    },
                    is_enabled: 1,
                },
            });
            req.session.menu = userMenu;

            logger.info("用户：" + loginname + "登录成功！");
            return res.send({
                state: true,
                msg: "登录成功！"
            })
        } else {
            return res.send({
                state: false,
                msg: "用户名或密码错误！"
            })
        }
    }

    /** 退出登录 */
    async logout(req, res, next) {
        req.session.destroy(function() {
            res.redirect('/login');
        });
    }

}

module.exports = new loginController();