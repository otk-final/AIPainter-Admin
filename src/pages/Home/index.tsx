import Guide from '@/components/Guide';
import { useLogin } from '@/uses';
import { trim } from '@/utils/format';
import { EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Input } from 'antd';
import { Line } from '@ant-design/plots';
import { useEffect } from 'react';
import  './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const {loginState} = useLogin();

  useEffect(()=>{
    console.log("sssss" , loginState)
  }, [])

  const handleLogin = ()=> {

  }

  if(!loginState.isLogin) {
    return (
      <div className='home-wrap flexC'>
        <img src={""}  className='login-img'/>
          <Input className='input-login' size='large' 
            placeholder="请输入用户名" 
            prefix={<UserOutlined />} />
          <Input.Password
            size='large'
            className='input-login'
            placeholder="请输入密码"
            prefix={<KeyOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Button type="primary" size='large' className='btn-login' onClick={handleLogin}>登录</Button>
      </div>
    )
  }

  const data = [
    { time: '1991', value: 20 },
    { time: '1992', value: 20 },
  ];
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <PageContainer ghost className='home-wrap'>
        <Line {...config} />
    </PageContainer>
  );
};

export default HomePage;
