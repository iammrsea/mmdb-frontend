import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import { LinearProgress, Alert, Container } from 'components';
import { Flat } from 'components/buttons';
import { InputField } from 'components/material-fields';
import { Card, CardBody, CardHeader } from 'components/card';

import AppContext from 'store/context/context';
import { editItem } from 'service/network.service';

const style = {
	login: {
		height: '100vh',
		marginBottom: 0,
	},
	header: {
		marginTop: 0,
		padding: 40,
	},
	input: {
		padding: '5px 10px',
	},
};

export default ({ market, toggleShouldEdit }) => {
	const { categoryList, authUser, editMarket } = useContext(AppContext);

	const history = useHistory();

	const validateForm = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = 'Name of market is required';
		} else if (!values.description) {
			errors.description = 'Description of market is required';
		} else if (!values.address) {
			errors.address = 'Address/Geolocation of the market is required';
		} else if (!values.foodCategory) {
			errors.foodCategory = 'Category of market is required';
		}

		return errors;
	};
	const handleSubmit = (values, { setSubmitting }) => {
		// eslint-disable-next-line
		L.esri.Geocoding.geocode()
			.address(values.address)
			.run(function (error, results, response) {
				if (error) {
					Alert({ message: error.message, color: 'red' });
					return;
				}
				if (!results.results[0]) {
					return Alert({
						message: 'Try another address',
						color: 'red',
					});
				}
				const {
					latlng: { lat, lng },
				} = results.results[0];

				const editedMarket = {
					...values,
					location: {
						type: 'Point',
						coordinates: [lng, lat],
					},
				};

				editItem(authUser.token, '/markets/' + market._id, editedMarket)
					.then((res) => {
						setSubmitting(false);
						editMarket(res.data);
						Alert({
							message: 'Successfully changed',
							color: 'green',
						});
						history.push('/admin/markets');
					})
					.catch((e) => {
						setSubmitting(false);
						Alert({ message: e.message, color: 'red' });
					});
			});
	};

	const options =
		categoryList.length > 0 ? (
			categoryList.map((category) => (
				<option key={category._id} value={category.name}>
					{category.name}
				</option>
			))
		) : (
			<option value="">No categories added yet!</option>
		);

	return (
		<Container>
			<Card>
				<CardBody>
					<CardHeader className="center" style={{ marginBottom: 20 }}>
						<span>Edit Food market</span>
					</CardHeader>
					<Formik
						initialValues={{
							name: market.name,
							foodCategory: market.foodCategory,
							description: market.description,
							address: market.address,
						}}
						validate={validateForm}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, submitForm }) => (
							<>
								<Form>
									<InputField
										id="name"
										name="name"
										label="Name of market"
										autoComplete="off"
										type="text"
										style={style.input}
									/>
									<ErrorMessage name="name" component="div" style={{ color: 'red' }} />

									<InputField
										name="description"
										label="Description of market"
										autoComplete="off"
										type="text"
										id="description"
										style={style.input}
									/>
									<ErrorMessage name="description" component="div" style={{ color: 'red' }} />

									<InputField
										id="address"
										name="address"
										label="Address/Geolocation"
										autoComplete="off"
										style={style.input}
										type="text"
									/>
									<ErrorMessage name="address" component="div" style={{ color: 'red' }} />

									<Field
										name="foodCategory"
										as="select"
										style={{
											display: 'block',
											backgroundColor: 'inherit',
										}}
									>
										<option value={market.foodCategory}>{market.foodCategory}</option>
										{options}
									</Field>
									<ErrorMessage name="foodCategory" component="div" style={{ color: 'red' }} />

									<div className=" right-align" style={{ marginTop: 20 }}>
										<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
											Submit
										</Flat>
										<Flat onClick={toggleShouldEdit} type="submit">
											View
										</Flat>
									</div>
								</Form>
								{isSubmitting && <LinearProgress />}
							</>
						)}
					</Formik>
				</CardBody>
			</Card>
		</Container>
	);
};
