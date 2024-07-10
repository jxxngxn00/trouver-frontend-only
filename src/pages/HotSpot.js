import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../css/product.css'
import Menu from './components/Menu';

import CateMenu from './components/hotspot/CateMenu';
import RecommProduct from './components/hotspot/RecommProduct';
import Commercial from './components/Commercial';
import SearchBox from './components/SearchBox';
import { useNavigate } from 'react-router-dom';

function HotSpot(props) {
    const [cate, setCate] = useState();
    const go = useNavigate();

    const handleGoList = (cate) => {
        const data = { 'cate' : cate };
        go('/viewhotspot', {state: data});
    };

    useEffect(()=> {
        if (cate !== undefined) { handleGoList(cate); }
    }, [cate]);

    return (
        <>
        <Menu />
        <div className='bgProd homeBgDiv'>
            <div className='searchContainer'>
                <form>
                    <SearchBox />
                </form>
            </div>
            {/* 카테고리 메뉴 */}
            <CateMenu cate={cate} setCate={setCate}/>
            {/* 광고 배너 */}
            <Commercial />
            {/* 카테고리별 추천 상품 */}
            <RecommProduct />
        </div>
        </>
    );
}

export default HotSpot;