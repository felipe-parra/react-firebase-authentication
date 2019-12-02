import React from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import * as ROLES from '../../constants/roles';

class AdminPage extends React.Component {
	state = {
		loading: false,
		users: []
	};
	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.users().on('value', (snapshot) => {
			const usersObject = snapshot.val();

			const usersList = Object.keys(usersObject).map((key) => ({
				...usersObject[key],
				uid: key
			}));
			this.setState({
				users: usersList,
				loading: false
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}
	render() {
		const { users, loading } = this.state;
		return (
			<div className="container-fluid p-3">
				<h3>Admin</h3>
				<p>The Admin Page is accessible by every signed in admin user.</p>
				{loading && <div>Loading ...</div>}
				<UserList users={users} />
			</div>
		);
	}
}

const UserList = ({ users }) => (
	<table className="table">
		<thead>
			<tr>
				<th scope="col">ID</th>
				<th scope="col">E-Mail</th>
				<th scope="col">Username</th>
			</tr>
		</thead>
		<tbody>
			{users.map((user) => (
				<tr key={user.uid}>
					<th scope="row">{user.uid}</th>
					<td>{user.email}</td>
					<td>{user.username}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
