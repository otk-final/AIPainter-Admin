import React from 'react';
import { getLoginInfo, LoginProvider, useLogin } from '@/uses';
import { history } from 'umi';
import { RunTimeLayoutConfig } from '@umijs/max';
import { Button } from 'antd';


/**
 * 设置Provider
 * @param container
 */
 export function rootContainer(container: any) {
    return React.createElement(LoginProvider, null, container);
  }




// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

/**
 * 覆写 render。
 * @param oldRender
 */
export function render(oldRender: any) {
  console.log('覆写路由render', oldRender);
  let state = getLoginInfo();
  console.log('覆写路由state', state);
  if (state.isLogin) {
    oldRender();
  } else {
    history.push('/login');
    oldRender();
  }
}


export const layout: RunTimeLayoutConfig = () => {
  const {logout, loginState} = useLogin();
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightContentRender: () => {
     return loginState.isLogin ? <Button type="text" onClick={logout}>{loginState.nickName} 退出登录</Button> : <div/>
    } 
  };
};
