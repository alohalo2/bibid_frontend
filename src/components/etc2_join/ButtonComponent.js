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
    color: white; /* 기본 텍스트 색상 */
    cursor: pointer;
    
    &.blue2 {
        background-color: #007bff; /* 파란색 배경 */
    }

    &.grey2 {
        background-color: #DDD; /* 회색 배경 */
        color: #000000;
    }
`;

const ButtonComponent = ({ onSubmit, onPrev, prev, next }) => {
    return (
        <ButtonBlock>
            <Button className="blue2" type="submit" onClick={onSubmit}>{prev}</Button>
            <Button className="grey2" type="button" onClick={onPrev}>{next}</Button>
        </ButtonBlock>
    );
};

export default ButtonComponent;
