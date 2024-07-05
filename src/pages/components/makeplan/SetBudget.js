import React, { useState } from 'react';
import { Slider, Switch } from 'antd';

import 'rc-slider/assets/index.css';

function SetBudget() {

    return (
        <div>
            <div className='labelDiv'>
                <span className='quest'>예산은 얼마로 생각하세요?</span>
            </div>

            <Slider range defaultValue={[20, 50]} />
        </div>
    );
}


export default SetBudget;