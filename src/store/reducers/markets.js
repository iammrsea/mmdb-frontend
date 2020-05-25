import C from '../constants';

const marketReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case C.ADD_MARKET:
			return [...state, payload];
		case C.DELETE_MARKET:
			return state.filter((market) => market._id !== payload);
		case C.EDIT_MARKET:
			return state.map((market) => {
				if (market._id === payload._id) return payload;
				return market;
			});
		case C.UPDATE_MARKET_LIST:
			return [...state, ...payload];
		default:
			return state;
	}
};

export default marketReducer;
