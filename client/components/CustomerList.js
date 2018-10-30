import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
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
		return (
			<div>
				<div className="collection">{this.renderCustomers()}</div>
				<Link to="customer/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
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
