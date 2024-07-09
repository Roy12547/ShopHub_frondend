/* eslint-disable react/prop-types */
import React from 'react';
import CustomButton from '../../ProductNewPage/components/CustomButton';
import { useFormContext } from 'react-hook-form';

const SubmitButtonGroup = ({  onCancel }) => {


	return (
		<div className="flex flex-row justify-end gap-2">
			<CustomButton text={'取消'} className="bg-slate-600" onClick={onCancel} ></CustomButton>
			<CustomButton
				type="submit"
				text={'儲存並上架'}
				className="flex-end "
			></CustomButton>
		</div>
	);
};

export default SubmitButtonGroup;
