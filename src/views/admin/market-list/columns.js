const columns = [
	{
		name: 'S/N',
		selector: 'position',
		sortable: true,
	},
	{
		name: 'Name',
		selector: 'name',
		sortable: true,
	},

	{
		name: 'Category',
		selector: 'foodCategory',
		sortable: true,
	},
	{
		name: 'Address',
		selector: 'address',
		sortable: true,
	},
	{
		name: 'Remove',
		selector: 'remove',
	},

	// {
	// 	name: 'Date Added',
	// 	selector: 'createdAt',
	// 	sortable: true,
	// 	right: true,
	// },
];

export default columns;
