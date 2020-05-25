import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './MarketItem.css';

export default () => {
	const { state } = useLocation();

	const getMarket = () => {
		if (state && state.market) {
			return state.market;
		}
	};

	const popupText = (market) => {
		const text = `
		 <b>${market.name}</b></br>
		 <p>${market.foodCategory}</p>
		 <p>${market.address}</p></br>

		`;
		return text;
	};
	useEffect(() => {
		const market = getMarket();
		// console.log('market', market);
		let map;
		let marker;
		if (market.location.coordinates) {
			const coordinates = market.location.coordinates;
			// eslint-disable-next-line
			map = L.map('map').setView(coordinates.reverse(), 10);
			// eslint-disable-next-line
			marker = L.marker(coordinates.reverse()).addTo(map);

			marker.bindPopup(popupText(market)).openPopup();
		} else {
			// eslint-disable-next-line
			map = L.map('map').setView([40.91, -96.63], 10);
		}

		// eslint-disable-next-line
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		// eslint-disable-next-line
		// L.esri.Geocoding.geocode()
		// 	.address('380 New York St')
		// 	.city('Redlands')
		// 	.region('California')
		// 	.postal(92373)
		// 	.run(function (err, results, response) {
		// 		if (err) {
		// 			console.log(err);
		// 			return;
		// 		}
		// 		console.log('results', results);
		// 	});
	}, []);

	return <div id="map" style={{ height: '100vh', marginTop: 5 }}></div>;
};
