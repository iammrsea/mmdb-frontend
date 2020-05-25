import React from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import columns from './columns';

import { Card } from 'components/card';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

// import { dateFormatter } from 'utils';

const Table = ({ markets, loadMore, loadingMore, hasMore, deleteMarket }) => {
	const history = useHistory();

	const handleRowClicked = (row) => {
		history.push('/admin/markets/' + row._id, { id: row._id });
	};
	const handleLoadMore = () => {
		loadMore();
	};

	const actions = () => (
		<div>
			{hasMore && (
				<Flat disabled={loadingMore} onClick={handleLoadMore} className="right">
					Load more
				</Flat>
			)}
			<Flat disabled={loadingMore} onClick={() => history.push('/admin/markets/new')} className="right">
				Add Maket
			</Flat>
		</div>
	);

	const removeMarket = (id) => (
		<Flat className="delete-category" onClick={() => deleteMarket(id)}>
			<MaterialIcon children="delete" />
		</Flat>
	);

	const transformMarketItems = (data) => {
		return data.map((item, i) => {
			return {
				...item,
				position: i + 1,
				location: item.location.coordinates,
				remove: removeMarket(item._id),
			};
		});
	};

	return (
		<Card>
			<DataTable
				title="Market List"
				columns={columns}
				data={transformMarketItems(markets)}
				actions={actions()}
				highlightOnHover
				pointerOnHover
				onRowClicked={handleRowClicked}
				selectableRowsHighlight
			/>
		</Card>
	);
};
export default Table;
