import React, { Component } from 'react';

class RepList extends Component {
	renderReps (props) {
		return this.props.reps.map(({ id, repName }) => {
			return (
				<li key={id} className="collection-item">
					{repName}
				</li>
			);
		});
	}

	render () {
		return <ul className="collection">{this.renderReps()}</ul>;
	}
}

export default RepList;
