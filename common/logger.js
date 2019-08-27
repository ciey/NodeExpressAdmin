const log4js = require('log4js');

log4js.configure({
    appenders: {
        logfile: {
            type: 'dateFile',
            filename: 'logs/app.log',
            pattern: "yyyy-MM-dd",
            alwaysIncludePattern: true,
            keepFileExt: true
        },
        display: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['logfile', 'display'],
            level: 'DEBUG'
        }
    },
    "pm2": true
});

const logger = log4js.getLogger();

module.exports = logger;