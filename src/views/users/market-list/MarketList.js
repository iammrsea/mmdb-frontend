import React, { useContext } from 'react';
import { LinearProgress, Alert, Container } from 'components';

import AppContext from 'store/context/context';
import { getItems } from 'service/network.service';
import { GridRow, GridItem } from 'components/grid';

import ShowDetail from './ShowDetail';
import { Flat } from 'components/buttons';

export default () => {
	const {
		marketList,
		hasNext,
		nextCursor,
		setLoading,
		updateHasNext,
		updateMarketList,
		updateNextCursor,
	} = useContext(AppContext);

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
	const markets =
		marketList.length > 0
			? marketList.map((market) => <ShowDetail key={market._id} market={market} />)
			: 'No market added yet';
	return (
		<Container>
			<h4 style={{ textAlign: 'center' }}>Welcome to our food market locator</h4>

			<GridRow style={{ marginTop: 40 }}>
				<GridItem sm={12} md={8} mdOffset={2}>
					{markets}
				</GridItem>
			</GridRow>

			{hasNext && (
				<div style={{ textAlign: 'right', marginBottom: 20 }}>
					<Flat onClick={loadMore}>Load More...</Flat>
				</div>
			)}
		</Container>
	);
};
