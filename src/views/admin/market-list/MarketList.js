import React, { useContext } from 'react';
import { LinearProgress, Alert, Container } from 'components';

import Table from './Table';
import AppContext from 'store/context/context';

import { getItems, deleteItem } from 'service/network.service';

export default () => {
	const {
		marketList,
		hasNext,
		nextCursor,
		loading,
		setLoading,
		updateHasNext,
		updateMarketList,
		updateNextCursor,
		removeMarket,
		authUser,
	} = useContext(AppContext);

	const deleteMarket = (id) => {
		setLoading(true);
		deleteItem(authUser.token, '/markets/' + id)
			.then((res) => {
				setLoading(false);
				removeMarket(id);
			})
			.catch((e) => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
			});
	};
	const updateProductList = (product) => {};

	const deDuplicate = (list) => {
		return list.reduce((previous, current) => {
			let accumulator = previous;
			if (previous.indexOf(current) > -1) {
				return previous;
			}
			accumulator.push(current);
			return accumulator;
		}, []);
	};

	const loadMore = () => {
		setLoading(true);
		getItems({ url: '/markets', nextCursor })
			.then((res) => {
				setLoading(false);
				updateMarketList(res.data.data);
				updateHasNext(res.data.meta.hasNext);
				updateNextCursor(res.data.meta.nextCursor);
			})
			.catch((error) => {
				setLoading(false);
				Alert({ message: error.message, color: 'red' });
			});
	};

	return (
		<Container>
			<Table
				loadingMore={loading}
				updateProductList={updateProductList}
				markets={marketList}
				loadMore={loadMore}
				hasMore={hasNext}
				deleteMarket={deleteMarket}
			/>
		</Container>
	);
};
