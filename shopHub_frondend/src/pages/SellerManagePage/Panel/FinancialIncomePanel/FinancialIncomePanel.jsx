import React, { useState, useEffect } from 'react';
import { Box, Divider, Flex, Heading, VStack } from '@chakra-ui/layout';
import { Text, Card } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllIncomeData } from '../../api/orderDetailApi';
import Loader from '../../components/Loader/Loader';
import {
	disabledDate,
	disabledTime,
	formatDate,
	convertLocalString,
} from '../../utils/utils';
import DataFetchLoader from '../../components/Loader/DataFetchLoader';
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { getIncomeByDateRange } from '../../api/orderDetailApi';
import FetchError from '../../components/Error/FetchError';

const timeArrange = ['全部', '本週', '本月'];
const FinancialIncomePanel = () => {
	const resetTime = () => {
		const newDate = new Date();
		newDate.setHours(0, 0, 0, 0);
		return newDate;
	};

	const [selectedDates, setSelectedDates] = useState([
		'1900-01-01',
		moment().format('YYYY-MM-DD'),
	]);

	const handleDateChange = (dates, dateArray) => {
		if (dateArray && dateArray.length == 2) {
			setSelectedDates([dateArray[0], dateArray[1]]);
		}
		if (dateArray[0].trim() == '' || dateArray[1].trim() == '') {
			setSelectedDates(['1900-01-01', moment().format('YYYY-MM-DD')]);
		}

		// getIncomeByDateRange(dateArray[0], dateArray[1]);
	};

	const {
		isPending: ordersPending,
		error: ordersError,
		data: ordersData,
		isLoading: ordersLoading,
	} = useQuery({
		queryKey: ['orderList', selectedDates],
		queryFn: () => getIncomeByDateRange(selectedDates[0], selectedDates[1]),
	});

	const handleOnBlur = () => {
		if (
			!selectedDates[0] ||
			!selectedDates[1] ||
			selectedDates[0].trim() == '' ||
			selectedDates[1].trim() == ''
		) {
			setSelectedDates(['1900-01-01', moment().format('YYYY-MM-DD')]);
		}
	};

	const {
		isPending: incomePending,
		error: incomeError,
		data: incomeData,
		isFetched,
		isSuccess,
	} = useQuery({
		queryKey: ['incomeList'],
		queryFn: () => getAllIncomeData(),
	});

	if (incomePending) return <Loader />;
	// if (ordersError || incomeError) return <FetchError />;
	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<Flex flexDirection={'column'} gap={'2rem'}>
				<Heading fontSize={'xl'}>進帳總攬</Heading>
				<Flex flexDirection={'column'}>
					<Heading fontSize={'lg'}>已撥款</Heading>
					<Flex
						flexDirection={'row'}
						width={'100%'}

						// justifyContent={'space-between'}
					>
						{timeArrange.map((item, i) => (
							<>
								<Flex flexDirection={'column'} key={i} width={'30%'}>
									<Flex
										my={2}
										flexDirection={'column'}
										alignItems={'start'}
										mt={4}
										gap={2}
									>
										<Text fontSize={'md'} color={'gray'}>
											{item}
										</Text>
										<Heading fontSize={'1.3rem'}>
											&nbsp;
											{i == 0
												? convertLocalString(incomeData?.data?.totalIncome)
												: i == 1
													? convertLocalString(incomeData?.data?.weeklyTotal)
													: convertLocalString(incomeData?.data?.monthlyTotal)}
										</Heading>
									</Flex>
								</Flex>
							</>
						))}
					</Flex>
				</Flex>
				<Divider />
				<Flex flexDirection={'column'} gap={4}>
					<Heading fontSize={'xl'}>進帳詳情</Heading>
					<Flex width={'50%'} gap={4} align={'center'}>
						<label>按日期篩選</label>
						<RangePicker
							disabledDate={disabledDate}
							onChange={handleDateChange}
							onBlur={handleOnBlur}
						/>
					</Flex>

					<Flex
						bg="gray.100"
						p={4}
						borderRadius="md"
						justify="space-between"
						align="center"
						fontWeight="bold"
						fontSize="md"
					>
						<Text flexBasis={'20%'}>訂單編號</Text>
						<Text flexBasis={'20%'}>訂單金額</Text>
						<Text flexBasis={'20%'}>到款時間</Text>
						<Text flexBasis={'20%'}>狀態</Text>
						<Text flexBasis={'20%'}>付款方式</Text>
					</Flex>
					{ordersPending ? (
						<Card w="100%" h="300px" position={'relative'}>
							<DataFetchLoader />
						</Card>
					) : ordersData.data.length == 0 ? (
						<Text textAlign={'center'}>目前無資料</Text>
					) : (
						<>
							{ordersData?.data.map((item, i) => (
								<Flex
									flexDirection={'row'}
									p={2}
									justify={'space-between'}
									key={i}
								>
									<Flex flexDirection={'column'} flexBasis={'20%'}>
										<Text>{item?.ecpayId}</Text>
										<Text>詳情</Text>
									</Flex>
									<Text flexBasis={'20%'}>
										{convertLocalString(item?.totalAmount)}
									</Text>
									<Text flexBasis={'20%'}>{formatDate(1718208000000)}</Text>
									<Text flexBasis={'20%'}>
										{item?.orderStatus == 2 ? '付款成功' : ''}
									</Text>
									<Text flexBasis={'20%'}>信用卡</Text>
								</Flex>
							))}
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default FinancialIncomePanel;
