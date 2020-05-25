import React from 'react';

import './CarouselItem.css';

export default ({ image }) => {
	return (
		<div className="carousel-item" href="#one!">
			<img src={image.url} alt={image.name} className="carousel-image" />
		</div>
	);
};
