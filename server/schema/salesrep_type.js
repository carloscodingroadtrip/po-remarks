const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const SalesRep = mongoose.model('reps');

const SalesRepType = new GraphQLObjectType({
	name: 'SalesRepType',
	fields: () => ({
		id: { type: GraphQLID },
		sales: { type: GraphQLInt },
		repName: { type: GraphQLString },
		customer: {
			type: require('./customer_type'),
			resolve (parentValue) {
				return SalesRep.findById(parentValue).populate('customer').then((rep) => {
					console.log(rep);
					return rep.name;
				});
			},
		},
	}),
});

module.exports = SalesRepType;
