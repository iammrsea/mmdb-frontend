import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { MaterialIcon } from 'components/icons';
import AppContext from 'store/context/context';

import './Navbar.css';

const Navbar = () => {
	const history = useHistory();
	const { setAuthUser } = useContext(AppContext);
	const handleSignOut = () => {
		localStorage.setItem('mmdb_auth_user', '');
		setAuthUser(null);
		history.push('/admin');
		// history.replace('/login');
	};
	const handleLogoClick = () => {
		history.push('/');
	};
	return (
		<div className="navbar-fixed">
			<nav className="navbar indigo">
				<div className="nav-wrapper">
					<span onClick={handleLogoClick} className="brand-logo link waves-effect white-text">
						MMDB
					</span>
					<ul id="nav-mobile" className="right">
						<li className="right sign-out" onClick={handleSignOut}>
							<i className="fas fa-sign-out-alt"></i>
						</li>
					</ul>
					<NavLink to="#!" data-target="sidenav-left" className="sidenav-trigger left">
						<MaterialIcon children={'menu'} className="white-text" />
					</NavLink>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
