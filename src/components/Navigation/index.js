import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => {
	return <div className="container p-2">{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => (
	<ul className="nav">
		<li className="nav-item">
			<Link to={ROUTES.HOME}>Home</Link>
		</li>
		<li className="nav-item">
			<Link to={ROUTES.ACCOUNT}>Account</Link>
		</li>
		<li className="nav-item">
			<Link to={ROUTES.ADMIN}>Admin</Link>
		</li>
		<li className="nav-item ml-auto">
			<SignOutButton />
		</li>
	</ul>
);

const NavigationNonAuth = () => (
	<ul className="nav">
		<li className="nav-item">
			<Link to={ROUTES.LANDING}>Landing</Link>
		</li>
		<li className="nav-item">
			<Link to={ROUTES.SIGN_IN}>Sign in</Link>
		</li>
	</ul>
);

export default Navigation;
