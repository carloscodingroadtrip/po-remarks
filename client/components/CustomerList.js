import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CustomerList extends Component {
	renderCustomers () {
		if (this.props.data.loading) {
			return (
				<div className="progress">
					<div className="determinate" />
				</div>
			);
		} else {
			return this.props.data.customers.map((customer) => {
				return (
					<a href="#!" key={customer.id} className="collection-item">
						{customer.customerName}
					</a>
				);
			});
		}
	}
	render () {
		return <div className="collection">{this.renderCustomers()}</div>;
	}
}

const query = gql`
	{
		customers {
			id
			customerName
		}
	}
`;

export default graphql(query)(CustomerList);
