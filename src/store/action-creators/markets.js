import C from '../constants';

export const addMarketAction = (market) => ({
	type: C.ADD_MARKET,
	payload: market,
});
export const editMarketAction = (marketId) => ({
	type: C.EDIT_MARKET,
	payload: marketId,
});
export const removeMarketAction = (marketId) => ({
	type: C.DELETE_MARKET,
	payload: marketId,
});

export const updateMarketListAction = (markets) => ({
	type: C.UPDATE_MARKET_LIST,
	payload: markets,
});
