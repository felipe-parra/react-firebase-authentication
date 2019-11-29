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
		const { passwordOne } = this.state;
		this.props.withFirebase
			.doPasswordUpdate(passwordOne)
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
		const { passwordOne, passwordTwo, error } = this.state;
		const isInValid = passwordOne !== passwordTwo || passwordOne === '';
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<input
							className="form-control"
							type="password"
							name="passwordOne"
							id="passwordOne"
							placeholder="New Password"
							onChange={this.onChange}
							value={passwordOne}
						/>
					</div>
					<div className="form-group col-md-6">
						<input
							className="form-control"
							type="password"
							name="passwordTwo"
							id="passwordTwo"
							placeholder="Confirm Password"
							onChange={this.onChange}
							value={passwordTwo}
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
