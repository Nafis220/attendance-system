//this file is working as a middleware. It's work is to set the route name such as /api/v1/auth/register 



const router = require('express').Router();
const authRoutes = require('./auth');
const userRouters = require('./user');
const adminAttendanceRouters = require('./admin_attendance')
const authenticate = require('../middleware/authenticate')
const studentsAttendanceRoutes = require('./student-attendance')

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users',authenticate, userRouters);
router.use('/api/v1/admin/attendance',authenticate, adminAttendanceRouters);
router.use('/api/v1/student/attendance',authenticate, studentsAttendanceRoutes)
module.exports = router;