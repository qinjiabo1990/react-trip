import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, SignIn, SignUp, ProductDetails } from './pages'
import styles from './App.module.css'

function App() {
	return (
		<div className={styles.App}>
			<BrowserRouter>
				<Switch>
					<Route path="/signup" component={SignUp} />
					<Route path="/signin" component={SignIn} />
					<Route path="/details/:tourDetailsId&:title" component={ProductDetails}></Route>
					<Route exact path="/" component={Home} />
					<Route render={() => <h1>404 Page Not Found</h1>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
