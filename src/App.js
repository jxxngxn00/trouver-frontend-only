import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* import page & components */
import StartPage from './pages/StartPage'

import Home from './pages/Home';
import Plan from './pages/components/home/Plan'

import MakePlan from './pages/plan/MakePlan';
import ViewPlan from './pages/plan/ViewPlan';
import ViewPlanDetail from './pages/plan/ViewPlanDetail'
import PlanUpdate from './pages/plan/PlanUpdate';

import Product from './pages/Product';
import ViewProductDetail from './pages/product/ViewProductDetail';
import WritingReview from './pages/product/WritingReview';

import HotSpot from './pages/HotSpot';
import ViewHotSpot from './pages/hotspot/ViewHotspot';
import ViewHotspotDetail from './pages/hotspot/ViewHotspotDetail';


import Settings from './pages/Settings';

import Profile from './pages/setting/Profile';
import ReserveLog from './pages/setting/ReserveLog';
import FAQ from './pages/setting/FAQ';

import QnA from './pages/setting/QnA';
import QnADetail from './pages/setting/QnADetail';
import QnAInsert from './pages/setting/QnAInsert';

import Test from './pages/Test';
import SearchPage from './pages/SearchPage';

// 페이지 이동시 무조건 맨 위로 스크롤하도록 함
import ScrollToTop from './ScrollToTop';


/* CSS files + images */
import './App.css';

/* Hook */
import { useEffect } from "react";


/* function -- app */
function App() {

  /* BE 연결 테스트 코드 : console에 server에서 전송한 데이터 받아옴 */
  // const getApi = async () => {
  //   axios.get("/api").then((res)=> console.log(res.data));
  //   axios.get("/recommand").then((res)=> console.log(res.data));
  // };

  // useEffect(() => {
  //   getApi();  
  // }, []);

  // const navigate = useNavigate();

  /* 모바일 화면 크기 최적화 훅 */
  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight]);
  return (
    // Routes 
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/home" Component={Home}/>
            <Route path="/plan" Component={Plan}/>

            <Route path="/makeplan" element={<MakePlan/>} />
            <Route path="/viewplan" element={<ViewPlan/>} />
            <Route path="/viewplandetail" element={<ViewPlanDetail/>}/>

            <Route path='/planupdate' element={<PlanUpdate/>}/>

            <Route path='/product' Component={Product}/>
            <Route path='/viewprodDetail' element={<ViewProductDetail/>}/>
            <Route path='/makeReview' Component={WritingReview}/>
            
            <Route path='/hotspot' Component={HotSpot}/>
            <Route path='/viewhotspot' Component={ViewHotSpot}/>
            <Route path='/viewhotspotdetail' Component={ViewHotspotDetail}/>
            
            {/* <Route path="/signup" component={SignupForm} /> */}
            <Route path="/settings" Component={Settings} />
            <Route path="/profile" element={<Profile/>} />
            <Route path='/reserve' Component={ReserveLog}/>

            <Route path='/faq' Component={FAQ}/>

            <Route path='/qna' Component={QnA}/>
            <Route path='/qnaDetail' Component={QnADetail}/>
            <Route path='/qnaInsert' Component={QnAInsert}/>

            <Route path="/test" Component={Test} />
            <Route path='/search' Component={SearchPage}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
