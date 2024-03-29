import { Button } from "antd";
import { Columns } from "typings";

/** 卡等级 */
export const cardType = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: 'vip',
      value: 1,
    },
];

/** 卡 使用状态 */
export const cardUseStatus = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: '未使用',
      value: 1,
    },
    {
      label: '已使用',
      value: 2,
    },
];


export const memberCardFormData = {
    phone: {
      type: 'input',
      label: '充值卡号:',
      key: 'phone',
      placeholder: '请输入充值卡号',
    },
    createDate: {
        type: 'daterange',
        label: '生成时间:',
        key: 'createDate',
    },
    useDate: {
        type: 'daterange',
        label: '使用时间:',
        key: 'useDate',
    },
    cardType: {
      type: 'select',
      label: '卡类型:',
      key: 'cardType',
      options: cardType,
      value: 100,
    },
    cardUseStatus: {
      type: 'select',
      label: '卡状态:',
      key: 'cardUseStatus',
      options: cardUseStatus,
      value: 100,
    },
};

export interface MemberCardProps {
  cardId?: string,
  password?: string, 
  cardType?: number,
  startTime?: string,
  useTime?: string,
  useAccount?: string,
  cardUseStatus?: number,
  cardStatus?: number
}

export const memberCardColumns: Columns<MemberCardProps, any> = [
    {
      title: '序号',
      render: (item: any) => {
        return item.index;
      },
    },
    {
      title: '卡id',
      key: 'cardId',
      dataIndex: 'cardId',
    },
    {
      title: '密码',
      key: 'password',
      dataIndex: 'password',
    },
    {
      title: '卡类型',
      key: 'cardType',
      dataIndex: 'cardType',
      return: (i: number)=>{
        return <div>{i === 1? "vip": "普通"}</div>
      }
    },
    {
      title: '生成时间',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: '使用时间',
      key: 'useTime',
      dataIndex: 'useTime',
    },
    {
      title: '使用账号',
      key: 'useAccount',
      dataIndex: 'useAccount',
    },
    {
        title: '状态',
        key: 'cardUseStatus',
        dataIndex: 'cardUseStatus',
        return: (i: number)=>{
          return <div>{i === 2? "已使用": "未使用"}</div>
        }
      },
    {
      title: '操作',
      dataIndex: 'cardStatus',
      key: 'cardStatus',
      render: (i, item) => {
        return (
			<div className="flexR">
				<Button style={{marginRight: '20px'}} 
					onClick={() => {
						memberCardFormData?.onOperation?.(
							"disable", i, item
						);
					}}
				>
					{i === 3 ? '已停用' : '停用'}
				</Button>
				<Button 
					onClick={() => {
						memberCardFormData?.onOperation?.(
              "enable", i, item
						);
					}}
				> 
					{i === 2 ? '已启用' : '启用'}
				</Button>
			</div>
        )
      },
    },
  ];