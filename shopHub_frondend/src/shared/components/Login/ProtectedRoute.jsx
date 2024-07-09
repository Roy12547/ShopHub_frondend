import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
	return Cookies.get('id_token') !== undefined;
};

const ProtectedRoute = ({ children }) => {
	if (!isAuthenticated()) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
