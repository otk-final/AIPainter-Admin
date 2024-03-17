
import { useLogin } from '@/uses';
import { EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import { history } from 'umi';
import { useState } from 'react';
import './index.less';
import { ApiResult, AuthClient } from '@/api/http';
import { UserAuthorization } from '@/uses/useLogin';

const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const { login } = useLogin();

    const handleLogin = async () => {
        //认证 登陆
        let resp: any = await AuthClient.post('/oauth2/token', {
            grant_type: "password",
            username: name,
            password: password
        }).catch(() => { })
        if (!resp) {
            return
        }
        let apiResult = resp as ApiResult<UserAuthorization>
        //缓存登陆信息
        login(apiResult.data);
        history.push('/');
    }

    return (
        <PageContainer ghost >
            <div className='login-wrap flexC'>
                <img src={""} className='login-img' />
                <Input className='input-login' size='large'
                    placeholder="请输入用户名"
                    prefix={<UserOutlined />}
                    onChange={(v) => setName(v.target.value)} />
                <Input.Password
                    size='large'
                    className='input-login'
                    placeholder="请输入密码"
                    onChange={(v) => setPassword(v.target.value)}
                    prefix={<KeyOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Button type="primary" size='large' className='btn-login' onClick={handleLogin}>登录</Button>
            </div>
        </PageContainer>
    )
}

export default LoginPage