import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, Form, Input, Modal, Space, Table, Tag, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd/lib';
import { DefaultClient } from '@/api/http';
import { ApiPagination, PageData } from '@/utils/page';






const ModelPage: React.FC = () => {


	const [data, setPageData] = useState<PageData<any>>()
	const [loading, setLoading] = useState<boolean>(false)
	const [reload, setReload] = useState<boolean>(false)


	const columns: any = [
		{
			title: '类型',
			dataIndex: 'actionRemark',
			render: (actionRemark: string) => {
				if (actionRemark === "positive") {
					return <Tag color="green">正向提示词</Tag>
				}
				if (actionRemark === "negative") {
					return <Tag color="error">反向提示词</Tag>
				}
				if (actionRemark === "sensitive") {
					return <Tag color="warning">敏感词</Tag>
				}
				if (actionRemark === "reverse") {
					return <Tag color={"success"}>反推流程</Tag>
				}
				if (actionRemark === "prompt") {
					return <Tag color={"blue"}>生图流程</Tag>
				}
				return <div></div>
			}
		}, {
			title: '模型',
			dataIndex: 'actionName',
		}, {
			title: '文件名',
			dataIndex: 'rootFileName',
		},
		{
			title: '操作',
			dataIndex: 'action',
			render: (table: any, record: any) => (
				<ItemRowAction record={record} />
			),
		}]


	const ItemRowAction: React.FC<any> = ({ record }) => {

		const handleRemove = () => {
			Modal.confirm({
				title: "确认删除?",
				onOk: async () => {
					let resp = await DefaultClient.post('/pv/comfyui/delete', { id: record.id }).catch(() => { })
					if (!resp) {
						return;
					}
					setReload(!reload)
				},
			})
		}

		return <Space style={{ width: "100%", display: 'flex', justifyContent: 'center' }} direction={'horizontal'}>
			<Button icon={<DeleteFilled />} type={'link'} size={'small'} onClick={handleRemove}>删除</Button>
		</Space>
	}


	//分页查询
	const apiPaginationHandle = async (page: number, size: number) => {
		setLoading(true)
		let apiResult: any = await DefaultClient.get('/pv/comfyui/uploads', { params: { page: page, size: size } }).catch(() => { }).finally(() => setLoading(false))
		setPageData(apiResult.data)
	}

	//分页渲染
	let apiPagination = ApiPagination({ page: data?.page, size: data?.size, total: data?.totalCount, onChange: apiPaginationHandle })

	// 默认查询
	useEffect(() => { apiPaginationHandle(1, 20) }, [reload])

	const [uploadForm, setUploadForm] = useState<{ name: string, file?: UploadFile, type: string }>({ name: "", type: "" })
	const [uploadOpen, setUploadOpen] = useState<boolean>(false)
	const [uploadTitle, setUploadTitle] = useState<string>("")
	const props: UploadProps = {
		onRemove: (file) => {
			setUploadForm({ ...uploadForm, file: file })
		},
		beforeUpload: (file) => {
			setUploadForm({ ...uploadForm, file: file })
			return false;
		},
		fileList: uploadForm.file ? [uploadForm.file] : [],
	};

	const handleAdd = (type: string, title: string) => {
		setUploadTitle(title)
		setUploadForm({ name: "", type: type })
		setUploadOpen(true)
	}

	/**
	 * 上传文件
	 * @returns 
	 */
	const handleUpload = async () => {
		const fd = new FormData()
		fd.append("file", uploadForm.file!);
		fd.append("code", "comfyui");
		fd.append("name", uploadForm.name);
		fd.append("remark", uploadForm.type);

		//上传文件
		let apiResult = await DefaultClient.postForm('/pv/archive/import', fd, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}).catch(() => { })
		if (!apiResult) {
			return
		}
		setUploadOpen(false)
		setReload(!reload)
	}

	return (
		<PageContainer ghost>

			<div className='flexR' style={{ justifyContent: 'space-between' }} >
				<Space>
					<Button type='primary' onClick={() => handleAdd('prompt', '上传生图流程')}>上传生图流程</Button>
					<Button type='primary' onClick={() => handleAdd('reverse', '更新反推流程')}>更新反推流程</Button>
				</Space>

				<Space>
					<Button type='primary' onClick={() => handleAdd('positive', '正向提示词')}>正向提示词</Button>
					<Button type='primary' onClick={() => handleAdd('negative', '反向提示词')}>反向提示词</Button>
					<Button type='primary' onClick={() => handleAdd('sensitive', '敏感提示词')}>敏感提示词</Button>
				</Space>
			</div>


			<Divider orientation="left" orientationMargin="0">文件列表</Divider>
			<Table sticky={{ offsetHeader: 48 }} columns={columns} dataSource={data?.entities} size={'small'} bordered pagination={apiPagination} loading={loading} />


			<Modal title={uploadTitle} open={uploadOpen} width={900} onOk={handleUpload} onCancel={() => setUploadOpen(false)}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					autoComplete="off"
				>
					<Form.Item
						label={`名称`}
						name="actionName"
						rules={[{ required: true, message: `请输入模型名称` }]}
					>
						<Input placeholder={`请输入模型名称`} value={uploadForm.name} onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })} />
					</Form.Item>

					<Form.Item label="文件" name="fileList"
						rules={[{ required: true, message: '请上传文件' }]}>
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>Click to Upload</Button>
						</Upload>

					</Form.Item>
				</Form>
			</Modal>
		</PageContainer>
	);
};



export default ModelPage;
