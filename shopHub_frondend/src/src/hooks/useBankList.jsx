import React from 'react';
import bank_list_3 from '../constants/bank/bank3.json';
import bank_list_7 from '../constants/bank/bank7.json';

const useBankList = (bank3) => {
	let r = bank_list_3.find((obj) => obj.Value === bank3);

	const regex = new RegExp(`^${bank3}\\w{3}`);
	const findBankBranch = bank_list_7.filter((objs) => regex.test(objs.Value));
	return findBankBranch;
};

export default useBankList;
