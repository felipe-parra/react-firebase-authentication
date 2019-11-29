import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h4>Account: {authUser.email}</h4>
					<PasswordForgetForm />
					<PasswordChangeForm />
				</div>
			)}
		</AuthUserContext.Consumer>
	);
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
