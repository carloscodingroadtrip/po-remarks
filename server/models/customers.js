const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
	{
		name: { type: String },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		reps: [
			{
				type: Schema.Types.ObjectId,
				ref: 'reps',
			},
		],
	},
	{
		usePushEach: true,
	}
);

CustomerSchema.statics.addSalesRep = function (id, repName) {
	const SalesRep = mongoose.model('reps');

	return this.findById(id).then((customer) => {
		const representative = new SalesRep({ repName, customer });

		customer.reps.push(representative);

		return Promise.all([ representative.save(), customer.save() ]).then(([ representative, customer ]) => customer);
	});
};

CustomerSchema.statics.findSalesRep = function (id) {
	return this.findById(id).populate('reps').then((customer) => customer.reps);
};

mongoose.model('customers', CustomerSchema);
