import React, { lazy, Suspense } from 'react';

const OrderManagePanel = lazy(() => import('./OrderManagePanel/OrderManagePanel'));
const ProductListPanel = lazy(() => import('./ProductListPanel/ProductListPanel'));
const FinancialIncomePanel = lazy(() => import('./FinancialIncomePanel/FinancialIncomePanel'));
const FinancialBankCardPanel = lazy(() => import('./FinancialBankCardPanel/FinancialBankCardPanel'));
const AccountSettingPanel = lazy(() => import('./AccountSettingPanel/AccountSettingPanel'));
const IntroSettingPanel = lazy(() => import('./IntroSettingPanel/IntroSettingPanel'));
const ShippingTestPanel = lazy(() => import('./ShippingTestPanel/ShippingTestPanel'));
const ProductNewPage2 = lazy(() => import('../ProductNewPage/ProductNewPage2/ProductNewPage2'));
const MainPanel = lazy(() => import('./MainPanel/MainPanel'));
export {
	OrderManagePanel,
	ProductNewPage2,
	ProductListPanel,
	FinancialIncomePanel,
	FinancialBankCardPanel,
	AccountSettingPanel,
	IntroSettingPanel,
	ShippingTestPanel,
	MainPanel
};
