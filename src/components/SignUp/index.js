import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => {
	return (
		<div className="container p-4">
			<h1>SignUp</h1>
			<SignUpForm />
		</div>
	);
};

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	isAdmin: false,
	error: null
};

class SignUpFormBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	onSubmit = (event) => {
		const { username, email, passwordOne, isAdmin } = this.state;
		const roles = {};
		if (isAdmin) {
			roles[ROLES.ADMIN] = ROLES.ADMIN;
		}
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				// Create a user in your Firebase realtime database
				return this.props.firebase.user(authUser.user.uid).set({ username, email, roles });
			})
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

	onChangeCheckbox = (event) => {
		this.setState({ [event.target.name]: event.target.checked });
	};

	render() {
		const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state;
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<input
						className="form-control"
						name="username"
						value={username}
						onChange={this.onChange}
						type="text"
						placeholder="Full Name"
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						name="email"
						value={email}
						onChange={this.onChange}
						type="email"
						placeholder="Email Address"
					/>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<input
							className="form-control"
							name="passwordOne"
							value={passwordOne}
							onChange={this.onChange}
							type="password"
							placeholder="Password"
						/>
					</div>
					<div className="form-group col-md-6">
						<input
							className="form-control"
							name="passwordTwo"
							value={passwordTwo}
							onChange={this.onChange}
							type="password"
							placeholder="Confirm Password"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="form-check">
						<input
							name="isAdmin"
							type="checkbox"
							checked={isAdmin}
							onChange={this.onChangeCheckbox}
							className="form-check-input bg-primary"
							id="gridCheck"
						/>
						<label className="form-check-label text-primary" htmlFor="gridCheck">
							is Admin?
						</label>
					</div>
				</div>
				<button className="btn btn-primary btn-block" type="submit" disabled={isInvalid}>
					Sign Up
				</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
	</p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
