// import { combineReducers } from 'redux';

import marketReducer from './markets';
import categoryReducer from './categories';
import { hasNextReducer, nextCursorReducer, setLoadingReducer, setAuthUserReducer } from './metaData';

export { setAuthUserReducer, marketReducer, categoryReducer, hasNextReducer, nextCursorReducer, setLoadingReducer };
