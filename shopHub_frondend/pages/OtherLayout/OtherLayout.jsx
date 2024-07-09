import { Outlet } from 'react-router-dom';
import React from 'react';
import { LoginNavbar } from '../../shared/components/Navbar/LoginNavbar';
import { Footer } from '../../shared/components/Footer/Footer';
import { Box } from '@chakra-ui/layout';
export const OtherLayout = () => {
	return (
		<>
		     <LoginNavbar />
         
             
                    <Outlet />
          
          
            <Box mt={'5rem'}>
                <Footer />
            </Box>
		
		</>
	);
};



//"url('http://54.199.192.205/shopHub/assets/shopping.jpg')"