import axios from 'axios';

export default (authToken) => {
	return axios.create({
		baseURL: 'http://localhost:5000/api',
		headers: {
			authorization: 'Bearer ' + authToken,
		},
	});
};
