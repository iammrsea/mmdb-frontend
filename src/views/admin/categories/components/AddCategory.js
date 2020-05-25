import React from 'react';
import { InputField } from 'components/material-fields';
import { Flat } from 'components/buttons';

export default ({ addCategory }) => {
	const [catName, setCatName] = React.useState('');
	return (
		<div>
			<div className="input-field">
				<input
					type="text"
					name="foodCategory"
					id="foodCategory"
					onChange={(e) => setCatName(e.target.value)}
					value={catName}
				/>
				<label htmlFor="foodCategory">Name of Category</label>
			</div>
			<div className=" right-align" style={{ marginTop: 20 }}>
				<Flat onClick={() => addCategory({ name: catName })}>Submit</Flat>
			</div>
		</div>
	);
};
