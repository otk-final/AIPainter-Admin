import { Button } from "antd";
import { Columns } from "typings";

export interface ModelColumnsProps {
    id?: string;
    actionName?: string;
    rootFileName?: string;
    createdBy: string
}

export const ModelColumns: Columns<ModelColumnsProps, 'edit' | 'del'> = [
    {
      title: '序号',
      render: (item: any) => {
        return item.index;
      },
    },
    {
      title: '名称',
      key: 'actionName',
      dataIndex: 'actionName',
    },
    {
      title: '文件名称',
      key: 'rootFileName',
      dataIndex: 'rootFileName',
    },
    {
      title: '创建时间',
      key: 'createdBy',
      dataIndex: 'createdBy',
    },
    {
      title: '操作',
      render: (_, item) => {
        return (
            <div className="flexR">
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                      ModelColumns?.onOperation?.(
                            'edit', _, item,
                        );
                    }}
                >
                    编辑
                </Button>
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                      ModelColumns?.onOperation?.(
                            'del', _, item,
                        );
                    }}
                >
                    删除
                </Button>
            </div>
        )
      },
    },
];