import React from 'react';
import styled from 'styled-components';

type AttributeButtonPropsType = {
  isActive: boolean
  isSelected: boolean
  onButtonClick?: () => void
}

const Button = styled.div<{ isSelected: boolean, isActive: boolean }>`
      height: 45px;
      width: 63px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: 'Source Sans Pro', sans-serif;
      cursor: default;
      ${({ isSelected, isActive }) =>
  `color: ${isSelected ? '#FFFFFF' : isActive ? '#292929' : '#A6A6A6'};
          ${!isSelected ? `border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};` : ''}
          ${isSelected ? 'background-color: #1D1F22;' : ''}
          transition: 0.3s;
          ${(isActive && !isSelected) ? `
            :hover {
              background-color: #F2F2F2;
            };
            :active {
              background-color: #CCCCCC;
            };
          ` : ''}
          `}
      `;

export class AttributeButton extends React.PureComponent<AttributeButtonPropsType> {
  render() {
    const { isActive, isSelected, onButtonClick, children } = this.props;

    return (
      <div>
        <Button
          onClick={onButtonClick}
          isSelected={isSelected}
          isActive={isActive}
        >
          {children}
        </Button>
      </div>
    );
  }
}