import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/* components */
import TouchDnd from '../components/updateplan/TouchDnd';
import CalendarPicker from '../components/updateplan/CalendarPicker';
import TopBtnBar from '../components/TopBtnBar';

/* library */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faMapPin, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Modal, Popup } from 'antd-mobile';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import mapPicture from '../../images/map.png'
import SearchPlace from '../components/updateplan/SearchPlace';
// import { text } from '@fortawesome/fontawesome-svg-core';

const placeArray = [{
    id: 0,
    placeName: '제주 국제공항',
    placeCate : '공항',
    placeRate : null
}, {
    id: 1,
    placeName: '몽상 드 애월',
    placeCate: '카페',
    placeRate: 4.2,
}];

function PlanUpdate() {
    const go = useNavigate();
    const [list, setList] = useState([]);
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const [visibleSearchPlace, setVisibleSearchPlace] = useState(false);

    const [valFromCal, setValFromCal] = useState('');
    const handleValueChange = (value) => { setValFromCal(value) }

    useEffect(()=> {
        setList(placeArray);
    }, []);

    // 삭제 전 경고 모달 팝업
     const warning = () => {
        Modal.alert({
            header: (
                <ExclamationCircleFilled
                    style={{
                        fontSize: 64,
                        color: 'var(--adm-color-warning)',
                    }}
                />
            ),
            title: '일정 삭제',
            content: (
                <><div> 일정을 정말 삭제할까요? </div><div> 삭제된 일정은 복구하기 어렵습니다! </div></>
            ),
            showCloseButton: true,
            confirmText: '삭제하기',
            onConfirm: async () => deletAlert()
        });
    };

    // 삭제 완료 모달 팝업
    const deletAlert = async () => {
        Modal.alert({
            header: ( <CheckCircleFilled
                    style={{ 
                        fontSize: 64, 
                        color: 'var(--adm-color-confirm)'
                    }} /> ),
            title: '일정 삭제 완료',
            content: '일정이 정상적으로 삭제되었습니다.',
            confirmText: '확인',
            closeOnMaskClick: true,
            onConfirm: () => go('/viewplan')
        });
    };

    // 저장 완료 모달 팝업
    const saveConfirm = () => {
        Modal.alert({
            header: ( <CheckCircleFilled
                    style={{ 
                        fontSize: 64, 
                        color: 'var(--adm-color-confirm)'
                    }} /> ),
            title: '일정 저장 완료',
            content: '일정이 저장 및 업로드 되었습니다.',
            confirmText: '확인',
            closeOnMaskClick: true,
            onConfirm: () => go('/viewplandetail')
        });
    }

    
    return (
        <div className='homeBgDiv viewDetailWrapper'>
            <TopBtnBar/>
            <div className='planTitle'>
                <PlanTitle type='text' defaultValue='혼자 떠나는 제주여행'></PlanTitle>
            </div>
            <PlanDate>
                {valFromCal? valFromCal : '날짜가 설정되지 않았습니다.'}
                <DateBtn className='dateBtn' onClick={() => setVisibleCalendar(true)}><FontAwesomeIcon icon={faCalendar}/></DateBtn>
            </PlanDate>

            {/* 일정 설정 */}
            <Popup
                position='right'
                visible={visibleCalendar}
                showCloseButton
                onClose={() => {setVisibleCalendar(false)}}
            >
                <CalendarPicker onValChange={handleValueChange} />
                <ConfirmBtn onClick={()=> {setVisibleCalendar(false)}}>확인</ConfirmBtn>
            </Popup>

            {/* N일차 라디오 버튼 */}
            <div className='dateRadioBtn'>
                <div className='dateRadioBoxWrapper'>
                    <InfoRadioBoxInput
                        type="radio"
                        id='day1'
                        name='day'
                        value='1'
                    />
                    <InfoCheckBoxLabel htmlFor='day1'>
                        1일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day2'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day2'>
                        2일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day3'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day3'>
                        3일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day4'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day4'>
                        4일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day5'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day5'>
                        5일차
                    </InfoCheckBoxLabel>
                    
                    <InfoRadioBoxInput
                        type="radio"
                        id='day6'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day6'>
                        6일차
                    </InfoCheckBoxLabel>

                    <InfoRadioBoxInput
                        type="radio"
                        id='day7'
                        name='day'
                        value='2'
                    />
                    <InfoCheckBoxLabel htmlFor='day7'>
                        7일차
                    </InfoCheckBoxLabel>
                </div>
            </div>

            <div className='mapWrapper'>
                <img src={mapPicture} alt='지도 예시'/>
            </div>


            <div className='routesWrapper'>

                {/* 여행 장소 경유지 설정 */}
                <div className='wrapper2'>
                    <div className='wrapper3'>
                        <TouchDnd List={list} setList={setList} />
                    </div>
                </div>

                
            </div>

            
            <VPlanDetailBtnWrapper className='vPlanDetailBtnWrapper'>
                <div className='vPlanDetailBtn' onClick={() => {setVisibleSearchPlace(true)}}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faMapPin} style={{color: "#c9c9c9"}} />
                    <span>장소 추가</span>
                </div>
                
                <Popup
                    visible={visibleSearchPlace}
                    showCloseButton
                    onClose={() => {setVisibleSearchPlace(false)}}
                >
                    <SearchPlace onValChange={handleValueChange} />
                    <ConfirmBtn onClick={()=> {setVisibleSearchPlace(false)}}>등록하기</ConfirmBtn>
                </Popup>


                <div className='vPlanDetailBtn' onClick={() => saveConfirm()}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faFloppyDisk} style={{color: "#c9c9c9",}} />
                    <span>일정 저장</span>
                </div>
                <div className='vPlanDetailBtn' onClick={() => warning()}>
                    <FontAwesomeIcon className='icon' size='2xl' icon={faTrash} style={{color: "#c9c9c9",}} />
                    <span>일정 삭제</span>
                </div>
            </VPlanDetailBtnWrapper>
            
        </div>
    );
}

