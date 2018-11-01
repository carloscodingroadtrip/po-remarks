import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import CustomerList from './components/CustomerList';
import App from './components/App';
import AddCustomer from './components/AddCustomer';
import RepDetails from './components/RepDetails';

const client = new ApolloClient({
	dataIdFromObject: (o) => o.id,
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={CustomerList} />
					<Route path="/customer/new" component={AddCustomer} />
					<Route path="/customer/:id" component={RepDetails} />
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
