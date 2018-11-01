import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class AddRep extends Component {
	constructor (props) {
		super(props);

		this.state = {
			salesRep: '',
		};
	}
	onSubmit (event) {
		event.preventDefault();
		this.props.mutate({
			variables: {
				repName: this.state.salesRep,
				customerId: this.props.customerId,
			},
		});
		this.setState({ salesRep: '' });
	}

	render () {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Add a representative:</label>
					<input
						onChange={(event) => this.setState({ salesRep: event.target.value })}
						value={this.state.salesRep}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSalesRepToCustomer($repName: String, $customerId: ID) {
		addSalesRepToCustomer(customerId: $customerId, repName: $repName) {
			id
			reps {
				id
				repName
				sales
			}
		}
	}
`;

export default graphql(mutation)(AddRep);
