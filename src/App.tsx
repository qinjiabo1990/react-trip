import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home, SignIn, SignUp, ProductDetails, Search, ShoppingCart } from './pages'
import styles from './App.module.css'
import React from 'react';
import { useSelector } from './redux/hooks';

const PrivateRoute = ({component, isAuthenticated, ...rest}) => {
	const routeComponent = (props) => {
		return isAuthenticated ? (
			React.createElement(component, props)
		) : (
			<Redirect to={{pathname: '/signIn'}} />
		)
	}
	return <Route render={routeComponent} {...rest} />
}

function App() {
	const jwt = useSelector(s => s.user.token)

	return (
		<div className={styles.App}>
			<BrowserRouter>
				<Switch>
					<Route path="/signup" component={SignUp} />
					<Route path="/signin" component={SignIn} />
					<Route path="/details/:tourDetailsId" component={ProductDetails} />
					<Route path="/search/:keyword?" component={Search} />
					<PrivateRoute isAuthenticated={jwt !== null} path='/shoppingCart' component={ShoppingCart}  />
					<Route exact path="/" component={Home} />
					<Route render={() => <h1>404 Page Not Found</h1>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
