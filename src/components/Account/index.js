import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
	return (
		<div>
			<h4>Account Page</h4>
			<PasswordForgetForm />
			<PasswordChangeForm />
		</div>
	);
};
export default AccountPage;
