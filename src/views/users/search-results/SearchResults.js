import React, { useContext, useState, useEffect } from 'react';
import { LinearProgress, Alert, Container } from 'components';

import AppContext from 'store/context/context';
import { searchItems, nearestMarket } from 'service/network.service';
import { GridRow, GridItem } from 'components/grid';

import ShowDetail from '../market-list/ShowDetail';
import { useLocation, useHistory } from 'react-router-dom';

export default () => {
	const { setLoading } = useContext(AppContext);

	const [searchedResult, setSeachedResult] = useState([]);
	const history = useHistory();

	const { state } = useLocation();

	useEffect(() => {
		searchMarket();
	}, [state]);

	const success = (position) => {
		const { longitude, latitude } = position.coords;
		const coordinates = [longitude, latitude];

		setLoading(true);
		nearestMarket('/markets/nearest-market', coordinates)
			.then((res) => {
				setLoading(false);
				if (res.data) {
					history.push('/markets/' + res.data._id, { market: res.data });
				}
			})
			.catch((error) => {
				setLoading(false);
				Alert({ message: error.message, color: 'red' });
			});
	};
	const failure = () => {
		Alert({ message: 'Unable to retrieve your current position', color: 'red' });
	};

	const getNearestMarket = (searchText) => {
		// eslint-disable-next-line
		// console.log('nearest market search', searchText);
		if (!navigator.geolocation) {
			Alert({ message: 'Geolocation is not supported by your browser', color: 'red' });
			return;
		}
		navigator.geolocation.getCurrentPosition(success, failure);
	};
	const searchMarket = () => {
		let searchText = state ? state.searchText.trim() : '';

		if (searchText.toLowerCase() === 'nearest market') {
			getNearestMarket(searchText);
		} else {
			setLoading(true);
			searchItems('/markets/search', searchText)
				.then((res) => {
					setLoading(false);
					setSeachedResult(res.data);
				})
				.catch((error) => {
					setLoading(false);
					Alert({ message: error.message, color: 'red' });
				});
		}
	};
	const markets =
		searchedResult.length > 0
			? searchedResult.map((market) => <ShowDetail key={market._id} market={market} />)
			: 'No results found';
	return (
		<Container>
			<h4 style={{ textAlign: 'center' }}>Search results</h4>

			<GridRow style={{ marginTop: 40 }}>
				<GridItem sm={12} md={8} mdOffset={2}>
					{markets}
				</GridItem>
			</GridRow>
		</Container>
	);
};
