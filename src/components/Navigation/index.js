import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Navigation = () => {
	return (
		<div className="container p-2">
			<ul className="nav">
				<li className="nav-item">
					<Link to={ROUTES.SIGN_IN}>Sign in</Link>
				</li>
				<li className="nav-item">
					<Link to={ROUTES.LANDING}>Landing</Link>
				</li>
				<li className="nav-item">
					<Link to={ROUTES.HOME}>Home</Link>
				</li>
				<li className="nav-item">
					<Link to={ROUTES.ACCOUNT}>Account</Link>
				</li>
				<li className="nav-item">
					<Link to={ROUTES.ADMIN}>Admin</Link>
				</li>
			</ul>
		</div>
	);
};
export default Navigation;
