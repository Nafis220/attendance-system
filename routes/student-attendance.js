const router = require('express').Router() 
const {getAttendance, getAttendanceStatus} = require('../controller/students-attendance')

router.get('/status',getAttendanceStatus)
router.get('/:id',getAttendance)


module.exports = router 