
import bluebird from 'bluebird'
import _ from 'lodash'

import LogModel from '../models/log_model'
import tools from '../common/tools'
import config from '../config'

export default {

    log(req, res, next) {
        let resolution = tools.getParam(req,'resolution');
        let message = tools.getParam(req,'message');
        let colNum = tools.getParam(req,'colNum');
        let rowNum = tools.getParam(req,'rowNum');
        let sourceFile = tools.getParam(req,'sourceFile');
        let from = tools.getParam(req,'from');

        let _log = {
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: tools.getPlatform(req.headers['user-agent'] || '') + ':----' + req.headers['user-agent'],
            resolution: resolution || '',
            message: htmlEncode(message) || '',
            colNum: htmlEncode(colNum) || -1,
            rowNum: htmlEncode(rowNum) || -1,
            sourceFile: htmlEncode(sourceFile) || '',
            referUrl: req.headers['referer'] || req.body.referer || '',
            from: htmlEncode(from) || ''
        }

        var log = new Log(_log);

        log.save(function (error) {
            if (err) {
                tools.sendResult(res,-1);
            }
            tools.sendResult(res,0);
        });
    },
    getLog(req, res, next) {
        LogModel.find({}).then(reData =>{
            console.log(reData)
            tools.sendResult(res,0,reData);
        }).catch( err =>{
            console.log(err)
        } )
    }
}

