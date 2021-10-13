import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'; 
import './i18n/configs';
import {Provider} from 'react-redux';
import store from './redux/store';

axios.defaults.headers['x-icode'] = 'BB9091AEAC3502C6';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
