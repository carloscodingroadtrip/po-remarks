const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SalesRepSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'customer',
	},
	sales: { type: Number, default: 0 },
	repName: { type: String },
});

SalesRepSchema.statics.like = function (id) {
	const SalesRep = mongoose.model('reps');
	return SalesRep.findById(id).then((reps) => {
		++reps.sales;
		return reps.save();
	});
};

mongoose.model('reps', SalesRepSchema);
