import { DoubleLeftOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TopBarDiv } from '../../css/topBtnBarCss';

const TopBtnBar = () => {
    const go = useNavigate();
    const handleBackBtn = () => {
        go(-1);
    };

    let currentUrl = window.location.pathname;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [headerColor, setHeaderColor] = useState('#ffffff');

    // Scroll 위치를 감지
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
        return () => {
            window.removeEventListener("scroll", updateScroll);
        }
    },[]);

    // scroll 위치가 100 이하라면 투명한 배경색을 지정하고, 아니면 흰색을 지정한다.
    useEffect(()=> {
        if (currentUrl === "/" && scrollPosition < 100) {
            setHeaderColor("transparent");
        } else {
            setHeaderColor("#ffffff");
        }
    },[scrollPosition, currentUrl])

    return (
        <TopBarDiv headercolor={headerColor}>
            <DoubleLeftOutlined className='backBtn icon' onClick={() => handleBackBtn()} />
            <div className='btnDiv'>
                <SearchOutlined className='searchBtn icon' onClick={() => go('/search')} />
                <CalendarOutlined className='calendarBtn icon'/>
            </div>
        </TopBarDiv>
    );
};

export default TopBtnBar;
