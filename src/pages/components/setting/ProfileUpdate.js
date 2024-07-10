import React from 'react';
import { Form, Input } from 'antd-mobile';

const ProfileUpdate = () => {
    return (
    <>
        <Form requiredMarkStyle='asterisk'>
            <Form.Header>프로필 수정</Form.Header>
            <Form.Item name='name' label='이름' rules={[{ required: true }]}>
            <Input id='name' placeholder='이름을 입력하세요'/>
            </Form.Item>
            <Form.Item name='address' label='주소' help='트루버 추천에 사용됩니다!'>
            <Input id='addr' placeholder='주소를 입력하세요'/>
            </Form.Item>
        </Form>
    </>
    );
};

export default ProfileUpdate;