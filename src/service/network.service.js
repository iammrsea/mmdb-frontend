import client from './client';

export const getItems = ({ url, first, nextCursor }) => {
	return new Promise((resolve, reject) => {
		client()
			.get(url, {
				params: {
					first,
					nextCursor,
				},
			})
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};
export const searchItems = (url, searchText) => {
	return new Promise((resolve, reject) => {
		client()
			.get(url, {
				params: {
					searchText,
				},
			})
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};
export const nearestMarket = (url, coordinates) => {
	return new Promise((resolve, reject) => {
		client()
			.get(url, {
				params: {
					coordinates,
				},
			})
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};
export const editItem = (authToken, url, item, config) => {
	return new Promise((resolve, reject) => {
		client(authToken)
			.put(url, item, config)
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};

export const deleteItem = (authToken, url) => {
	return new Promise((resolve, reject) => {
		client(authToken)
			.delete(url)
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};

export const postItem = (authToken, url, item, config) => {
	return new Promise((resolve, reject) => {
		client(authToken)
			.post(url, item, config)
			.then((res) => resolve(res))
			.catch((error) => reject(error));
	});
};
