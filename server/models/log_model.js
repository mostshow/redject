/**
 * 日志表
 */

import mongoose from 'mongoose'
import bluebird from 'bluebird'


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var logSchema = new Schema({
	ip: String,
	userAgent: String,
	createAt: Number, // log创建时间
	resolution: String, // 分辨率
	msg: String,
    level: String,
	col: Number,
	row: Number,
	sourceFile: String, // 错误文件url
	referer: String,
    type: String,
	from: String
});

logSchema.index({ username: 1 }, { unique: true });


logSchema.pre('save', function(next) {

  if (this.isNew) {
    this.createAt = Date.now()
  }

  next()
})

export default mongoose.model('Log', logSchema)



