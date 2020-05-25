import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Alert } from 'components';
import LoginForm from './LoginForm';
import { postItem } from 'service/network.service';

import AppContext from 'store/context/context';

const AdminLogin = () => {
	const history = useHistory();

	const { setAuthUser } = useContext(AppContext);

	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
		return function cleanup() {
			document.body.classList.add('has-fixed-sidenav');
		};
	});

	const handleSubmit = (values, { setSubmitting }) => {
		postItem(null, '/signin', {
			email: values.email.trim(),
			password: values.password.trim(),
		})
			.then((res) => {
				setAuthUser(res.data);
				localStorage.setItem('mmdb_auth_user', JSON.stringify(res.data));
				history.push('/admin/markets');
			})

			.catch((error) => {
				setSubmitting(false);
				Alert({ message: error.message, color: 'red' });
			});
	};
	return <LoginForm handleSubmit={handleSubmit} />;
};

export default AdminLogin;
