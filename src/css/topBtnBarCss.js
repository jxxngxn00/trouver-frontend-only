import styled from 'styled-components';

export const TopBarDiv = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 12345678;

    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 5vw;
    margin-bottom: 3vh;
    & .icon { font-size : 2rem; }
    & .btnDiv { display:flex; gap:3vw; }
`;
