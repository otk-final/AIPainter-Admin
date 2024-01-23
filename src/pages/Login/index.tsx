
import { useLogin } from '@/uses';
import { EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { history } from 'umi';
import { useState } from 'react';
import  './index.less';

const LoginPage = ()=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const {login} = useLogin();

    const handleLogin = ()=> {
        login({
            // userId: '123454321',
            nickName: name,
            password
        });
        history.push('/');
    }

    return (
        <PageContainer ghost >
            <div className='login-wrap flexC'>
                <img src={""}  className='login-img'/>
                <Input className='input-login' size='large' 
                placeholder="请输入用户名" 
                prefix={<UserOutlined />} 
                onChange={(v)=> setName(v.target.value)}/>
                <Input.Password
                size='large'
                className='input-login'
                placeholder="请输入密码"
                onChange={(v)=> setPassword(v.target.value)}
                prefix={<KeyOutlined />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Button type="primary" size='large' className='btn-login' onClick={handleLogin}>登录</Button>
        </div>
      </PageContainer>
    )
}

export default LoginPage