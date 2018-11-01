import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchReps from '../queries/fetchReps';

class RepDetails extends Component {
	render () {
		console.log(this.props);
		return (
			<div>
				<h3>Sales Rep Details</h3>
			</div>
		);
	}
}

export default graphql(fetchReps, {
	options: (props) => {
		return { variables: { id: props.params.id } };
	},
})(RepDetails);
