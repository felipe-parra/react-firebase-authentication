import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const HomePage = () => {
	return (
		<div className="container-fluid">
			<div className="jumbotron">
				<p>Home page is accessible by every signed in user</p>
			</div>
			<Messages />
		</div>
	);
};

class MessageBase extends Component {
	state = {
		text: '',
		loading: false,
		messages: []
	};
	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.messages().on('value', (snapshot) => {
			const messageObject = snapshot.val();

			if (messageObject) {
				// convert messages list from snapshot
				const MessageList = Object.keys(messageObject).map((key) => ({
					...messageObject[key],
					uid: key
				}));
				this.setState({ messages: MessageList, loading: false });
			} else {
				this.setState({ messages: null, loading: false });
			}
		});
	}
	componentWillUnmount() {
		this.props.firebase.messages().off();
	}
	onCreateMessage = (e, authUser) => {
		this.props.firebase.messages().push({
			text: this.state.text,
			userId: authUser.uid
		});
		this.setState({ text: '' });
		e.preventDefault();
	};
	onChangeText = (e) => {
		this.setState({ text: e.target.value });
	};
	render() {
		const { text, messages, loading } = this.state;
		return (
			<AuthUserContext.Consumer>
				{(authUser) => (
					<div>
						{loading && <div>Loading ...</div>}
						{messages ? <MessageList messages={messages} /> : <div>There are no messages ...</div>}
						<form onSubmit={(event) => this.onCreateMessage(event, authUser)}>
							<div className="form-row">
								<div className="form-group col-md-6">
									<input
										type="text"
										value={text}
										onChange={this.onChangeText}
										placeholder="Write your message"
										name="text"
										className="form-control"
									/>
								</div>
								<div className="form-group col-md-6">
									<button className="btn btn-primary btn-md" type="submit">
										Send
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</AuthUserContext.Consumer>
		);
	}
}

const MessageList = ({ messages }) => (
	<ul>{messages.map((message) => <MessageItem key={message.uid} message={message} />)}</ul>
);

const MessageItem = ({ message }) => (
	<li>
		<strong>{message.userId}</strong> {message.text}
	</li>
);

const Messages = withFirebase(MessageBase);

const condition = (authUser) => !!authUser;

export default compose(withAuthorization(condition))(HomePage);
