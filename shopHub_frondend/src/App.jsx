import React, { Suspense, lazy } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './shared/components/Login/Login';
import CreateUser from './shared/components/Login/CreateUser';
import PrivateRoutes from './routes/PrivateRoutes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Navbar from "./shared/components/Navbar/Navbar";
import Home from './pages/Home';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductPage from './pages/ProductPage/ProductPage';
import User from './pages/User';
import { RootLayout } from './pages/RootLayout/RootLayout';
import { CartLayOut } from './pages/CartPage/CartLayOut';
import { OtherLayout } from './pages/OtherLayout/OtherLayout';
import SellerManagePage from './pages/SellerManagePage/SellerManagePage';
import Buyer from './pages/Buyer/Bpro/Bprofile';
import News from './pages/Buyer/news/News';
import Cookie from './pages/Buyer/cookie/Cookie';
import Likes from './pages/Buyer/likes/Likes';
import Shipper from './pages/Buyer/product/Shipper';
import Return from './pages/Buyer/product/Return';
import VerifyPass from './pages/Buyer/Bpro/VerifyPass';
import ChangePass from './pages/Buyer/Bpro/Changepassword';
import BackHome from './pages/back/BackHome';
import NewsManagement from './pages/back/news/NewsManagement';
import CreateNews from './pages/back/news/CreateNews';
import UpdateNews from './pages/back/news/UpdateNews';
import Cart from './pages/CartPage/Cart';
import {
	AccountSettingPanel,
	FinancialBankCardPanel,
	FinancialIncomePanel,
	OrderManagePanel,
	ProductListPanel,
	ProductNewPanel,
	IntroSettingPanel,
	ShippingTestPanel,
	MainPanel,
} from './pages/SellerManagePage/Panel';
import ProductNewPage from './pages/SellerManagePage/ProductNewPage/ProductNewPage';

import '@fontsource/noto-sans-tc/400.css';
import '@fontsource/noto-sans-tc/500.css';
import '@fontsource/noto-sans-tc/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import theme from './theme';
import ProductNewPage2 from './pages/SellerManagePage/ProductNewPage/ProductNewPage2/ProductNewPage2';
import { Forgot } from './shared/components/Login/Forgot';
import { Verify } from './shared/components/Login/Verify';
import { SuccPay } from './pages/CartPage/SuccPay';
import { FailPay } from './pages/CartPage/FailPay';
import { CheckOut } from './pages/CartPage/CheckOut';
import CreateProductPage from './pages/SellerManagePage/CreateProductPage/CreateProductPage';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Loader from './pages/SellerManagePage/components/Loader/Loader';

import BackLayout from './pages/back/BackLayout';
import ProductListPanelV2 from './pages/SellerManagePage/Panel/ProductListPanelV2/ProductListPanelV2';
const queryClient = new QueryClient();
const App = () => {
	const router = createBrowserRouter(
		[
			{
				path: '/',
				errorElement: <ErrorPage />,
				children: [
					{
						path: 'user',
						element: <OtherLayout />,
						children: [
							{
								path: 'login',
								element: <Login />,
							},
							{
								path: 'register',
								element: <CreateUser />,
							},
							{
								path: 'forgot',
								element: <Forgot />,
							},
							{
								path: 'verify',
								element: <Verify />,
							},
						],
					},
					{
						path: '',
						element: <RootLayout />,
						children: [
							{
								path: '',
								index: true,
								element: <Home />,
							},

							{
								path: 'profile',
								element: <User />,
							},
							{
								path: 'search',
								element: <SearchPage />,
							},
							{
								path: 'product',
								element: <ProductPage />,
							},
							{
								path: 'buyer',
								element: <Buyer />,
							},
							{
								path: 'news',
								element: <News />,
							},
							{
								path: 'cookie',
								element: <Cookie />,
							},
							{
								path: 'likes',
								element: <Likes />,
							},
							{
								path: 'shipper',
								element: <Shipper />,
							},
							{
								path: 'return',
								element: <Return />,
							},
							{
								path: 'verifypass',
								element: <VerifyPass />,
							},
							{
								path: 'changepass',
								element: <ChangePass />,
							},
						],
					},
					{
						path: 'seller',
						// element: <SellerManagePage />,
						children: [
							{
								path: '',
								element: (
									<Suspense fallback="">
										<SellerManagePage />
									</Suspense>
								),
								children: [
									{
										path: '',
										index: true,
										element: (
											<Suspense fallback={<Loader />}>
												<OrderManagePanel />
											</Suspense>
										),
									},

									{
										path: 'product/list',
										element: <ProductListPanelV2 />,
									},
									{
										path: 'finance/income',
										element: <FinancialIncomePanel />,
									},
									{
										path: 'finance/cards',
										element: <FinancialBankCardPanel />,
									},
									{
										path: 'all-settings/account',
										element: <AccountSettingPanel />,
									},
									{
										path: 'intro/setting',
										element: <IntroSettingPanel />,
									},
									{
										path: 'shippingtest',
										element: <ShippingTestPanel />,
									},
									{
										path: 'all-settings/account',
										element: <AccountSettingPanel />,
									},

									{
										path: 'product/new',
										element: <CreateProductPage />,
									},
								],
							},
						],
					},
					{
						path: 'cart',
						element: <CartLayOut />,
						children: [
							{
								path: '',
								element: <Cart />,
							},
							{
								path: 'succPay',
								element: <SuccPay />,
							},
							{
								path: 'checkOut',
								element: <CheckOut />,
							},
							{
								path: 'failPay',
								element: <FailPay />,
							},
						],
					},
					{
						path: 'back',
						element: <BackLayout />,
						children: [
							{
								path: '',
								element: <BackHome />,
							},
							{
								path: 'manageNews',
								element: <NewsManagement />,
							},
							{
								path: 'createNews',
								element: <CreateNews />,
							},
							{
								path: 'editNews',
								element: <UpdateNews />,
							},
						],
					},
				],
			},
		],
		{ basename: '/shopHub' }
	);

	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ChakraProvider>
	);
};

export default App;
