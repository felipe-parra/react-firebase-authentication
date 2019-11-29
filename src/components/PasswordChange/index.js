import React from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null
};

class PasswordChangeForm extends React.Component {
	state = { ...INITIAL_STATE };
	onSubmit = (event) => {
		event.preventDefault();
		const { passwordOne } = this.state;
		this.props.firebase
			.doPasswordUpdate(passwordOne)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error });
			});
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { passwordOne, passwordTwo, error } = this.state;
		const isInValid = passwordOne !== passwordTwo || passwordOne === '';
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<input
							className="form-control"
							name="passwordOne"
							value={passwordOne}
							onChange={this.onChange}
							type="password"
							placeholder="New Password"
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
				<button disabled={isInValid} type="submit" className="btn btn-primary">
					Change my Password
				</button>
				{error && <p className="text-danger">{error.message}</p>}
			</form>
		);
	}
}

export default withFirebase(PasswordChangeForm);
