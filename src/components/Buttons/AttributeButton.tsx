import React from 'react';
import styled from 'styled-components';

type AttributeButtonPropsType = {
  isActive: boolean
  isSelected: boolean
  onButtonClick?: () => void
}

export class AttributeButton extends React.PureComponent<AttributeButtonPropsType> {
  render() {
    const { isActive, isSelected, onButtonClick, children } = this.props;

    const Button = styled.div`
      height: 45px;
      width: 63px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: 'Source Sans Pro', sans-serif;
      cursor: default;
      color: ${isSelected ? '#FFFFFF' : isActive ? '#292929' : '#A6A6A6'};
      ${!isSelected && `border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};`}
      ${isSelected && 'background-color: #1D1F22;'}
      transition: 0.3s;
      ${isActive && !isSelected && `
        :hover {
          background-color: #F2F2F2;
        };
        :active {
          background-color: #CCCCCC;
        };
      `}
    `;

    return (
      <div>
        <Button onClick={onButtonClick}>
          {children}
        </Button>
      </div>
    );
  }
}