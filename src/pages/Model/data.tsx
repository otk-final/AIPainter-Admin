import { Columns } from "@/api/global";
import { Button, Image } from "antd";

export interface ModelProps {
    kid?: string;
    modelName?: string;
    nickName?: string;
    fileList?: any[];
    positiveWord?: string
    negativeWord?: string
}

/** 大模型列表项 */
export const normalModelColumns: Columns<ModelProps, 'edit' | 'del'> = [
    {
      title: '序号',
      render: (item: any) => {
        return item.index;
      },
    },
    {
      title: '大模型名称',
      key: 'modelName',
      dataIndex: 'modelName',
    },
    {
      title: '对外名称',
      key: 'nickName',
      dataIndex: 'nickName',
    },
    {    
      title: '配图',
      key: 'fileList',
      dataIndex: 'fileList',
      return: (i) => {
        return <Image src="" style={{width: '150px', height: '150px', background: '#f61'}}/>
      }
    },
    {
      title: '默认正向展示',
      key: 'positiveWord',
      dataIndex: 'positiveWord',
    },
    {
      title: '默认反向展示',
      key: 'negativeWord',
      dataIndex: 'negativeWord',
    },
    {
      title: '操作',
      render: (_, item) => {
        return (
            <div className="flexR">
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                        console.log('00000')
                    normalModelColumns?.onOperation?.(
                            'edit',  _,  item,
                        );
                    }}
                >
                    编辑
                </Button>
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                        console.log('3333')
                    normalModelColumns?.onOperation?.(
                            'del',  _,  item,
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
  

/** lora模型列表项 */
export const loraModelColumns: Columns<ModelProps, 'edit' | 'del'> = [
    {
      title: '序号',
      render: (item: any) => {
        return item.index;
      },
    },
    {
      title: 'Lora模型名称',
      key: 'modelName',
      dataIndex: 'modelName',
    },
    {
      title: '对外名称',
      key: 'nickName',
      dataIndex: 'nickName',
    },
    {    
      title: '配图',
      key: 'fileList',
      dataIndex: 'fileList',
      return: (i) => {
        return <Image src="" style={{width: '150px', height: '150px', background: '#f61'}}/>
      }
    },
    {
      title: '操作',
      render: (_, item) => {
        return (
            <div className="flexR">
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                        loraModelColumns?.onOperation?.(
                            'edit', _, item,
                        );
                    }}
                >
                    编辑
                </Button>
                <Button style={{marginRight: '20px'}} 
                    onClick={() => {
                        loraModelColumns?.onOperation?.(
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