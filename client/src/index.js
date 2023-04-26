import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

//Add a request interceptor
axios.interceptors.request.use(
	config => {
		const token = window?.accessToken || 'hello';
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}

		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		Promise.reject(error);
	}
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);


reportWebVitals();
