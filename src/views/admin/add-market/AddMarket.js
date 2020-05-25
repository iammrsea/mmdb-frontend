import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { LinearProgress, Alert, Container } from 'components';
import { Flat } from 'components/buttons';
import { InputField } from 'components/material-fields';
import { Card, CardBody, CardHeader } from 'components/card';

import AppContext from 'store/context/context';
import { postItem } from 'service/network.service';

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
const initialValues = {
	name: '',
	description: '',
	address: '',
	foodCategory: '',
};

export default () => {
	const { categoryList, addMarket, authUser } = useContext(AppContext);
	const [files, setFiles] = React.useState(null);

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
	const geocodeAddress = (address) => {};
	const geolocationOrAddress = (address) => {
		let _addressArray = address.split(',');
		if (_addressArray.length !== 2) {
			return { isAddress: true, address };
		}
		if (NaN(_addressArray[0] && NaN(_addressArray))) {
			return { isAddress: true, address };
		}
		return { isAddress: false, address: [_addressArray[0], _addressArray[1]] };
	};
	const handleSubmit = (values, { setSubmitting }) => {
		if (files.length !== 3) {
			Alert({ message: 'Select 3 images', color: 'red' });
			setSubmitting(false);
			return;
		}
		//eslint-disable-next-line
		L.esri.Geocoding.geocode()
			.address(values.address)
			.run(function (error, results, response) {
				if (error) {
					Alert({ message: error.message, color: 'red' });
					return;
				}
				if (!results.results[0]) {
					return Alert({ message: 'Try another address', color: 'red' });
				}
				const {
					latlng: { lat, lng },
				} = results.results[0];

				const config = {
					headers: {
						'content-type': 'multipart/form-data',
					},
				};
				const formData = new FormData();
				for (let i = 0; i < files.length; i++) {
					formData.append('images', files[i]);
				}
				const market = {
					...values,
					lat,
					long: lng,
				};
				for (let key in market) {
					formData.append(key, market[key]);
				}
				postItem(authUser.token, '/markets', formData, config)
					.then((res) => {
						setSubmitting(false);
						addMarket(res.data);
						Alert({ message: 'Successfully added', color: 'green' });
					})
					.catch((e) => {
						setSubmitting(false);
						Alert({ message: e.message, color: 'red' });
					});
			});
	};

	const handleInput = (e) => {
		setFiles(e.target.files);
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
						<span>Add new food market</span>
					</CardHeader>
					<Formik initialValues={{ ...initialValues }} validate={validateForm} onSubmit={handleSubmit}>
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
										labelClassName="noactive"
									/>
									<ErrorMessage name="name" component="div" style={{ color: 'red' }} />

									<InputField
										name="description"
										label="Description of market"
										autoComplete="off"
										type="text"
										id="description"
										labelClassName="noactive"
										style={style.input}
									/>
									<ErrorMessage name="description" component="div" style={{ color: 'red' }} />

									<InputField
										id="address"
										name="address"
										label="Address/Geolocation"
										autoComplete="off"
										style={style.input}
										labelClassName="noactive"
										type="text"
									/>
									<ErrorMessage name="address" component="div" style={{ color: 'red' }} />

									<Field
										name="foodCategory"
										as="select"
										style={{ display: 'block', backgroundColor: 'inherit' }}
									>
										<option value="">Select Category</option>
										{options}
									</Field>
									<ErrorMessage name="foodCategory" component="div" style={{ color: 'red' }} />

									<div className="file-field input-field">
										<div className="btn indigo">
											<span>Photos</span>
											<input type="file" multiple onInput={handleInput} />
										</div>
										<div className="file-path-wrapper">
											<input
												className="file-path validate"
												placeholder="Select 3 photos"
												type="text"
												onInput={handleInput}
												multiple
											/>
										</div>
									</div>
									<div className=" right-align" style={{ marginTop: 20 }}>
										<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
											Submit
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
