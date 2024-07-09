export const findBankByCode = (code, list) => {
	const { Key } = list.find((bank) => bank.Value == code);
	return Key;
};

export const findBankBranchByCode = (code, list) => {
	const { Key } = list.find((bank) => bank.Value == code);
	return Key;
};

export const maskAccountNumber = (accountNumber) => {
	if (!accountNumber || accountNumber.length < 8) {
		return accountNumber;
	}
	const last8Digits = accountNumber.slice(-8);
	const maskedNumber = '****' + last8Digits.slice(-4);
	return maskedNumber;
};

export const maskBankName = (bankName) => {
	if (!bankName) {
		return bankName;
	}
	const length = bankName.length;
	if (length === 2) {
		return bankName[0] + '*';
	} else if (length === 3) {
		return bankName[0] + '*' + bankName[2];
	} else if (length === 4) {
		return bankName[0] + '*' + bankName[2] + bankName[3];
	}
	return bankName;
};

export const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}/${month}/${day}`;
};


export const convertLocalString = (item) => {
		

		if (!item) return '$ 0';
		let formatted = item.toLocaleString('zh-TW', {
			style: 'currency',
			currency: 'TWD',
		});
		formatted = formatted.replace(/\.00$/, '');
		return formatted;
	};


import moment from "moment/moment";

export const disabledDate=(current)=>{
	return current && current >=moment().endOf('day')
}