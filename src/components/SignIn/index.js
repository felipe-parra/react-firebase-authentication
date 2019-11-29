import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
	return (
		<div className="container p-4">
			<h1>Sign In</h1>
			<SignInForm />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};
class SignInFormBase extends Component {
	state = { ...INITIAL_STATE };
	onSubmit = (event) => {
		const { email, password } = this.state;
		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
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
		const { email, password, error } = this.state;
		const isInValid = password === '' || email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<input
							className="form-control"
							name="email"
							value={email}
							onChange={this.onChange}
							type="email"
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group col-md-6">
						<input
							className="form-control"
							name="password"
							value={password}
							onChange={this.onChange}
							type="password"
							placeholder="Password"
						/>
					</div>
				</div>
				<button className="btn btn-primary btn-block" disabled={isInValid} type="submit">
					Sign In
				</button>
				{error && <p className="text-danger">{error.message}</p>}
			</form>
		);
	}
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
