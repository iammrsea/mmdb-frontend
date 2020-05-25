import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Alert } from 'components';
import { Card, CardBody, CardHeader, CardImage, CardAction } from 'components/card';
import { GridRow, GridItem } from 'components/grid';

import Carousel from './Carousel';

import './ShowDetail.css';
import { Flat } from 'components/buttons';

export default ({ market }) => {
	const history = useHistory();

	const handleViewMapClick = () => {
		history.push('/markets/' + market._id, { market });
	};

	return (
		<Container>
			<Card>
				<CardBody className="show-market-items">
					<CardHeader className="center">Food Market</CardHeader>

					<GridRow>
						<GridItem sm={12} md={3}>
							<span>Name:</span>
						</GridItem>
						<GridItem sm={12} md={9}>
							{market.name}
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem sm={12} md={3}>
							<span>Description:</span>
						</GridItem>
						<GridItem sm={12} md={9}>
							{market.description}
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem sm={12} md={3}>
							<span>Food Category:</span>
						</GridItem>
						<GridItem sm={12} md={9}>
							{market.foodCategory}
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem sm={12} md={3}>
							<span>Address:</span>
						</GridItem>
						<GridItem sm={12} md={9}>
							{market.address}
						</GridItem>
					</GridRow>

					<Carousel images={market.images} />
				</CardBody>
				<CardAction className="center">
					<Flat onClick={handleViewMapClick}>View location on map</Flat>
				</CardAction>
			</Card>
		</Container>
	);
};
