import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';

import * as ROLES from '../../constants/roles';

const AdminPage = () => {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h3>Admin</h3>
					<p>{authUser.email}</p>
					<p>Restricted area! Only users with the admin role are authorized</p>
				</div>
			)}
		</AuthUserContext.Consumer>
	);
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
