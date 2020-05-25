import React, { useContext } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { AdminLogin } from 'views';

import { AdminLayout, UsersLayout } from 'layouts';
import { adminRoutes, usersRoutes } from 'routes';

import AppContext from 'store/context/context';

export default () => {
	const { authUser } = useContext(AppContext);

	const getAdminRoutes = () => {
		let routes = adminRoutes.map((route) => (
			<Route
				key={route.url}
				path={route.url}
				exact
				render={() => {
					if (authUser) return <AdminLayout>{route.component}</AdminLayout>;
					return <Redirect to="/admin" />;
				}}
			/>
		));
		return routes;
	};
	const getUsersRoutes = () => {
		let routes = usersRoutes.map((route) => (
			<Route
				key={route.url}
				exact
				path={route.url}
				render={() => {
					return <UsersLayout>{route.component}</UsersLayout>;
				}}
			/>
		));
		return routes;
	};

	return (
		<Switch>
			{getAdminRoutes()}
			{getUsersRoutes()}
			<Route
				path="/admin"
				exact
				render={() => {
					console.log('/admin called');
					if (!authUser) return <AdminLogin />;
					return <Redirect to="/admin/markets" />;
				}}
			/>
		</Switch>
	);
};
