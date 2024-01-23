import React from 'react';
import { getLoginInfo, LoginProvider, useLogin } from '@/uses';
import { history, RequestConfig } from 'umi';
import { RunTimeLayoutConfig } from '@umijs/max';
import { Button } from 'antd';

/**
 * 设置Provider
 * @param container
 */
export function rootContainer(container: any) {
	return React.createElement(LoginProvider, null, container);
}


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
	let state = getLoginInfo();
	if (state.isLogin) {
		oldRender();
	} else {
		history.push('/login');
		oldRender();
	}
}


/**
 * 覆写 request
 */
export const request: RequestConfig = {
	timeout: 1000,
	errorConfig: {
		errorHandler(){},
		errorThrower(){}
	},
	requestInterceptors: [
		(res: any) => {
			console.warn('--------请求数据--------', res);
			return res
		}, 
	],
	responseInterceptors: [
		(res) => {
			console.warn('--------响应数据--------', res);
			return res
		}, 
		(e: any) => { 
			// if (e?.data?.code === '101') {
			// 	history.replace('/login');
			// }
			throw e;
		}
	]
};

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
