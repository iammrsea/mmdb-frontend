import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import AppContext from 'store/context/context';
import { useState } from 'react';
import ShowMarket from './ShowMarket';
import EditMarket from './EditMarket';

export default () => {
	const [shouldEdit, setShouldEdit] = useState(false);

	const { marketList } = useContext(AppContext);

	const { pathname } = useLocation();

	const getMarket = () => {
		const id = pathname.split('/')[3];
		return marketList.find((market) => market._id == id);
	};

	const toggleShouldEdit = () => {
		setShouldEdit((state) => !state);
	};

	const deleteMarket = (id) => {};
	return (
		<>
			{shouldEdit && getMarket() && <EditMarket market={getMarket()} toggleShouldEdit={toggleShouldEdit} />}
			{!shouldEdit && getMarket() && (
				<ShowMarket market={getMarket()} toggleShouldEdit={toggleShouldEdit} deleteMarket={deleteMarket} />
			)}
		</>
	);
};
