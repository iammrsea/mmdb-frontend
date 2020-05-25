import React from 'react';

const initialState = {};
export default React.createContext({
	marketList: [],
	categoryList: [],
	hasNext: false,
	nextCursor: '',
	loading: false,
	authUser: null,
	addCategory: (category) => {},
	removeCategory: (categoryId) => {},
	addMarket: (market) => {},
	removeMarket: (marketId) => {},
	editMarket: (market) => {},
	updateMarketList: (markets) => {},
	updateCategoryList: (categories) => {},
	updateHasNext: (value) => {},
	updateNextCursor: (value) => {},
	setLoading: (value) => {},
	setAuthUser: (user) => {},
});
