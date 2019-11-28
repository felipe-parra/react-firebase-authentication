import React from 'react';
import { FirebaseContext } from '../Firebase';

const Home = () => {
	return (
		<FirebaseContext.Consumer>
			{(firebase) => {
				return <div>I've acces to Firebase and render something.</div>;
			}}
		</FirebaseContext.Consumer>
	);
};
export default Home;
