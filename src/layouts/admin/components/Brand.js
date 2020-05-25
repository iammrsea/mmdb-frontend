import React from 'react';

import { MaterialIcon } from 'components/icons';

const styles = {
	brand: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 35,
		border: ' solid 2px #f5f5f5',
	},
};
const Brand = () => {
	const handleLogoClick = () => {
		window.location = '/';
	};
	return (
		<div className="logo" style={styles.brand}>
			<span className="logo-container" onClick={handleLogoClick} style={{ borderBottom: 0, cursor: 'pointer' }}>
				Admin
				<MaterialIcon children={'view_comfy'} className="left" />
			</span>
		</div>
	);
};

export default Brand;
