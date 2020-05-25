import React from 'react';

import { Navbar } from './components';
import { Footer } from 'components';
const Users = ({ children }) => {
	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
	}, []);
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Users;
