/* eslint-disable react/prop-types */
import React from 'react';
import { testFields } from '../../ProductNewPage/validation/testFields';
import { useFormContext } from 'react-hook-form';

const SalesInfo = ({ openSpec, testFields }) => {
	const {
		register,
		formState: { errors },
		watch,
		control,
	} = useFormContext();

	if (openSpec) {
		return null;
	}

	return (
		<div className="input_wrap">
			<div className="input_group">
				<label htmlFor="price" className="label required">
					價格
				</label>
				<div className="flex flex-col gap-2">
					<input
						type="number"
						name="salesInfo.price"
						maxLength={20}
						className="input"
						{...register(
							'salesInfo.price',
							testFields.find((field) => field.name === 'price').rules
						)}
					/>
					{errors.salesInfo?.price && (
						<div className="text-red-500 text-sm">
							{errors.salesInfo.price.message}
						</div>
					)}
				</div>
			</div>
			<div className="input_group">
				<label htmlFor="quantity" className="label required">
					數量
				</label>
				<div className="flex flex-col gap-2">
					<input
						type="number"
						name="salesInfo.quantity"
						maxLength={20}
						className="input"
						{...register(
							'salesInfo.quantity',
							testFields.find((field) => field.name === 'quantity').rules
						)}
					/>
					{errors.salesInfo?.quantity && (
						<div className="text-red-500 text-sm">
							{errors.salesInfo.quantity.message}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SalesInfo;
