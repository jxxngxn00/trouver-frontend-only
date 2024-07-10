import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Menu from '../components/Menu';
import CateMenu from '../components/hotspot/CateMenu';
import { mockRequest } from '../components/viewplan/MockRequest';
import '../../css/plan.css'
import '../../css/customComponent.css'
import test from '../../images/test.jfif'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { DotLoading, InfiniteScroll, List, Tabs, Swiper } from 'antd-mobile';
import styled from 'styled-components';

const tabItems = [
    { key: 'recent', title: '최근 핫스팟' },
    { key: 'frequency', title: '누적 핫스팟' },
];

const InfiniteScrollContent = ({ hasMore }) => {
    return (<>
        {hasMore ? ( <>
            <span>Loading</span>
            <DotLoading />
        </>) : (<span>결과 로딩중...</span>)}
    </>);
};

function ViewHotSpot() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const [cate, setCate] = useState();

    useEffect(()=> {
        setCate(selectedCate?.cate);
    }, []);

    async function loadMore() {
        const append = await mockRequest();
        setData( val => [...val, ...append]);
        setHasMore(append.length > 0);
    };


    // Home화면에서 선택값 받아옴
    const location = useLocation();
    const selectedCate = location.state;
    
    // 상세화면 이동
    const handleNavigate = (e) => {
        navigate('/ViewHotSpotDetail');
    };

    // swipe tab
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
        <Menu />
        <div className='homeBgDiv ViewPlanBgDiv'>
            <CateMenu cate={cate} setCate={setCate}/>
            <Title>{selectedCate?.cate} 핫스팟 in 제주</Title>

            <Tabs activeKey={tabItems[activeIndex].key} onChange={key => {
                var _a;
                const index = tabItems.findIndex(item => item.key === key);
                setActiveIndex(index);
                (_a = swiperRef.current) === null || _a === void 0 ? void 0 : _a.swipeTo(index);
            }}>
                {tabItems.map(item => (<Tabs.Tab title={item.title} key={item.key}/>))}
            </Tabs>
            <Swiper direction='horizontal' loop indicator={() => null} ref={swiperRef} defaultIndex={activeIndex} onIndexChange={index => {
                setActiveIndex(index);
            }}>
            <Swiper.Item>
                <div className='contentsWrapper'>
                    <List>
                    {data.map((item, index) => (
                        <List.Item key={index}>
                            <div key={index} className='contents' onClick={() => handleNavigate()}>
                                <div className='imgWrapper'>
                                    <img src={test} alt="thumbnail" />
                                </div>
                                <div className='descWrapper'>
                                    <div className='saved'>
                                        <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B'}}/>
                                        999+
                                    </div>
                                    <div className='planTitle'>{item}, Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                                    <div className='detailsWrapper'>
                                        <div className='router'>6 routes</div>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    ))}
                    </List>

                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                        <InfiniteScrollContent hasMore={hasMore}/>
                    </InfiniteScroll>
                </div>
            </Swiper.Item>
            <Swiper.Item>
                <div className='contentsWrapper'>
                    <List>
                    {data.map((item, index) => (
                        <List.Item key={index}>
                            <div key={index} className='contents' onClick={() => handleNavigate()}>
                                <div className='imgWrapper'>
                                    <img src={test} alt="thumbnail" />
                                </div>
                                <div className='descWrapper'>
                                    <div className='saved'>
                                        <FontAwesomeIcon className='icon' icon={faBookmark} style={{ marginRight: 5, color: '#45866B'}}/>
                                        999+
                                    </div>
                                    <div className='planTitle'>{item}, Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                                    <div className='detailsWrapper'>
                                        <div className='router'>6 routes</div>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    ))}
                    </List>

                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                        <InfiniteScrollContent hasMore={hasMore}/>
                    </InfiniteScroll>
                </div>
            </Swiper.Item>
            </Swiper>
        </div>
        </>
    );
}
const Title = styled.div`

`;
export default ViewHotSpot;