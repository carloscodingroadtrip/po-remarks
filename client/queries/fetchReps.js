import gql from 'graphql-tag';

export default gql`
	query FindReps($id: ID!) {
		customer(id: $id) {
			id
			name
			reps {
				id
				repName
				sales
			}
		}
	}
`;
