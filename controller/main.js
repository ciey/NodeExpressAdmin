class mainController {
    async showMain(req, res, next) {
        res.render("main/index", {
            pageTitle: "主页"
        });
    }
}

module.exports = new mainController();