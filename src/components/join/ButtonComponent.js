import React from 'react';
import styled from "styled-components";


const ButtonBlock = styled.div`
    display: flex;
    flex-direction: row; /* 가로 방향으로 배치 */
    justify-content: center;
    align-items: center;
    margin-top: 2.5rem;
`;

const Button = styled.button`
    width: 9.688rem;
    height: 2.875rem;
    margin: 0 0.625rem;
    border: none;
    border-radius: 0.313rem;
    font-size: 0.938rem;
    font-weight: 900;
    color: black; /* 기본 텍스트 색상 */
    cursor: pointer;
    background-color: #ccc;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #0A369D; 
        color: white; 
    }
`;

const ButtonComponent = ({ onSubmit, onPrev, prev, next }) => {
    return (
        <ButtonBlock>
            <Button type="submit" onClick={onSubmit} >
                <p style={{fontSize: '16px', fontWeight: '600'}}>{prev}</p></Button>
            <Button  type="button" onClick={onPrev}>
                <p style={{fontSize: '16px', fontWeight: '600'}}>{next}</p>
            </Button>
        </ButtonBlock>
    );
};

export default ButtonComponent;
