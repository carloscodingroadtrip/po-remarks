const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Customer = mongoose.model('customers');
const SalesRep = mongoose.model('reps');
const CustomerType = require('./customer_type');
const SalesRepType = require('./salesrep_type');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addCustomer: {
			type: CustomerType,
			args: {
				name: { type: GraphQLString },
			},
			resolve (parentValue, { name }) {
				return new Customer({ name }).save();
			},
		},
		addSalesRepToCustomer: {
			type: CustomerType,
			args: {
				repName: { type: GraphQLString },
				customerId: { type: GraphQLID },
			},
			resolve (parentValue, { repName, customerId }) {
				return Customer.addSalesRep(customerId, repName);
			},
		},
		//Add Sales to the rep
		addSalesToRep: {
			type: SalesRepType,
			args: { id: { type: GraphQLID } },
			resolve (parentValue, { id }) {
				return SalesRep.like(id);
			},
		},
		deleteCustomer: {
			type: CustomerType,
			args: { id: { type: GraphQLID } },
			resolve (parentValue, { id }) {
				return Customer.remove({ _id: id });
			},
		},
	},
});

module.exports = mutation;
