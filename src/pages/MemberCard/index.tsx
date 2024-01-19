import { SearchForm, TableSearch } from '@/components';
import { KeyValuePair } from '@/components/table-search';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { memberCardColumns, memberCardFormData } from './data';
import  './index.less';

const MemberCardPage: React.FC = () => {
  const { name } = useModel('global');
  const [searchData, setSearchData] = useState({ param: {} });
  const [dataSource, setDataSource] = useState([]);
  const tableRef = useRef<KeyValuePair>({});

  const clickSearch = (v)=>{
    setSearchData({...v})
    tableRef.current?.refresh?.();
  }
  
  return (
    <PageContainer ghost>
      <SearchForm
          formData={memberCardFormData}
          clickSearch={clickSearch}
      />
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
    </PageContainer>
  );
};

export default MemberCardPage;
