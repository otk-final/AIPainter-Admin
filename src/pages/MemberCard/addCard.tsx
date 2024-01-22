import { Button, InputNumber, Select } from "antd";
import React, { useState } from "react";

interface AddCardProps {
    onAdd: ()=> void
}

const AddCard:React.FC<AddCardProps> = ({onAdd})=>{
    let [type, setType] = useState('1');
    let [count, setCount] = useState(10);

    const onSubmit = ()=>{
        console.log("onSubmit", type, count)
        onAdd();
    }

    return (
        <div style={{paddingTop: 50}}>
            <div className="add-item flexR">
                <div className='add-label'>卡类型:</div>
                <Select 
                    placeholder="请选择"
                    defaultValue="1"
                    value={type}
                    onChange={(v) => setType(v)}
                    options={[
                        { value: '1', label: '月卡' },
                        { value: '2', label: '季卡' },
                        { value: '3', label: '年卡' },
                    ]}
                    />
            </div> 
            <div className="add-item  flexR">
                <div className='add-label'>数量:</div>
                <InputNumber defaultValue={count} onChange={(v)=> setCount(Number(v))}/>
            </div> 
            <Button type='primary' onClick={onSubmit} >确定</Button>
        </div>
    )
}

export default AddCard;