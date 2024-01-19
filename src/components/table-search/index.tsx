import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';
import './index.less';
/**父组件有两种刷新方式，1：当前页刷新currentPage，2：第一页刷新firstPage */
type RefreshType = 'currentPage' | 'firstPage';
export type KeyValuePair = { [k: string]: any }
interface PageRequest<T> {
  /** 截止时间 */
  endTime?: string;
  /** 页码 */
  pageNo?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 参数对象 */
  param?: T;
  /** 开始时间 */
  startTime?: string;
  /** 时间范围 */
  timeRange?: string;
}

interface TableSearchProps<T = any, P = any> extends TableProps<T> {
  /**搜索数据 */
  searchData?: PageRequest<P>;
  /**api接口 */
  listApi?: (params?: any) => Promise<T>;
  /**数据数组 */
  tableData?: any[];
  /**拿到api响应数据的回调函数 */
  responseCb?: (v: []) => void;
  loading?: boolean;
}

type ColumnItem<T> = T & { key: string; index: number; kid: string };

const DEFAULT_PAGE = { current: 1, pageSize: 10 };
function TableSearch<T = any>(
  {
    searchData,
    listApi,
    tableData,
    pagination,
    responseCb,
    loading,
    ...otherProps
  }: TableSearchProps,
  ref: React.Ref<unknown> | undefined,
) {
  /**加载中 */
  const [loadingStatus, setLoadingStatus] = useState(false);
  /**分页数据-state */
  const [paging, setPaging] = useState(
    typeof pagination === 'undefined' ? DEFAULT_PAGE : pagination,
  );
  const [dataSource, setDataSource] = useState<ColumnItem<T>[]>([]);
  const [total, setTotal] = useState(0);
  const showTotal = () => {
    return `共有${total}条`;
  };

  const currentPagination = useMemo(() => {
    if (!paging) {
      return paging;
    }
    return {
      ...paging,
      total: total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total > 0 && showTotal,
    };
  }, [paging, total]);

  useEffect(() => {
    if (Array.isArray(tableData)) {
      setDataSource(tableData as []);
    }
  }, [tableData]);

  const sourceMap = useMemo(() => {
    const { current, pageSize } = (paging ||
      DEFAULT_PAGE) as TablePaginationConfig;
    return dataSource.map((item, index) => {
      item.key = item.kid || index + '';
      item.index = index + 1 + ((current as number) - 1) * (pageSize as number);
      return item;
    });
  }, [dataSource, paging]);

  useImperativeHandle(ref, () => {
    return {
      refresh: (type: RefreshType = 'currentPage') => {
        refresh(type);
      },
    };
  });

  /**拉取api数据 */
  const fetchApiData = useCallback(() => {
    // debugger;
    setLoadingStatus(true);
    const { current, pageSize } = (paging as TablePaginationConfig) || {};
    let params: KeyValuePair = {
      pageNo: current,
      pageSize,
      ...searchData,
    };
    let param = params.param;
    if (param) {
      for (let item in param) {
        if (param[item] === '' || param[item] === null) {
          delete param[item];
        }
      }
    }
    listApi &&
      listApi(params)
        .then((res) => {
          let { count, entities } = res || {};
          //有响应回调函数，执行响应回调函数
          if (responseCb) {
            responseCb && responseCb(entities || []);
          } else {
            setDataSource(entities || []);
          }
          setLoadingStatus(false);
          setTotal(count);
        })
        .catch(() => {
          setLoadingStatus(false);
        });
  }, [searchData, paging]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  const refresh = (type: RefreshType) => {
    if (type == 'currentPage') {
      return setPaging((old) => {
        return { ...old };
      });
    } else {
      return setPaging((old) => {
        return { ...old, current: 1 };
      });
    }
  };

  /* eslint-disable */
  /**分页、排序、筛选变化时触发 */
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<KeyValuePair> | SorterResult<KeyValuePair>[],
    extra: TableCurrentDataSource<any>,
  ) => {
    // params.current = {
    //   sortField: (sorter as KeyValuePair).field,
    //   sortOrder: (sorter as KeyValuePair).order,
    // };
    setPaging(pagination);
    setTotal(pagination.total as number);
  };
  /* eslint-enable */

  return (
    <div>
      <Table
        className="table-search-component"
        {...otherProps}
        dataSource={sourceMap}
        pagination={currentPagination}
        loading={typeof loading === 'undefined' ? loadingStatus : loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default React.forwardRef(
  TableSearch as React.ForwardRefRenderFunction<unknown, TableSearchProps>,
);
