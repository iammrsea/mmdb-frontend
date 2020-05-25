import React from 'react';

import CarouselItem from './CarouselItem';

export default ({ images, indicators }) => {
	const slider = React.useRef(null);
	const sliderInterval = React.useRef(null);

	React.useEffect(() => {
		const elems = document.querySelectorAll('.carousel');
		// eslint-disable-next-line
		slider.current = M.Carousel.init(elems, {
			fullWidth: true,
			indicators,
		});

		sliderInterval.current = setInterval(() => {
			slider.current.forEach((sliderItem) => {
				sliderItem.next();
			});
		}, 5000);
		return function cleanup() {
			clearInterval(sliderInterval.current);
		};
	});

	const imageCarousels = images.map((image) => <CarouselItem image={image} key={image._id} />);
	return <div className="carousel carousel-slider center">{imageCarousels}</div>;
};
