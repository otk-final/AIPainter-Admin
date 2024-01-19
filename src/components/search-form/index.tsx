import React, { useEffect, useImperativeHandle, useState } from 'react';
import {
  DatePicker,
  Select,
  Input,
  Button,
  InputProps,
  DatePickerProps,
  Form,
  TreeSelect,
  Space,
  Row,
  Col,
} from 'antd';
import './index.less';
import FormItem from 'antd/lib/form/FormItem';
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface FormItemIpo {
  /**表单类型daterange（日期区间）date（日期）select radio input */
  type: string;
  /**表单标签文字说明 */
  label?: string;
  /**表单placeholder */
  placeholder?: string;
  /**表单传入服务端的字段名称 */
  key: string;
  /**表单宽度 */
  width?: number;
  /**字段对应的值 */
  value?: any;
  /**是否带搜索功能 */
  showSearch?: boolean;
  /**额外数据：例如下拉的配置项 、日期的format*/
  options?: any;
  props?: InputProps | DatePickerProps;
}
interface ObjIpo {
  [k: string]: any;
}

interface SearchFormProps<T = {}> {
  formData: { [k in keyof T]: FormItemIpo };
  clickSearch: (v: any) => void;
  onItemChange?: (value: any, type: string, index: number) => void;
  /**额外的按钮 */
  extraBtn?: () => JSX.Element;
}
/**搜索组件
 * formData：搜索的数据
 * clickSearch：点击搜索触发的事件
 */
function SearchForm<T>(
  { formData, clickSearch, extraBtn, onItemChange }: SearchFormProps<T>,
  ref: React.MutableRefObject<any>,
) {
  /**obj-arr */
  const toArr = (obj: any) => {
    const arr = Object.keys(obj).map((key) => {
      return obj[key];
    });
    return arr;
  };

  const [form] = Form.useForm();
  /**form数据-arr */
  const [data, setData] = useState(() => {
    return toArr(formData);
  });

  useEffect(() => {
    setData(toArr(formData));
  }, [formData]);

  useImperativeHandle(
    ref,
    () => {
      return form;
    },
    [form],
  );

  /**搜索监听 */
  const search = () => {
    // const form: ObjIpo = {};
    // data.map((item) => {
    //   form[item.key] = item.value;
    // });
    const values = form.getFieldsValue(true);
    clickSearch(values);
  };
  /**表单变化监听 */
  const onFormItemChange = (value: any, type: string, index: number) => {
    onItemChange?.(value, type, index);
    // let formValue: any = value;
    // if (type == "input") {
    //   formValue = value.target.value;
    // }
    // data[index].value = formValue;
  };

  /**日期区间ui */
  const renderRangePicker = (item: FormItemIpo, index: number) => {
    return (
      <RangePicker
        style={{ width: item.width }}
        allowClear={true}
        {...item.options}
        onChange={(data, dateString) => {
          onFormItemChange(dateString, item.type, index);
        }}
      />
    );
  };
  /**日期ui */
  const renderTreeSelect = (item: FormItemIpo, index: number) => {
    return (
      <TreeSelect
        style={{ width: item.width }}
        allowClear={true}
        treeData={item.options}
        onChange={(data, dateString, extra) => {
          onFormItemChange(data, item.type, index);
        }}
      />
    );
  };
  /**日期ui */
  const renderDatePicker = (item: FormItemIpo, index: number) => {
    return (
      <DatePicker
        style={{ width: item.width }}
        allowClear={true}
        {...item.options}
        onChange={(data, dateString) => {
          onFormItemChange(dateString, item.type, index);
        }}
      />
    );
  };
  /**下拉 */
  const renderSelect = (item: FormItemIpo, index: number) => {
    return (
      <Select
        showSearch={item.showSearch || false}
        defaultValue={item.value}
        style={{ width: item.width || 140 }}
        placeholder={item.placeholder}
        onChange={(value) => {
          onFormItemChange(value, item.type, index);
        }}
        filterOption={(input, option) => {
          return option
            ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            : false;
        }}
      >
        {item.options?.map((option: any) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    );
  };
  /**输入框 */
  const renderInput = (item: FormItemIpo, index: number) => {
    return (
      <Input
        {...(item.props as InputProps)}
        style={{ width: item.width }}
        allowClear={true}
        defaultValue={item.value}
        placeholder={item.placeholder}
        onChange={(e) => {
          onFormItemChange(e, item.type, index);
        }}
      />
    );
  };
  /**根据表单类型渲染表单ui */
  const renderFormItem = (item: FormItemIpo, index: number) => {
    let component = null;
    switch (item.type) {
      case 'daterange':
        component = renderRangePicker(item, index);
        break;
      case 'date':
        component = renderDatePicker(item, index);
        break;
      case 'select':
        component = renderSelect(item, index);
        break;
      case 'radio':
        /**暂时未用到 */
        break;
      case 'input':
        component = renderInput(item, index);
        break;
      case 'treeSelect': {
        component = renderTreeSelect(item, index);
        break;
      }
      default:
        component = renderInput(item, index);
    }
    return component;
  };
  return (
    <div className="common-searchDiv flexR">
      <Form form={form}>
        <div className="search-ipt-box flexR">
          {data.map((item, index) => {
            return (
              <Space
                align="baseline"
                key={item.key}
                style={{
                  marginRight: '20px',
                }}
              >
                <span className="label">{item.label}</span>
                <FormItem key={item.key as string} name={item.key}>
                  {renderFormItem(item, index)}
                </FormItem>
              </Space>
            );
          })}
        </div>
      </Form>
      <div className="searchBtn">
        <Button type="primary" onClick={search}>
          搜索
        </Button>
        {extraBtn && extraBtn()}
      </div>
    </div>
  );
}

export default React.forwardRef(SearchForm);
