import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => {
	return (
		<div>
			<h4>Password Forget</h4>
			<PasswordForgetForm />
		</div>
	);
};

const INITIAL_STATE = {
	email: '',
	error: null
};

class PasswordForgetFormBase extends React.Component {
	state = {
		...INITIAL_STATE
	};
	onSubmit = (event) => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { email, error } = this.state;
		const isInValid = email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<input
							type="email"
							name="email"
							id="email"
							value={this.state.email}
							onChange={this.onChange}
							placeholder="Email Address"
							className="form-control"
						/>
					</div>
					<div className="form-group col-md-6">
						<button className="btn btn-primary btn-md" disabled={isInValid} type="submit">
							Reset my password
						</button>
					</div>
				</div>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const PasswordForgetLink = () => (
	<p>
		<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetLink, PasswordForgetForm };
