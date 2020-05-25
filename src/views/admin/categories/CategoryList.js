import React, { useContext } from 'react';

import { CategoryItem, AddCategory } from './components';
import { Collection, CollectionHeader } from 'components/collections';
import { Container, Alert } from 'components';
import { Flat } from 'components/buttons';

import AppContext from 'store/context/context';
import { postItem, deleteItem } from 'service/network.service';

export default () => {
	const [showAdd, setShowAdd] = React.useState(false);

	const { categoryList, removeCategory, addCategory, authUser, setLoading } = useContext(AppContext);

	const addCategoryItem = (category) => {
		setLoading(true);
		postItem(authUser.token, '/categories', category)
			.then((res) => {
				setLoading(false);
				addCategory(res.data);
			})
			.catch((e) => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
			});
		setShowAdd(false);
	};
	const handleDelete = (id) => {
		setLoading(true);
		deleteItem(authUser.token, '/categories/' + id)
			.then((res) => {
				setLoading(false);
				removeCategory(id);
			})
			.catch((e) => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
			});
	};

	const categoryItems = categoryList.map((category, i) => (
		<CategoryItem deleteCategory={handleDelete} key={category._id} number={i + 1} category={category} />
	));
	return (
		<Container>
			<Collection className="with-header">
				<CollectionHeader>List of Categories</CollectionHeader>
				{categoryItems.length > 0 ? categoryItems : 'No category added yet'}
			</Collection>
			<div style={{ textAlign: 'right' }}>
				{showAdd && <AddCategory addCategory={addCategoryItem} />}
				{!showAdd && <Flat onClick={() => setShowAdd(true)}>Add</Flat>}
			</div>
		</Container>
	);
};
