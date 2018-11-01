import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchCustomers';
class CustomerList extends Component {
	onCustomerDelete (id) {
		this.props
			.mutate({
				variables: { id },
			})
			.then(() => this.props.data.refetch());
	}

	renderCustomers () {
		if (this.props.data.loading) {
			return (
				<div className="progress">
					<div className="determinate" />
				</div>
			);
		} else {
			return this.props.data.customers.map(({ id, name }) => {
				return (
					<li href="#" key={id} className="collection-item">
						<div>
							<Link to={`/customer/${id}`}>{name}</Link>
							<a href="#" className="secondary-content">
								<div className="left">
									<i className="material-icons" onClick={() => this.onCustomerDelete(id)}>
										delete
									</i>
								</div>
							</a>
						</div>
					</li>
				);
			});
		}
	}

	//Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div>

	render () {
		return (
			<div>
				<h3>GraphQL, Apollo and React JS Application</h3>
				<ul className="collection with-header">
					<li className="collection-header">
						<h4>Customers</h4>
					</li>
					{this.renderCustomers()}
				</ul>
				<Link to="customer/new" className="btn-floating btn-large red right">
					<i className="material-icons left">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteCustomer($id: ID) {
		deleteCustomer(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(query)(CustomerList));
