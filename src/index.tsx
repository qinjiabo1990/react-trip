import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'; 
import './i18n/configs';
import {Provider} from 'react-redux';
import userStore from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

axios.defaults.headers['x-icode'] = '5B9A67206F5EFF21';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={userStore.store}>
			<PersistGate loading={<div>Loading</div>} persistor={userStore.persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
