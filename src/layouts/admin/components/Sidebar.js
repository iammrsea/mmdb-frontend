import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Collection, CollectionItem } from 'components/collections';
import Brand from './Brand';

const Sidebar = ({ sidebarLinks, closeSidenav }) => {
	const activeRoute = (routeName) => {
		const urlParts = routeName.split('/');
		return window.location.href.endsWith(urlParts[urlParts.length - 1]);
	};
	const linkItems = sidebarLinks.map((link, i) => (
		<CollectionItem key={link.name + i} onClick={closeSidenav}>
			<NavLink
				to={link.url}
				activeClassName={clsx({ active: activeRoute(link.url) })}
				className="waves-effect waves-blue "
			>
				{link.name}
				{link.icon}
			</NavLink>
		</CollectionItem>
	));
	return (
		<div id="sidenav-left" className="sidenav sidenav-fixed white" style={{ borderRight: 'solid 3px #f5f5f5' }}>
			<Brand />
			<Collection style={{ marginTop: 0 }}>{linkItems}</Collection>
		</div>
	);
};
export default Sidebar;

Sidebar.propTypes = {
	sidebarLinks: PropTypes.array.isRequired,
};
