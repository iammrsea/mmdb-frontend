import React, { useRef, useState, useContext } from 'react';
import { Container, Alert } from 'components';
import { Card, CardBody, CardHeader, CardImage, CardAction } from 'components/card';
import { GridRow, GridItem } from 'components/grid';

import './ShowMarket.css';
import { Flat } from 'components/buttons';

import AppContext from 'store/context/context';
import { editItem } from 'service/network.service';

export default ({ market, toggleShouldEdit }) => {
	const [file, setFile] = useState(null);
	const fileInput = useRef(null);
	const fileId = useRef(null);

	const { setLoading, authUser, editMarket } = useContext(AppContext);

	const handleChangeClick = (id) => {
		fileId.current = id;
		fileInput.current.click();
	};

	const handleInput = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSaveClick = (item) => {
		const url = '/markets/image/' + item._id;
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		const formData = new FormData();
		formData.append('image', file);

		for (let key in item) {
			formData.append(key, item[key]);
		}

		setLoading(true);
		editItem(authUser.token, url, formData, config)
			.then((res) => {
				setLoading(false);
				const images = market.images.map((img) => {
					if (img._id === res.data._id) return res.data;
					return img;
				});
				const _market = {
					...market,
					images,
				};
				editMarket(_market);
			})
			.catch((e) => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
			});

		setFile(null);
		fileId.current = null;
	};

	const marketImages = market.images.map((item) => (
		<div key={item.fileId}>
			<CardImage src={item.url} />
			<div style={{ marginTop: 10, marginBottom: 5, textAlign: 'right' }}>
				<input onInput={handleInput} ref={fileInput} type="file" name={item.name} id={item.fileId} hidden />
				{!file && <Flat onClick={() => handleChangeClick(item.fileId)}>Change </Flat>}
				{file && item.fileId === fileId.current && (
					<>
						<Flat onClick={() => handleSaveClick(item)}>Save</Flat>
						<span>{file.name}</span>
					</>
				)}
			</div>
		</div>
	));

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
					<GridRow>
						<GridItem sm={12} md={3}>
							<span>Location:</span>
						</GridItem>
						<GridItem sm={12} md={9}>
							{market.location.coordinates}
						</GridItem>
					</GridRow>
					{marketImages}
				</CardBody>
				<CardAction className="center">
					<Flat onClick={toggleShouldEdit}>Edit Market</Flat>
				</CardAction>
			</Card>
		</Container>
	);
};
