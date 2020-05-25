import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const InputField = ({ id, labelClassName, styleLabel, label, ...rest }) => {
	return (
		<div className={clsx(['input-field', { 'login-label': styleLabel }])}>
			<Field {...rest} id={id} />
			{id && label && (
				<label className={labelClassName} htmlFor={id}>
					{label}
				</label>
			)}
		</div>
	);
};

InputField.defaultProps = {
	labelClassName: 'active',
};
InputField.propTypes = {
	id: PropTypes.string.isRequired,
	labelClassName: PropTypes.string,
	label: PropTypes.string,
	styleLabel: PropTypes.string,
};

export default InputField;
