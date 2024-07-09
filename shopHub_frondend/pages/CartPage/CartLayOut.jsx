import HomTabs from '../../shared/components/HomeTabs/HomTabs';
import {CartNavbar} from '../../shared/components/Navbar/CartNavbar'
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {Footer} from '../../shared/components/Footer/Footer'
export const CartLayOut = () =>{

    return(
        <>
           <Box position="relative" zIndex={2}>
                <HomTabs />
            </Box>
            <Box position="relative" zIndex={1}>
                <CartNavbar />
            </Box>
            <Box
                bg="gray.100"
        
             
            >
                <Outlet />
            </Box>
            <Footer/>
    
        </>
    )
}