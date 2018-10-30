import React, { Component } from 'react';

class AddCustomer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			customerName: '',
		};
	}

	render () {
		return (
			<div>
				<h2>Add a customer:</h2>
				<form>
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

export default AddCustomer;
