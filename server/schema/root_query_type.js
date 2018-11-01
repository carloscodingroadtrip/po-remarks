const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const CustomerType = require('./customer_type');
const SalesRepType = require('./salesrep_type');
const SalesRep = mongoose.model('reps');
const Customer = mongoose.model('customers');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		customers: {
			type: new GraphQLList(CustomerType),
			resolve () {
				return Customer.find({});
			},
		},
		customer: {
			type: CustomerType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve (parentValue, { id }) {
				return Customer.findById(id);
			},
		},
		salesRep: {
			type: SalesRepType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve (parentValue, { id }) {
				return SalesRep.findById(id);
			},
		},
	}),
});

module.exports = RootQuery;
