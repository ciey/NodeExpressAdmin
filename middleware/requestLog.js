const logger = require('../common/logger');
const ignore = /^\/(assets|agent)/;

exports = module.exports = async (req, res, next) => {
    // Assets do not out log.
    if (ignore.test(req.url)) {
        await next();
        return;
    }

    let t = new Date();
    logger.info(req.method, req.url, req.ip);
    res.on('finish', () => {
        let duration = ((new Date()) - t);

        logger.info('Completed', res.statusCode, `(${duration} ms)`);
    });

    await next();
};

