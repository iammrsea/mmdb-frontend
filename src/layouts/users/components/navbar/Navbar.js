import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import clsx from 'clsx';

import { Container } from 'components';

import './Navbar.css';

let searchTextRef = '';

const Navbar = () => {
	const history = useHistory();

	const activeRoute = (routeName) => {
		const urlParts = routeName.split('/');
		return window.location.href.endsWith(urlParts[urlParts.length - 1]);
	};

	const handleSearch = (e) => {
		searchTextRef = e.target.value;
		history.push('/search-results', { searchText: e.target.value });
	};

	return (
		<div className="navbar-fixed">
			<nav>
				<div className="nav-wrapper indigo">
					<Container>
						<ul id="nav-mobile" className="">
							<li className="left search">
								<input
									onChange={handleSearch}
									type="text"
									name="searchTerm"
									placeholder="Search by name, category or 'nearest market'"
									id="search"
									autoFocus
									value={searchTextRef}
								/>
							</li>
							<li className="waves-effect hide-on-med-and-down right">
								<NavLink
									className="white-text"
									to="/"
									activeClassName={clsx({ 'active-route': activeRoute('/') })}
									exact
								>
									Home
								</NavLink>
							</li>
						</ul>
					</Container>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
