/* eslint-disable react/prop-types */
import React from 'react';
import { testFields } from '../../ProductNewPage/validation/testFields';
import { useFormContext } from 'react-hook-form';
const LowestBuy = ({ testFields }) => {
	const { register, formState:{errors}, watch, control } = useFormContext();
	

	return (
		<div className="input_group">
			<label htmlFor="lowestBuy" className="label required">
				最低購買數
			</label>
			<div className="flex flex-col gap-2">
				<input
					type="number"
					name="lowestBuy"
					className="input"
					defaultValue={1}
					{...register(
						'lowestBuy',
						testFields.find((field) => field.name === 'lowestBuy').rules
					)}
				/>
				{errors.lowestBuy && (
					<div className="text-red-500 text-sm">{errors.lowestBuy.message}</div>
				)}
			</div>
		</div>
	);
};

export default LowestBuy;
