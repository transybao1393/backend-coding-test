const {format, createLogger, transports} = require('winston');
const path = require('path');

module.exports.logger = createLogger({
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.json()
        ),
        transports: [
            // info console log
            new (transports.Console)({
                level: 'info',
                name: 'info-console',
                colorize: true
            }),
            // info log file
            new (transports.File)({
                level: 'info',
                name: 'info-file',
                filename: path.resolve(__dirname, '../..', 'logs', 'development-info.log'),
                json: false
            }),
            // errors console log
            new (transports.Console)({
                level: 'error',
                name: 'error-console',
                colorize: true
            }),
            // errors log file
            new (transports.File)({
                level: 'error',
                name: 'error-file',
                filename: path.resolve(__dirname, '../..', 'logs', 'development-errors.log'),
                json: false
            })
        ]
    });

module.exports.stream = {
    write: function(message){
		logger.info(message);
		logger.error(message);
    }
};