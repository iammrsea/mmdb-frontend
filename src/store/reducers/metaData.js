import C from '../constants';

export const hasNextReducer = (state = false, action) => {
	const { type, payload } = action;

	switch (type) {
		case C.UPDATE_HAS_NEXT:
			return payload;
		default:
			return state;
	}
};

export const nextCursorReducer = (state = '', action) => {
	const { type, payload } = action;

	switch (type) {
		case C.UPDATE_CURSOR:
			return payload;
		default:
			return state;
	}
};

export const setLoadingReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case C.SET_LOADING:
			return payload;
		default:
			return state;
	}
};
export const setAuthUserReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case C.SET_AUTH_USER:
			return payload;
		default:
			return state;
	}
};
