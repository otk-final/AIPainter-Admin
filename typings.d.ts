import '@umijs/max/typings';
import { DatePickerProps, InputProps } from "antd";

type KeyValuePair = { [k: string]: any }


type Columns<T, P> = Array<{
    title?: string;
    key?: keyof T;
    render?: (text: string | number, opt: T) => React.ReactNode;
    dataIndex?: keyof T;
    props?: InputProps | DatePickerProps;
}> & {
    onOperation?: (value: P, text: string | number, opt?: T) => void
}