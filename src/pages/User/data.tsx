import { Columns } from "@/api/global";
import { Button } from "antd";

export interface UserProps {
	userId: string, 
	phone: string, 
	registerDate: string, 
	endLoginTime: string, 
	userGrade: string, 
	endTime: string, 
	userStatus: number
}

/** 用户等级 */
export const userGrade = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: 'vip',
      value: 1,
    }
];

/** 用户状态 */
export const userStatus = [
    {
      label: '全部',
      value: 100,
    },
    {
      label: '启用',
      value: 1,
    },
    {
      label: '停用',
      value: 2,
    },
   
];

/** 用户列表搜索项 */
export const userFormData = {
    phone: {
      type: 'input',
      label: '手机号:',
      key: 'phone',
      placeholder: '请输入手机号',
    },
    userGrade: {
      type: 'select',
      label: '用户等级:',
      key: 'userGrade',
      options: userGrade,
    },
    userStatus: {
      type: 'select',
      label: '用户状态:',
      key: 'userStatus',
      options: userStatus,
    },
    registerDate: {
        type: 'daterange',
        label: '注册时间:',
        key: 'registerDate',
    },
};

export enum UserStatus {
	Enable = 1,
	Disable = 2,
}


/** 用户列表项 */
export const usersColumns: Columns<UserProps, UserStatus> = [
  {
    title: '序号',
    width: 100,
    render: (item: any) => {
      return item.index;
    },
  },
  {
    title: '用户Id',
    key: 'userId',
    dataIndex: 'userId',
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  },
  {    
    title: '注册时间',
    key: 'registerDate',
    dataIndex: 'registerDate',
  },
  {
    title: '最后登录时间',
    key: 'endLoginTime',
    dataIndex: 'endLoginTime',
  },
  {
    title: '用户等级',
    key: 'userGrade',
    dataIndex: 'userGrade',
  },
  {
    title: '到期时间',
    key: 'endTime',
    dataIndex: 'endTime',
  },
  {
    title: '操作',
    dataIndex: 'userStatus',
    render: (i, item) => {
      return (
        <div className="flexR">
            <Button style={{marginRight: '20px'}} 
				onClick={() => {
					usersColumns?.onOperation?.(
						UserStatus.Disable,
						i,
						item,
					);
				}}
			>
				{i === 1 ? '已停用' : '停用'}
            </Button>
            <Button 
				onClick={() => {
					usersColumns?.onOperation?.(
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
