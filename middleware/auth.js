class authMiddleware {
    /** 需要用户登录*/
    async loginRequired(req, res, next) {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.redirect('/login');
        }
        await next();
    }

    /** 用户鉴权*/
    async authUserPermission(req, res, next) {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.redirect('/login');
        }
        if (!req.session || !req.session.menu || req.session.menu.length == 0) {
            return res.send('抱歉，您无此权限！请联系管理员');
        }
        let targetUrl = req.route.path;
        let hasPower = false;
        req.session.menu.forEach(el => {
            if (el.page_url == targetUrl || el.control_url == targetUrl) {
                hasPower = true;
            }

        });
        if (!hasPower) {
            if (req.xhr) {
                return res.json({
                    state: false,
                    msg: "抱歉，您无此权限！请联系管理员"
                });
            }

            return res.send('抱歉，您无此权限！请联系管理员');
        }
        next();
    }

}

module.exports = new authMiddleware();