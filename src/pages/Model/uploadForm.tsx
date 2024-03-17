import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Button, Form, Input } from 'antd';
import { ModelColumnsProps } from './data';
import './index.less'



const ModelUploadForm: React.FC = () => {
    const { state } = useLocation();
    const [addForm] = Form.useForm();

    
    // const type = state.type

    
    // useEffect(() => {
    //     addForm.setFieldsValue({ ...state });
    // }, [])

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const onSubmit = (res) => {
        console.log('v', res);
        // message.success(`新增${modalType}成功`)
    }


    return (
        <PageContainer ghost title={'上传文件'}>
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
                <Form.Item<ModelColumnsProps>
                    label={`名称`}
                    name="actionName"
                    rules={[{ required: true, message: `请输入模型名称:` }]}
                >
                    <Input placeholder={`请输入模型名称`} />
                </Form.Item>


                <Form.Item label="文件" name="fileList" valuePropName="fileList" getValueFromEvent={normFile}
                    rules={[{ required: true, message: '请上传配图' }]}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </PageContainer>
    )
};

export default ModelUploadForm;
