import { FiShoppingBag } from 'react-icons/fi';
import { PiNotepad } from 'react-icons/pi';
import { SlWallet } from 'react-icons/sl';
import { TiMessages } from 'react-icons/ti';
import { AiOutlineShop } from 'react-icons/ai';
import { FaRegCircleQuestion } from 'react-icons/fa6';

export const NavItem = [
	{
		icon: <PiNotepad />,
		name: '訂單管理',
		subItems: [
			{
				name: '我的銷售',
				href: '',
			},
		],
	},
	{
		icon: <FiShoppingBag />,
		name: '商品管理',
		subItems: [
			{
				name: '新增商品',
				href: 'product/new',
			},
			{
				name: '我的商品',
				href: 'product/list',
			},
		],
	},
	{
		icon: <SlWallet />,
		name: '財務管理',
		subItems: [
			{
				name: '我的進帳',
				href: 'finance/income',
			},
			{
				name: '銀行帳戶',
				href: 'finance/cards',
			},
		],
	},
	// {
	// 	icon: <TiMessages />,
	// 	name: '客服設置管理',
	// 	subItems: [
	// 		{
	// 			name: '聊聊管理',
	// 			href: 'shippingtest',
	// 		},
	// 		{
	// 			name: '評價管理',
	// 			href: '',
	// 		},
	// 	],
	// },
	{
		icon: <AiOutlineShop />,
		name: '賣場管理',
		subItems: [
			{
				name: '賣場介紹',
				href: 'intro/setting',
			},
			{
				name: '賣場設定',
				href: 'all-settings/account',
			},
		],
	},
	{
		icon: <FaRegCircleQuestion />,
		name: '幫助',
		subItems: [
			{
				name: '自助服務中心',
				href: '',
			},
		],
	},
];
