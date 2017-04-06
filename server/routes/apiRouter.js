
import express from 'express'

let router = express.Router();
import report from '../controller/report'

//report
router.use('/report/log',report.log);
router.use('/report/getLog',report.getLog)

export default router;

