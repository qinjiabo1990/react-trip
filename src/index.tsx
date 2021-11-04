import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'; 
import './i18n/configs';
import {Provider} from 'react-redux';
import rootStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = 'BB9091AEAC3502C6';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={rootStore.store}>
			<PersistGate loading={<div>Loading</div>} persistor={rootStore.persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
