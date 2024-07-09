import { ArrowDownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { faQ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'antd-mobile';
import React from 'react';
import styled from 'styled-components';
const items = [
    {
        title: '질문 내용1',
        contents: '답변 내용1',
    },
    {
        title: '질문 내용2',
        contents: '답변 내용2',
    },
    {
        title: '질문 내용3',
        contents: '답변 내용3',
    },
    {
        title: '질문 내용4',
        contents: '답변 내용4',
    },
    {
        title: '질문 내용5',
        contents: '답변 내용5',
    },

];
const FAQ = () => {
    // console.log(items);
    return (
        <div className='homeBgDiv ViewPlanBgDiv'>
            <CollapseWrapper>
                <Title>자주 묻는 질문</Title>
                <Collapse className='collapse' defaultActiveKey={['0']}
                arrowIcon={active => (active ? <MinusOutlined /> : <PlusOutlined/>)}>
                    { items.map((item, idx) => (
                        
                        <Collapse.Panel key={idx} title={item.title} arrowIcon={<ArrowDownOutlined />}>
                            {item.contents}
                        </Collapse.Panel>
                    ))}
                </Collapse>
            </CollapseWrapper>
        </div>
    );
};
const Title = styled.span`
    margin-left: 3vw;
    font-family: 'Pretendart-ExtraBold';
    font-size: 1.75rem;
`;

const CollapseWrapper = styled.div`
    width: 100vw;
    text-align: left;
`;
export default FAQ;