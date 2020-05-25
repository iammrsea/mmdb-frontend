import C from '../constants';

const categoryReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case C.ADD_CATEGORY:
			return [...state, payload];
		case C.DELETE_CATEGORY:
			return state.filter((category) => category._id !== payload);
		case C.UPDATE_CATEGORY_LIST:
			return [...state, ...payload];
		default:
			return state;
	}
};

export default categoryReducer;
