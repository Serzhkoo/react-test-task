import React from 'react';
import styled from 'styled-components';

type AttributeButtonPropsType = {
  isActive: boolean
  isSelected: boolean
  color: string
  onButtonClick?: () => void
  size: 'small' | 'large'
}

export class SwatchAttributeButton extends React.PureComponent<AttributeButtonPropsType> {
  render() {
    const { isActive, isSelected, onButtonClick, color, size } = this.props;

    const Border = styled.div`
      position: absolute;
      height: ${size === 'large' ? '49px' : '26px'};
      width: ${size === 'large' ? '67px' : '26px'};
      background-color: transparent;
      border: ${isSelected ? '2px' : '1px'} solid black;      
      visibility: ${isSelected ? 'visible' : 'hidden'};
      opacity: ${isSelected ? '1' : '0'};
      transition: 0.3s;
    `;
    const Button = styled.div`
      height: ${size === 'large' ? '45px' : '24px'};
      width: ${size === 'large' ? '63px' : '24px'};
      background-color: ${color};
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      position: relative;
      border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};
      transition: 0.3s;
      ${isActive && !isSelected && `
        :hover {
          transition: 0.3s;
          ${Border} {
            visibility: visible;
            opacity: 1;
          };
        };
      `}
    `;

    return (
      <div>
        <Button onClick={onButtonClick}>
          <Border></Border>
        </Button>
      </div>
    );
  }
}