import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';

// // Add a request interceptor
// axios.interceptors.request.use(
// 	(config) => {
// 		const token = window?.accessToken || 'hello';
// 		if (token) {
// 			// eslint-disable-next-line no-param-reassign
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}

// 		return config;
// 	},
// 	(error) => {
// 		Promise.reject(error);
// 	},
// );

// // Add a response interceptor
// axios.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		Promise.reject(error);
// 	},
// );

const root = createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