// const icon = '<a href="https://www.flaticon.com/free-animated-icons/summer" title="summer animated icons">Summer animated icons created by Freepik - Flaticon</a>'
const InfoRadioBoxInput = styled.input`
    position: relative;
    width: 0px;
    height: 0px;
    padding: 0;
    /* margin: -1; */
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space:nowrap;
    border: 0;
    display: none;
        &:checked+label{
        background-color: #45866B;
        color: white;
        }
`;

const InfoCheckBoxLabel = styled.label` 
    max-height: 1.2vh;
    padding: 0.5rem 1rem 0.5rem;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    font-size: 0.8rem;
    color: #383838;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:2vw;
`;

const VPlanDetailBtnWrapper = styled.div`
    display: flex;
    margin-top: 5vh!important;
`;

const PlanTitle = styled.input`
    /* display: block; */
    font-family: 'KCC-Hanbit';
    font-size: 1.75rem;
    padding: 1.4vh 5vw;
    border-radius: 30px;
    border: none;
    box-shadow: 0px 0px 27px -9px rgba(130,130,130,0.75);
`;

const DateBtn = styled.button`
    width:0.5vw;
    display: flex;
    margin: 0%!important;
    justify-content: center;
    border-radius: 30px;
    border: none;

`;

const PlanDate = styled.div`
    font-size: 1.15rem;
    width: 94vw;
    padding: 0vh 3vw;
    margin: 2vh 0vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;


const ConfirmBtn = styled.div`
    width: 60%;
    height: 6vh;
    border-radius: 10px;
    color: white;
    font-size: 1.15rem;
    background-color: #45866B;
    box-shadow: 3px 3px 3px #375d4e;
    transition-duration: 0.3s;
    
    margin: 2vh auto;

    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
        background-color: #81C1A7;
        color: #45866B;
        box-shadow: none;
    }
`;
export default PlanUpdate;