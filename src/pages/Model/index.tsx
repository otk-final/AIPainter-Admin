import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useLocation, useModel } from '@umijs/max';
import { history } from 'umi';
import { Button, message, Modal, Tabs, TabsProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import  './index.less';
import { TableSearch } from '@/components';
import { KeyValuePair } from '@/components/table-search';
import { loraModelColumns, ModelProps, normalModelColumns } from './data';

const mockData = [
	{
		kid: '111111',
		modelName: "111",
		nickName: "sssss",
		fileList: [],
		positiveWord: "sssss",
		negativeWord: "sssss",
	},
	{
		kid: '22222',
		modelName: "222",
		nickName: "2334",
		fileList: [],
		positiveWord: "sss454545ss",
		negativeWord: "4545å",
	}
]

const ModelPage: React.FC = () => {
	const { name } = useModel('global');
	const [curTab, setCurTab] = useState('1');
	const location = useLocation();
	const tableRef = useRef<KeyValuePair>({});
	const [tableData, setTableData] = useState(mockData);

	const  items: TabsProps['items'] = [
		{
			key: '1',
			label: '大模型',
		},
		{
			key: '2',
			label: 'Lora模型',
		},
	];


	const handleEdit = (item: ModelProps) => {
		console.log("编辑")
		history.push(`/model/addAndEdit`, {
			type: curTab,
			kid: item.kid
		})
	}

	const handleDel = (item: ModelProps) => {
		console.log("确认删除")
		Modal.confirm({
			title: '确认删除',
			okText: '确认',
			cancelText: '取消',
			footer: (_, { OkBtn, CancelBtn }) => (
			  <div className='flexR' style={{ justifyContent: 'center' }}>
				<CancelBtn />
				<OkBtn />
			  </div>
			),
			onOk: () => {
				//   删除
			}
		});
	}
	

	normalModelColumns.onOperation = (v, _, item) => {
		switch (v) {
			case 'edit':
				console.log('8888')
				return handleEdit(item!);
			case 'del':
				console.log('9999')
			    return handleDel(item!);
			default: 
				return;
		  }
	}
	
	const handleAdd = ()=>{
		history.push(`/model/addAndEdit`,{
			type: curTab
		})
	}

	return (
		<PageContainer ghost>
			<div className='flexR' style={{justifyContent: 'space-between'}} >
				<Tabs defaultActiveKey="1" items={items} onChange={(v)=> setCurTab(v)} />
				<Button type='primary' onClick={handleAdd}>新增{curTab === '1' ? "大模型" : "Lora模型"}</Button>
			</div>
			<TableSearch
				ref={tableRef}
				// listApi={""}
				bordered={true}
				tableData={tableData}
				sticky={{ offsetHeader: 48 }}
				columns={curTab  === '1' ?  normalModelColumns : loraModelColumns}
				pagination={{ current: 1, pageSize: 10}}
				rowKey={(record) => record.kid}
				responseCb={(data: any[]) => {}}
				loading={false}
				/>
		</PageContainer>
	);
};

export default ModelPage;
