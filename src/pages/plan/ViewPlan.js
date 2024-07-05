import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/plan.css'
import '../../css/customComponent.css'
import test from '../../images/test.jfif'

import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
function ViewPlan() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        console.log('Background clicked');
    };

    const handleNavigate = (e) => {
        e.stopPropagation();
        console.log('Content clicked');
        navigate('/ViewPlanDetail');
    };

    return (
        <div className='homeBgDiv ViewPlanBgDiv'>
            <div className='searchContainer'>
                <form>
                    <SearchBox onClick={() => handleClick}/>
                </form>
            </div>

            <div className='contentsWrapper'>

                {/* 반복되는 contents 요소 */}
                {[...Array(3)].map((_, index) => (
                    <div key={index} className='contents' onClick={() => handleNavigate}>
                        <div className='imgWrapper'>
                            <img src={test} alt="thumbnail" />
                        </div>
                        <div className='descWrapper'>
                            <div className='planTitle'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</div>
                            <div className='detailsWrapper'>
                                <div className='router'>6 routes</div>
                                <div className='saved'>
                                    <FontAwesomeIcon className='icon' icon={faBookmark} />
                                    999+
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPlan;