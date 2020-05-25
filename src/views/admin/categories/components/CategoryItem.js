import React from 'react';

import { CollectionItem } from 'components/collections';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

const styles = {
	itemContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
};
export default ({ category, number, deleteCategory }) => {
	return (
		<CollectionItem>
			<div style={styles.itemContainer}>
				<div>
					<span>{number}: </span>
					{category.name}
				</div>

				<div style={{ textAlign: 'right' }}>
					<Flat onClick={() => deleteCategory(category._id)} className="delete-category">
						<MaterialIcon children="delete" />
					</Flat>
				</div>
			</div>
		</CollectionItem>
	);
};
