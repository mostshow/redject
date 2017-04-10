
import bluebird from 'bluebird'
import _ from 'lodash'
import moment from 'moment'
import request from 'request'
import sourceMap from 'source-map'

import LogModel from '../models/log_model'
import tools from '../common/tools'
import config from '../config'

export default {

    log(req, res, next) {

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let userAgent = tools.getPlatform(req.headers['user-agent'] || '') + ':----' + req.headers['user-agent'];
        let level = req.query.level || 'NONE';

        req.query._t = moment().format('YYYY-MM-DD HH:mm')
        req.query.userAgent = userAgent
        req.query.ip = ip

        tools.logger(req.query,level)
        tools.sendResult(res,-1);

        if(req.query.type !== 'SCRIPTERROR'){
            return;
        }
        let msg = req.query.msg || '';
        let col = req.query.col || -1;
        let row = req.query.row || -1;
        let sourceFile = req.query.sourceFile || '';
        let referer = req.query.referer || '' ;
        let resolution = req.query.resolution || '';
        let from = req.query.from || '';
        let type = req.query.type || 'NONE'

        let _log = {
            ip: ip,
            userAgent:userAgent,
            msg: msg ,
            col: tools.htmlEncode(col) ,
            row: tools.htmlEncode(row) ,
            sourceFile: sourceFile,
            level: level,
            referer: referer,
            resolution: resolution ,
            from: from,
            type: type,

        }

        let log = new LogModel(_log);

        log.save(function (error) {
            if (error) {
                // tools.sendResult(res,-1);
            }
            // tools.sendResult(res,0);
        });
    },
    getLog(req, res, next) {
        LogModel.find({}).then(reData =>{
            console.log(reData)
            tools.sendResult(res,0,reData);
        }).catch( err =>{
            console.log(err)
        } )
    },
    getSourceMap(req, res){

        let row = +req.query.row || 1;
        let col = +req.query.col || 10;
        let sourceMapSrc = (req.query.sourceMapSrc && decodeURIComponent(req.query.sourceMapSrc)) || 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.map';

        if (row > 0 && col > 0 && sourceMapSrc) {
            request(sourceMapSrc,  (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        JSON.parse(body);
                        let consumer = new sourceMap.SourceMapConsumer(body);
                        let result = consumer.originalPositionFor({ line: row, column: col });

                        tools.sendResult(res,0,result);
                    } catch (e) {

                        tools.sendResult(res,-10);
                    }
                } else {
                    //response.statusCode
                    //response.statusMessage
                    tools.sendResult(res,-11);
                }
            });
        } else {
            tools.sendResult(res,-1);
        }
    }
}

