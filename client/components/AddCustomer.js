import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchCustomers';

class AddCustomer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			customerName: '',
		};
	}
	onSubmit (event) {
		event.preventDefault();
		this.props
			.mutate({
				variables: {
					custName: this.state.customerName,
				},
				refetchQueries: [ { query } ],
			})
			.then(() => hashHistory.push('/'));
	}
	render () {
		return (
			<div>
				<Link to="/">Back</Link>
				<h2>Add a customer</h2>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Customer Name:</label>
					<input
						type="text"
						value={this.state.customerName}
						onChange={(event) => this.setState({ customerName: event.target.value })}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddCustomer($custName: String) {
		addCustomer(customerName: $custName) {
			customerName
		}
	}
`;

export default graphql(mutation)(AddCustomer);
