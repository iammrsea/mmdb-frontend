import React from 'react';

import {
	SearchResults,
	CategoryList,
	AdminMarketItem,
	AddMarket,
	AdminMarketList,
	UsersMarketItem,
	UsersMarketList,
} from 'views';
export const adminRoutes = [
	{
		url: '/admin/markets',
		component: <AdminMarketList />,
	},
	{
		url: '/admin/markets/new',
		component: <AddMarket />,
	},
	{
		url: '/admin/markets/:id',
		component: <AdminMarketItem />,
	},
	{
		url: '/admin/categories',
		component: <CategoryList />,
	},
];
export const sidebarLinks = [
	{
		url: '/admin/markets',
		name: 'Market List',
		icon: <i className="material-icons">dashboard</i>,
	},
	{
		url: '/admin/markets/new',
		name: 'Add New Market',
		icon: <i className="material-icons">add</i>,
	},
	{
		url: '/admin/categories',
		name: 'Category List',
		icon: <i className="material-icons">category</i>,
	},
];

export const usersRoutes = [
	{
		url: '/',
		component: <UsersMarketList />,
	},
	{
		url: '/markets/:id',
		component: <UsersMarketItem />,
	},
	{
		url: '/search-results',
		component: <SearchResults />,
	},
];
