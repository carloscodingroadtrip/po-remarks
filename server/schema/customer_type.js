const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const SalesRepType = require('./salesrep_type');
const Customer = mongoose.model('customers');

const CustomerType = new GraphQLObjectType({
	name: 'CustomerType',
	fields: () => ({
		id: { type: GraphQLID },
		customerName: { type: GraphQLString },
		repName: {
			type: new GraphQLList(SalesRepType),
			resolve (parentValue) {
				return Customer.findReps(parentValue.id);
			},
		},
	}),
});

module.exports = CustomerType;
