import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => {
	return (
		<div className="navbar navbar-expand-lg navbar-dark bg-primary">
			<button className="navbar-toggler" type="button" data-toggle="collapse">
				<span className="navbar-toggler-icon" />
			</button>
			<AuthUserContext.Consumer>
				{(authUser) => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
			</AuthUserContext.Consumer>
		</div>
	);
};

const NavigationAuth = ({ authUser }) => (
	<div className="collapse navbar-collapse">
		<ul className="navbar-nav">
			<li className="nav-item">
				<Link to={ROUTES.HOME} className="nav-link">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link to={ROUTES.ACCOUNT} className="nav-link">
					Account
				</Link>
			</li>

			{!!authUser.roles[ROLES.ADMIN] && (
				<li className="nav-item">
					<Link to={ROUTES.ADMIN} className="nav-link">
						Admin
					</Link>
				</li>
			)}
		</ul>
		<SignOutButton className="mr-auto" />
	</div>
);

const NavigationNonAuth = () => (
	<div className="collapse navbar-collapse">
		<ul className="navbar-nav">
			<li className="nav-item">
				<Link to={ROUTES.LANDING} className="nav-link">
					Landing
				</Link>
			</li>
			<li className="nav-item">
				<Link to={ROUTES.SIGN_IN} className="nav-link">
					Sign in
				</Link>
			</li>
		</ul>
	</div>
);

export default Navigation;
