import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import fetchReps from '../queries/fetchReps';
import AddRep from './AddRep';
import RepList from './RepList';
class RepDetails extends Component {
	render () {
		console.log(this.props);
		const { customer } = this.props.data;
		if (!customer) {
			return (
				<div className="container">
					<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue">
							<div className="circle-clipper left">
								<div className="circle" />
							</div>
							<div className="gap-patch">
								<div className="circle" />
							</div>
							<div className="circle-clipper right">
								<div className="circle" />
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{customer.name}s</h3>
				<RepList reps={customer.reps} />
				<AddRep customerId={this.props.params.id} />
			</div>
		);
	}
}

export default graphql(fetchReps, {
	options: (props) => {
		return { variables: { id: props.params.id } };
	},
})(RepDetails);
