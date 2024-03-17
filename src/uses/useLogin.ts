import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getCache, setCache } from '@/utils';
import {history} from 'umi'
const LOGIN_INFO = 'LOGIN_INFO';

export interface UserAuthorization {
    accessToken: string
    accessExpiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number,
    principal: UserPrincipal
    scopes: string[]
    tokenType: string
}

export interface UserPrincipal {
    type: string
    id: string
    name: string
    profile: any
}


// info 用户信息
interface LoginAttribute {
    state?: UserAuthorization
    updateUserAuthorization: (v: UserAuthorization) => void,
    login: (info: any) => void;
    logout: () => void;
  }

let context:LoginAttribute = {
    updateUserAuthorization: () => {},
    login: ()=>{},
    logout: ()=>{}
}

const LoginContext = React.createContext(context);

export const useLogin = ()=>{
    return useContext(LoginContext);
}

export const LoginProvider = (props: any) => {
    const [state, setLogin] = useState<UserAuthorization | undefined>();

    useEffect(()=>{
        let userAuthor: UserAuthorization = getCache(LOGIN_INFO) as UserAuthorization  || undefined;
        if (userAuthor) {
            //TODO 校验 有效期
            setLogin({ ...userAuthor });
        }
    }, [])

    const login = useCallback((res: UserAuthorization)=>{
        setLogin({...res});
        setCache(LOGIN_INFO, {...res});
    }, [])

    const logout = useCallback(()=>{
        setLogin(undefined);
        setCache(LOGIN_INFO, undefined);
        history.replace('/login')
    },[])

    const updateUserAuthorization = useCallback((v: UserAuthorization)=>{
        setLogin(res=>{
            return {...v}
        })
    },[])


    return React.createElement(
        LoginContext.Provider,
        {
            value: {
                state,
                login,
                logout,
                updateUserAuthorization
            }
        },
        props.children
    )
} 

/**
 * 获取登录信息
 */
export const getLoginInfo: () => UserAuthorization = () => {
    return getCache(LOGIN_INFO) as UserAuthorization  || undefined;
};