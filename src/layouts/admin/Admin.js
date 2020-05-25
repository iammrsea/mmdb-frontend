import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from '../../components/footer/Footer';

import { sidebarLinks } from 'routes';

const Admin = ({ children }) => {
	const sideNav = React.useRef(null);
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		sideNav.current = M.Sidenav.init(elems);
	});
	const handleCloseSidenav = () => {
		sideNav.current[0].close();
	};

	return (
		<>
			<Navbar />
			<Sidebar sidebarLinks={sidebarLinks} closeSidenav={handleCloseSidenav} />
			<main>{children}</main>
			<Footer />
		</>
	);
};

Admin.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Admin;
