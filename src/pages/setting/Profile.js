import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import TopBtnBar from '../components/TopBtnBar';

import styled from 'styled-components';
import { Divider, SideBar } from 'antd-mobile';

import profile from '../../images/default_profile.png';

import ProfileUpdate from '../components/setting/ProfileUpdate';
import Review from '../components/setting/Review';
import Plan from '../components/setting/Plan';
import MySaved from '../components/setting/MySaved';

const tabs = [
    { key: 'key0',
        title : '프로필 수정',
        div : (<ProfileUpdate/>),
    },
    { key: 'key1',
        title : '내가 쓴 리뷰',
        div : (<Review/>),
    },
    { key: 'key2',
        title : '나의 일정',
        div : (<Plan/>),
    },
    { key: 'key3',
        title : 'My',
        div : (<MySaved/>),
    },
]

const Profile = () => {
    const user_name = '도레미';
    const [activeKey, setActiveKey] = useState('key0');

    // useEffect(()=> {
    //     console.log(activeKey);
    // });
    return (
        <>
            <Menu/>
            <TopBtnBar/>
            <div className='homeBgDiv'>
                <ProfileDiv className='profileDiv'>
                    <div className='imgWrapper'>
                        <img className='userImg' src={profile} alt='기본 프로필' />
                    </div>
                    <div className='textInfo'>
                        <span id='name'>{user_name}</span>
                        <span id='mbti'>ENFP</span>
                    </div>
                </ProfileDiv>
                <Divider />
                <ContentDiv className='contentDiv'>
                    <div className='side'>
                        <SideBar 
                            style={{ '--width': '30vw' }}
                            activeKey={activeKey}
                            onChange={setActiveKey}
                        >
                            {tabs.map(item => (
                                <SideBar.Item key={item.key} title={item.title}/>
                            ))}
                        </SideBar>
                    </div>
                    <div className='main'>
                    {tabs.map((item, idx) => (
                        <div key={idx} className={activeKey === item.key ? 'content active' : 'content'}>
                            {item.div}
                        </div>
                        ))}
                    </div>
                </ContentDiv>
            </div>
        </>
    );
};

const ProfileDiv = styled.div`
    margin-top: 3vh;
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    padding: 7vh 0vw 3vh;
    gap: 3vw;

    position: sticky;
    top: 0;
    left: 0;
    z-index: 1234567;
    & .imgWrapper{ 
        position: relative;
        width : 35vw; 
        height: 35vw;
        border-radius: 30px;
        overflow: hidden;
        & img { 
            height: 100%;
            position : absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    & .textInfo {
        display: flex;
        flex-direction: column;
        align-items : flex-start;
        & #name { 
            font-family: 'Pretendart-ExtraBold'; 
            font-size: 1.3rem;
        }
    }
`;

const ContentDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: stretch;

    & .side { flex:none; }
    & .main { flex:auto; }
    & .content {
        height: 100%;
        display: none;
        justify-content: center;
        text-align: left;
        flex-direction: column;
        align-items: center;
        font-size: 2rem;
    }
    & .active { display:flex !important; }
`;
export default Profile;