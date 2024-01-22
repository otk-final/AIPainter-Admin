import { SearchForm, TableSearch } from '@/components';
import { KeyValuePair } from '@/components/table-search';
import { PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { userFormData, UserProps, usersColumns, UserStatus } from './data';

const mockData = [
	{
		kid: '122',
		userId: '122',
		phone: '13434543213',
		registerDate: '',
		endLoginTime: '',
		userGrade: 1,
		endTime: '',
		userStatus: 1
	},
	{
		kid: '222',
		userId: '222',
		phone: '13434543213',
		registerDate: '',
		endLoginTime: '',
		userGrade: 2,
		endTime: '',
		userStatus: 1
	},
	{
		kid: '12',
		userId: '12',
		phone: '13434543213',
		registerDate: '',
		endLoginTime: '',
		userGrade: 3,
		endTime: '',
		userStatus: 1
	},
	{
		kid: '22w2',
		userId: '22w2',
		phone: '13434543213',
		registerDate: '',
		endLoginTime: '',
		userGrade: 1,
		endTime: '',
		userStatus: 2
	}
]

	const UserPage: React.FC = () => {
	const [searchData, setSearchData] = useState({ param: {} });
	const [tableData, setTableData] = useState(mockData);
	const tableRef = useRef<KeyValuePair>({});

	const clickSearch = (v)=>{
		setSearchData({...v})
		tableRef.current?.refresh?.();
	}

	const handleDisable = (item: UserProps) => {
		// setTableData((res)=>{...res, })
		tableRef.current?.refresh?.();
		console.log("text handleDisable", item.userStatus )
	}

	const handleEnable = (item: UserProps) => {
		tableRef.current?.refresh?.();
		console.log("text handleEnable", item.userStatus )
	}

	usersColumns.onOperation = (v, _, item)=>{
		switch (v) {
			case UserStatus.Disable:
				return handleDisable(item!);
			case UserStatus.Enable:
				return handleEnable(item!)
		}
	}



	return (
		<PageContainer ghost>
			<SearchForm
				formData={userFormData}
				clickSearch={clickSearch}
			/>
			<TableSearch
			ref={tableRef}
				// listApi={""}
				bordered={true}
				searchData={searchData}
				tableData={tableData}
				sticky={{ offsetHeader: 48 }}
				columns={usersColumns}
				pagination={{ current: 1, pageSize: 10}}
				rowKey={(record) => record.kid}
				responseCb={(data: any[]) => {}}
				loading={false}
			/>
		</PageContainer>
	);
};

export default UserPage;
