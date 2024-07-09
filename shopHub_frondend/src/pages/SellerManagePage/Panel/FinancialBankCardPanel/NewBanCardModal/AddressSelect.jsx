import React, { useEffect } from 'react';
import { Flex, Select, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useTwZipCode, cities, districts } from 'use-tw-zipcode';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
export const AddressSelect = () => {
	const { city, district, zipCode, handleCityChange, handleDistrictChange } =
		useTwZipCode();

	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext();

	const selectedCity = watch('city');
	const selectedDistrict = watch('district');

	useEffect(() => {
		if (selectedCity) {
			handleCityChange(selectedCity);
		}
		if (selectedDistrict) {
			handleDistrictChange(selectedDistrict);
		}
	}, [selectedCity, selectedDistrict, handleCityChange, handleDistrictChange]);

	const handleCitySelectChange = (e) => {
		const selectedCity = e.target.value;
		setValue('city', selectedCity);
		handleCityChange(selectedCity);

		//reset district
		setValue('district', '');
		handleDistrictChange('');
	};

	const handleDistrictSelectChange = (e) => {
		const selectedDistrict = e.target.value;
		setValue('district', selectedDistrict);
		handleDistrictChange(selectedDistrict);
	};

	return (
		<Flex>
			<FormControl isInvalid={errors.address} isRequired>
				<Select
					id="householdCounty"
					{...register('householdCounty', { required: '此欄位不能留空' })}
					value={selectedCity || ''}
					onChange={handleCitySelectChange}
				>
					<option value="" disabled>
						請選擇城市
					</option>
					{cities.map((city, i) => {
						return <option key={i}>{city}</option>;
					})}
				</Select>
				<FormErrorMessage>
					{errors.householdCounty && errors.householdCounty.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.householdArea} isRequired>
				<Select
					id="householdArea"
					{...register('householdArea', { required: '此欄位不能留空' })}
					value={selectedDistrict || ''}
					onChange={handleDistrictSelectChange}
					disabled={!selectedCity}
				>
					<option value="" disabled>
						請選擇地區
					</option>
					{selectedCity &&
						districts[selectedCity]?.map((district, i) => (
							<option key={i} value={district}>
								{district}
							</option>
						))}
				</Select>
				<FormErrorMessage>
					{errors.householdArea && errors.householdArea.message}
				</FormErrorMessage>
			</FormControl>
		</Flex>
	);
};
