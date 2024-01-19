import { Columns } from "@/api/global";
import { Button } from "antd";

/** 卡等级 */
export const cardType = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: '一级',
      value: 0,
    },
    {
      label: '二级',
      value: 1,
    },
];

/** 卡状态 */
export const cardStatus = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: '卡状态1',
      value: 1,
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
    cardStatus: {
      type: 'select',
      label: '卡状态:',
      key: 'cardStatus',
      options: cardStatus,
      value: 100,
    },
};

enum CardType {


}

export const memberCardColumns: Columns<any, any> = [
    {
      title: '序号',
      width: 100,
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
      return: (_)=>{
        return <div></div>
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
        key: 'cardStatus',
        dataIndex: 'cardStatus',
      },
    {
      title: '操作',
      key: 'action',
      render: (_, item) => {
        return (
			<div className="flexR">
				<Button style={{marginRight: '20px'}} 
					onClick={() => {
						memberCardFormData?.onOperation?.(
							UserStatus.Disable,
							i,
							item,
						);
					}}
				>
					{i === 3 ? '已停用' : '停用'}
				</Button>
				<Button 
					onClick={() => {
						memberCardFormData?.onOperation?.(
							UserStatus.Enable,
							i,
							item,
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