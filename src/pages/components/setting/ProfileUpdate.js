import React, { useState } from 'react';
import { Dialog, Form, Input, Button, Checkbox, Space, DatePicker, Picker } from 'antd-mobile';
import dayjs from 'dayjs';
import { CloseCircleFilled } from '@ant-design/icons';

const ProfileUpdate = () => {
    const [form] = Form.useForm();
    const onSubmit = () => {
        const values = form.getFieldValue();
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        });
    };
    
    return (
    <>
        <Form form={form} initialValues={{
                a: 'aaa',
                b: [],
            }} footer={<Button block color='primary' onClick={onSubmit} size='large'>
                변경하기
            </Button>}>
            <Form.Item name='a' label='닉네임'>
            <Input placeholder='请输入'/>
            </Form.Item>
            <Form.Item name='a' label='이름'>
            <Input placeholder='请输入' disabled/>
            </Form.Item>
            <Form.Item name='a' label='생년월일'>
            <Input placeholder='请输入' disabled/>
            </Form.Item>
            <Form.Item name='b' label='字段B' required>
            <Checkbox.Group>
                <Space direction='vertical'>
                <Checkbox id='value1' value='1'>选项1</Checkbox>
                <Checkbox id='value2' value='2'>选项2</Checkbox>
                <Checkbox id='value3' value='3' disabled>
                    选项3
                </Checkbox>
                </Space>
            </Checkbox.Group>
            </Form.Item>
            <Form.Item label='表单联动-字段B' shouldUpdate={(prevValues, curValues) => prevValues.b !== curValues.b}>
            {({ getFieldValue }) => JSON.stringify(getFieldValue('b'))}
            </Form.Item>
            <MbtiPickerInputItem />
        </Form>

        {/* <RefDemo /> */}

    </>
    );
};

const mbtiColumns = [
    [ { label : 'E', value: 'E'}, { label : 'I', value: 'I'}, ], 
    [ { label : 'N', value: 'N'}, { label : 'S', value: 'S'}, ], 
    [ { label : 'F', value: 'F'}, { label : 'T', value: 'T'}, ], 
    [ { label : 'P', value: 'P'}, { label : 'J', value: 'J'}, ], 
];

const MbtiPickerInputItem = () => {
    const [pickerVisible, setPickerVisible] = useState(false);
    const [value, setValue] = useState([]);
    return (<Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.mbti !== curValues.mbti}>
      {({ getFieldValue, setFieldsValue }) => (
        <Form.Item 
        name='mbti' 
        label='Mbti' 
        trigger='onConfirm' 
        arrowIcon={getFieldValue('mbti') ? (
            <CloseCircleFilled style={{
                color: 'var(--adm-color-light)',
                fontSize: 14,
            }} 
                onClick={e => {
                    e.stopPropagation();
                    setFieldsValue({ mbti: [] });
                }}
            />) : (true)} 
            onClick={() => { setPickerVisible(true);}}
        >
        <Picker
            columns={mbtiColumns}
            visible={pickerVisible}
            onClose={() => {setPickerVisible(false)}}
            value={value}
            onConfirm={v => {
                setValue(v);
                setPickerVisible(false);
                setFieldsValue( {mbti : v} );
            }}
        >
            {value => value ? value.map(v => v.label).join('') : 'mbti를 설정해주세요!'}
        </Picker>
        </Form.Item>)}
    </Form.Item>);
};
export default ProfileUpdate;