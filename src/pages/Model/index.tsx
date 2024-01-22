import { PageContainer } from '@ant-design/pro-components';
import { useLocation, useModel } from '@umijs/max';
import { history } from 'umi';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { useRef, useState } from 'react';
import  './index.less';
import { TableSearch } from '@/components';
import { KeyValuePair } from '@/components/table-search';
import { loraModelColumns, ModelProps, normalModelColumns } from './data';

const mockData = [
	{
		kid: '1',
		modelName: "111",
		nickName: "sssss",
		fileList: [],
		positiveWord: "dg",
		negativeWord: "sdg",
	},
	{
		kid: '2',
		modelName: "222",
		nickName: "2334",
		fileList: [],
		positiveWord: "sss454545ss",
		negativeWord: "4545å",
	}
]

const mockloraData = [
	{
		kid: '111111',
		modelName: "Lora模型222",
		nickName: "sssss",
		fileList: [],
		positiveWord: "gsdgs",
		negativeWord: "sssdgseress",
	},
	{
		kid: '22222',
		modelName: "Lora模型111",
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
	const [tableloraData, setTableLoraData] = useState(mockloraData);

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
			...item,
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
				return handleEdit(item!);
			case 'del':
			    return handleDel(item!);
			default: 
				return;
		  }
	}

	loraModelColumns.onOperation = (v, _, item) => {
		switch (v) {
			case 'edit':
				return handleEdit(item!);
			case 'del':
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
				tableData={curTab  === '1' ? tableData : tableloraData}
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
