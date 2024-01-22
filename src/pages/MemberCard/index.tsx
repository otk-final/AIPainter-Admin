import { SearchForm, TableSearch } from '@/components';
import { KeyValuePair } from '@/components/table-search';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import AddCard from './addCard';
import { memberCardColumns, memberCardFormData } from './data';
import  './index.less';

const MemberCardPage: React.FC = () => {
  const { name } = useModel('global');
  const [searchData, setSearchData] = useState({ param: {} });
  const [dataSource, setDataSource] = useState([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const tableRef = useRef<KeyValuePair>({});


	const handleDisable = (item)=> {}
	const handleEnable = (item)=> {}

	memberCardColumns.onOperation = (v, _, item) => {
	switch (v) {
		case 'disable':
			return handleDisable(item!);
		case 'enable':
			return handleEnable(item!);
		default: 
			return;
		}
	}

  const clickSearch = (v)=>{
    setSearchData({...v})
    tableRef.current?.refresh?.();
  }

  const renderBtn = ()=>{
    return (
      <div style={{marginBottom: 30}}>
        <Button type='primary' onClick={()=> setShowCreateCard(true)}>生成充值卡</Button>
        <Button type='primary' style={{marginLeft: 30}}>导出Excel</Button>
      </div>
    )
  }

  const onAddCard = ()=>{}
  
  return (
    <PageContainer ghost>
      <SearchForm
          formData={memberCardFormData}
          clickSearch={clickSearch}
      />
	  {renderBtn()}
      <TableSearch
          ref={tableRef}
          // listApi={""}
          bordered={true}
          searchData={searchData}
          tableData={dataSource}
          sticky={{ offsetHeader: 48 }}
          columns={memberCardColumns}
          pagination={{ current: 1, pageSize: 10}}
          rowKey={(record) => record.kid}
          responseCb={(data: any[]) => {}}
          loading={false}
        />
        <Modal
          destroyOnClose
          open={showCreateCard}
          footer={null}
          onCancel={() => setShowCreateCard(false)}
        >
			<AddCard onAdd={() => setShowCreateCard(false)}/>
        </Modal>
    </PageContainer>
  );
};

export default MemberCardPage;
