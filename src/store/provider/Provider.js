import React, { useReducer } from 'react';

import AppContext from '../context/context';

import { addCategoryAction, updateCategoryListAction, removeCategoryAction } from '../action-creators/categories';
import {
	addMarketAction,
	removeMarketAction,
	updateMarketListAction,
	editMarketAction,
} from '../action-creators/markets';
import {
	updateHasNextAction,
	setAuthUserAction,
	updateNextCursorAction,
	setLoadingAction,
} from '../action-creators/metaData';
import {
	marketReducer,
	setAuthUserReducer,
	categoryReducer,
	nextCursorReducer,
	hasNextReducer,
	setLoadingReducer,
} from '../reducers';

const Provider = ({ children }) => {
	const [marketList, dispatchMarketList] = useReducer(marketReducer, []);
	const [categoryList, dispatchCategoryList] = useReducer(categoryReducer, []);
	const [hasNext, dispatchHasNext] = useReducer(hasNextReducer, false);
	const [nextCursor, dispatchNextCursor] = useReducer(nextCursorReducer, '');
	const [loading, dispatchLoading] = useReducer(setLoadingReducer, false);
	const [authUser, dispatchAuthUser] = useReducer(setAuthUserReducer, null);

	const addCategory = (category) => {
		dispatchCategoryList(addCategoryAction(category));
	};
	const removeCategory = (categoryId) => {
		dispatchCategoryList(removeCategoryAction(categoryId));
	};
	const addMarket = (market) => {
		dispatchMarketList(addMarketAction(market));
	};
	const removeMarket = (marketId) => {
		dispatchMarketList(removeMarketAction(marketId));
	};
	const editMarket = (marketId) => {
		dispatchMarketList(editMarketAction(marketId));
	};
	const updateMarketList = (markets) => {
		dispatchMarketList(updateMarketListAction(markets));
	};
	const updateCategoryList = (categories) => {
		dispatchCategoryList(updateCategoryListAction(categories));
	};
	const updateHasNext = (value) => {
		dispatchHasNext(updateHasNextAction(value));
	};
	const updateNextCursor = (value) => {
		dispatchNextCursor(updateNextCursorAction(value));
	};
	const setLoading = (value) => {
		dispatchLoading(setLoadingAction(value));
	};
	const setAuthUser = (user) => {
		dispatchAuthUser(setAuthUserAction(user));
	};

	return (
		<AppContext.Provider
			value={{
				marketList,
				categoryList,
				hasNext,
				nextCursor,
				loading,
				authUser,
				addCategory,
				removeCategory,
				addMarket,
				removeMarket,
				editMarket,
				updateMarketList,
				updateCategoryList,
				updateHasNext,
				updateNextCursor,
				setLoading,
				setAuthUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default Provider;
