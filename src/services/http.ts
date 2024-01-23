import { getLoginInfo } from '@/uses';
import { KeyValuePair } from 'typings';
import { request } from '@@/plugin-request'

interface RequestParamsProps {
  data?: any;
  contentType?: string;
}

interface OptionType {
  data?: any;
  method?: any;
  headers: any;
}

const baseOptions = (
  params: RequestParamsProps,
  method = 'GET',
  config?: KeyValuePair,
) => {
  const state = getLoginInfo();
  let {  data } = params;
  let contentType = 'application/json';
  contentType = params.contentType || contentType;
  let timeStamp = new Date().getTime().toString();
  const option: OptionType = {
    data: data,
    method: method,
    headers: {
      'Content-Type': contentType,
      tenantId: '',
      authType: '',
      devType: '3',
      devKey: `${timeStamp}`,
      userId: state?.userId || '',
      token: state?.token || '',
    },
    ...config,
  };

  return option;
};


const newUrl = (url: string)=>{
  return (url.indexOf('http') !== -1 ? url : "https://aipainter.com/gateway" + url)
}

export const httpGet = (
  url: string,
  data?: any,
  config?: KeyValuePair,
): Promise<any> => {
  const option = baseOptions(data, 'GET', config);
  return request(newUrl(url), option);
};

export const httpPost = (url: string, data?: any): Promise<any> => {
  let option = baseOptions({ data }, 'POST');
  return request(newUrl(url), option);
};

export const httpDelete = (url: string, data?: any): Promise<any> => {
  let option = baseOptions({ data }, 'DELETE');
  return request(newUrl(url), option);
};

export const httpPut = (url: string, data?: any): Promise<any> => {
  let option = baseOptions({ data }, 'PUT');
  return request(newUrl(url), option);
};
