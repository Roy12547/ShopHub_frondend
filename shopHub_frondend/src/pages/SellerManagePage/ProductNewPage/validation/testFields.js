// const isNumber=(number)=>!isNaN(number) || "必須為數字"
export const testFields = [
	{
		name: 'productImg',
		rules: {
			required: {
				value: true,
				message: '請至少上傳一張圖片',
			},
		},
	},
	{
		name: 'productName',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
			minLength: {
				value: 10,
				message: '您的商品名稱過短，請至少輸入10個字。',
			},
		},
	},
	{
		name: 'category',
		rules: {
			required: {
				value: true,
				message: '請選取一個分類',
			},
		},
	},
	{
		name: 'description',
		rules: {
			required: '此欄位不能留空',
			minLength: {
				value: 10,
				message: '您的商品描述過短，請至少輸入10個字。',
			},
		},
	},
	{
		name: 'lowestBuy',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
			min: {
				value: 1,
				message: '最低購買數量的最小值為 1',
			},
		},
	},
	{
		name: 'specName',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
		},
	},
	{
		name: 'quantity',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
			min: {
				value: 1,
				message: '庫存數量最低為1',
			},
		},
	},
	{
		name: 'price',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
			min: {
				value: 1,
				message: '價格不得低於1元',
			},
		},
	},
	{
		name: 'minQuantity',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
			min: {
				value: 1,
				message: '最低購買數不得低於1',
			},
		},
	},
	{
		name: 'spec',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
		},
	},
	{
		name: 'spec1',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
		},
	},
	{
		name: 'specProp',
		rules: {
			required: {
				value: true,
				message: '此欄位不能留空',
			},
		},
	},
];
