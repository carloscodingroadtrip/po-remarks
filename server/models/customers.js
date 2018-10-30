const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
	{
		customerName: { type: String },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		repName: [
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

CustomerSchema.statics.addCustomer = function (id, repName) {
	const SalesRep = mongoose.model('reps');

	return this.findById(id).then((customer) => {
		const reps = new SalesRep({ repName, customer });
		customer.repName.push(reps);
		return Promise.all([ reps.save(), customer.save() ]).then(([ reps, customers ]) => customers);
	});
};

CustomerSchema.statics.findSalesRep = function (id) {
	return this.findById(id).populate('repName').then((customers) => customers.repName);
};

mongoose.model('customers', CustomerSchema);
