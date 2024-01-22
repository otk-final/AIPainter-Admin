import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Button, Form, Input,  message,   Upload } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { ModelProps } from './data';
import './index.less'

const ModelAddEditPage: React.FC = () => {
    const { state } = useLocation();
    const [addForm] = Form.useForm();
    const modalType = state?.type === "1" ? "大模型" : "Lora模型";

    useEffect(()=>{
        addForm.setFieldsValue({...state});
    },[state.kid])

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const onSubmit = (res)=>{
        console.log('v', res);
        message.success(`新增${modalType}成功`)
    }

    const renderNormal = ()=>{
    return (
        <Fragment>
            <Form.Item<ModelProps> label="默认正向提示词" name="positiveWord"
             rules={[{ required: true, message: '请输入默认正向提示词' }]}>
                <Input.TextArea rows={8} showCount maxLength={1000}  placeholder="请输入默认正向提示词" />
            </Form.Item>
            <Form.Item<ModelProps> label="默认反向提示词" name="negativeWord"
             rules={[{ required: true, message: '请输入默认反向提示词' }]}>
                <Input.TextArea rows={8} showCount maxLength={1000} placeholder="请输入默认反向提示词" />
            </Form.Item>
        </Fragment>
    )
    }

    return (
        <PageContainer ghost title={`${state.kid ? "编辑" : "新增"}${modalType}`}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                form={addForm}
                autoComplete="off"
            >
                <Form.Item<ModelProps>
                    label={`${modalType}名称:`}
                    name="modelName"
                    rules={[{ required: true, message: `请输入${modalType}名称:`}]}
                >
                    <Input placeholder={`请输入${modalType}名称`}/>
                </Form.Item>

                <Form.Item<ModelProps>
                    label="对外名称"
                    name="nickName"
                    rules={[{ required: true, message: '请输入对外名称' }]}
                >
                    <Input   placeholder="请输入对外名称"/>
                </Form.Item>

                <Form.Item label="配图" name="fileList" valuePropName="fileList" getValueFromEvent={normFile}
                 rules={[{ required: true, message: '请上传配图' }]}>
                    <Upload action=""
                        listType="picture-card"
                        maxCount={1}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传</div>
                        </button>
                    </Upload>
                </Form.Item>
                {state?.type === '1' ? renderNormal(): null}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </PageContainer>
    )
};

export default ModelAddEditPage;
