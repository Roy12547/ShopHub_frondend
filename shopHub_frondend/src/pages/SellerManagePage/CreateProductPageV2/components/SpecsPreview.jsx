/* eslint-disable react/prop-types */
import { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const SpecsPreview = ({ control, editedProduct }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const specs = useWatch({ control, name: 'specs' });

	const { fields, replace } = useFieldArray({
		control,
		name: 'specCombinations',
	});

	useEffect(() => {
		const generateCombinations = (spec1, spec2) => {
			if (!spec2 || spec2.properties.length === 0) {
				return spec1.properties.map((prop1) => ({
					id: uuidv4(),
					spec1Name: spec1.spec,
					spec1: prop1.specProp,
					spec2Name: null,
					spec2: null,
					price: '',
					stock: '',
				}));
			}

			const combinations = [];
			for (const prop1 of spec1.properties) {
				for (const prop2 of spec2.properties) {
					combinations.push({
						id: uuidv4(),
						spec1Name: spec1.spec,
						spec1: prop1.specProp,
						spec2Name: spec2.spec,
						spec2: prop2.specProp,
						price: '',
						stock: '',
					});
				}
			}
			return combinations;
		};

		const combinations = generateCombinations(
			specs[0] || { properties: [] },
			specs[1] || { properties: [] }
		);
		if (editedProduct?.prodSpecs) {
			const updatedCombinations = combinations.map((combination, index) => {
				const matchedSpec = editedProduct.prodSpecs.find(
					(spec) =>
						spec?.spec1Name === combination.spec1 &&
						spec?.spec2Name === combination.spec2
				);
				return {
					...combination,
					price: matchedSpec ? matchedSpec.price?.toString() : '',
					stock: matchedSpec ? matchedSpec.stock?.toString() : '',
				};
			});
			replace(updatedCombinations);
		} else {
			replace(combinations);
		}
	}, [specs, replace]);

	return (
		<div className="bg-white p-4 rounded-md shadow-md">
			<table className="w-full">
				<thead>
					<tr>
						{specs.map((spec, index) => (
							<th key={index} className="text-left">
								{spec.spec}
							</th>
						))}
						<th className="text-right">價格</th>
						<th className="text-right">庫存</th>
					</tr>
				</thead>
				<tbody>
					{fields
						.reduce((rows, field, index) => {
							const lastRow = rows[rows.length - 1];
							if (
								!lastRow ||
								lastRow.spec1 !== field.spec1 ||
								lastRow.spec2Name !== field.spec2Name
							) {
								rows.push({ ...field, rowSpan: 1 });
							} else {
								lastRow.rowSpan++;
								rows.push({ ...field, rowSpan: 0 });
							}
							return rows;
						}, [])
						.map((field, index) => (
							<tr key={field.id}>
								{field.rowSpan > 0 && (
									<td rowSpan={field.rowSpan}>{field.spec1}</td>
								)}
								{field.spec2 && <td>{field.spec2}</td>}
								<td className="text-right">
									<input
										type="number"
										className="w-20 text-right"
										{...register(`specCombinations[${index}].price`, {
											required: '此欄位不能留空',
											min: { value: 0, message: '價格不可小於0' },
											pattern: {
												value: /^[0-9]\d*$/,
												message: '價格必須為非負整數',
											},
										})}
									/>
									{errors.specCombinations?.[index]?.price && (
										<div className="text-red-500 text-sm">
											{errors.specCombinations[index].price.message}
										</div>
									)}
								</td>
								<td className="text-right">
									<input
										type="number"
										className="w-20 text-right"
										{...register(`specCombinations[${index}].stock`, {
											required: '此欄位不能留空',
											min: { value: 0, message: '庫存不可小於0' },
											pattern: {
												value: /^[0-9]\d*$/,
												message: '庫存必須為非負整數',
											},
										})}
									/>
									{errors.specCombinations?.[index]?.stock && (
										<div className="text-red-500 text-sm">
											{errors.specCombinations[index].stock.message}
										</div>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default SpecsPreview;
