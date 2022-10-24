const router = require('express').Router() 
const {getEnable,getDisable, getStatus} = require('../controller/admin-attendance')

router.get('/enable',getEnable)
router.get('/disable',getDisable)
router.get('/running',getStatus)
module.exports = router