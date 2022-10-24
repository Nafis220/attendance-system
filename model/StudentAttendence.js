const { Schema, model } = require('mongoose');

const studentAttendanceSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		adminAttendence: {
			type: Schema.Types.ObjectId,
			ref: 'AdminAttendances',
			required: true,
		},
	},
	{ timestamps: true }
);

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;