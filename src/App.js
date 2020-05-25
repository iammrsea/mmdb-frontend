import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { RoutesWithLayout, LinearProgress, Alert } from 'components';
import './assets/app.scss';
import './App.css';
import AppContext from 'store/context/context';
import { getItems } from 'service/network.service';

function App() {
	const context = useContext(AppContext);
	const {
		setAuthUser,
		updateCategoryList,
		setLoading,
		loading,
		updateMarketList,
		updateHasNext,
		updateNextCursor,
	} = context;
	useEffect(() => {
		setLoading(true);
		getItems({ url: '/markets' })
			.then((res) => {
				updateMarketList(res.data.data);
				updateHasNext(res.data.meta.hasNext);
				updateNextCursor(res.data.meta.nextCursor);
				const authUser = localStorage.getItem('mmdb_auth_user');
				if (authUser) {
					setAuthUser(JSON.parse(authUser));
				}
				return getItems({ url: '/categories' });
			})
			.then((catResponse) => {
				setLoading(false);
				// console.log('categories', catResponse);
				updateCategoryList(catResponse.data);
			})
			.catch((error) => {
				setLoading(false);
				Alert({ message: error.message, color: 'red' });
			});
	}, []);

	return (
		<Router>
			{loading && <LinearProgress />}
			<RoutesWithLayout loading={loading} />
		</Router>
	);
}

export default App;
