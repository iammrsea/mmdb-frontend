import C from '../constants';

export const updateHasNextAction = (value) => ({
	type: C.UPDATE_HAS_NEXT,
	payload: value,
});

export const updateNextCursorAction = (value) => ({
	type: C.UPDATE_CURSOR,
	payload: value,
});

export const setLoadingAction = (value) => ({
	type: C.SET_LOADING,
	payload: value,
});

export const setAuthUserAction = (user) => ({
	type: C.SET_AUTH_USER,
	payload: user,
});
