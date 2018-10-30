const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
	{
		name: { type: String },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		rep: [
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

		customer.rep.push(representative);
		console.log(customer);

		return Promise.all([ representative.save(), customer.save() ]).then(([ representative, customer ]) => {
			customer;
			console.log(customer);
		});
	});
};

CustomerSchema.statics.findSalesRep = function (id) {
	return this.findById(id).populate('rep').then((customer) => customer.customer);
};

mongoose.model('customers', CustomerSchema);
