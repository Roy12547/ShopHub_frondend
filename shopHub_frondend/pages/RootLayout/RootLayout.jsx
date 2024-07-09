import { Outlet } from 'react-router-dom';
import React from 'react';
import HomTabs from '../../shared/components/HomeTabs/HomTabs';
import { Navbar } from '../../shared/components/Navbar/Navbar';
import { Footer } from '../../shared/components/Footer/Footer';
export const RootLayout = () => {
	return (
		<>
			<HomTabs />
			<Navbar />

			<Outlet />
			<Footer />
		</>
	);
};
