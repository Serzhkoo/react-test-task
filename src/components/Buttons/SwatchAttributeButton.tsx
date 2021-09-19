import React from 'react';
import styled from 'styled-components';

type AttributeButtonPropsType = {
  isActive: boolean
  isSelected: boolean
  color: string
  onButtonClick?: () => void
  size: 'small' | 'large'
}

const Border = styled.div<{ size: 'small' | 'large', isSelected: boolean }>`
      position: absolute;
      transition: 0.3s;
      background-color: transparent;
      ${({ size, isSelected }) =>
  `height: ${size === 'large' ? '49px' : '26px'};
       width: ${size === 'large' ? '67px' : '26px'};
       border: ${isSelected ? '2px' : '1px'} solid black;      
       visibility: ${isSelected ? 'visible' : 'hidden'};
       opacity: ${isSelected ? '1' : '0'};
      `}
    `;
const Button = styled.div<AttributeButtonPropsType>`
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      position: relative;
      transition: 0.3s;
      ${({ size, color, isActive, isSelected }) =>
        `height: ${size === 'large' ? '45px' : '24px'};
        width: ${size === 'large' ? '63px' : '24px'};
        background-color: ${color};
        border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};
        ${isActive && !isSelected && `
          :hover {
            transition: 0.3s;
            ${Border} {
              visibility: visible;
              opacity: 1;
            };
          };
        `}
      `}
    `;

export class SwatchAttributeButton extends React.PureComponent<AttributeButtonPropsType> {
  render() {
    const { isActive, isSelected, onButtonClick, color, size } = this.props;

    return (
      <div>
        <Button
          onClick={onButtonClick}
          size={size}
          color={color}
          isActive={isActive}
          isSelected={isSelected}
        >
          <Border size={size} isSelected={isSelected}></Border>
        </Button>
      </div>
    );
  }
}