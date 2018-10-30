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
				customerName: { type: GraphQLString },
			},
			resolve (parentValue, { customerName }) {
				return new Customer({ customerName }).save();
			},
		},
		addSalesRepToCustomer: {
			type: CustomerType,
			args: {
				rep: { type: GraphQLString },
				customerId: { type: GraphQLID },
			},
			resolve (parentValue, { rep, customerId }) {
				return Customer.addRep(customerId, rep);
			},
		},
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
