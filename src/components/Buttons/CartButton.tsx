import React from 'react';
import styled from 'styled-components';

type MiniButtonPropsType = {
  isActive: boolean
  size: 'small' | 'large'
  onButtonClick?: () => void
}

const Button = styled.div<{isActive: boolean, size: 'small' | 'large'}>`      
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: 'Source Sans Pro', sans-serif;
      cursor: default;
      position: relative;
      img {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      };
      transition: 0.3s;
      ${({size, isActive}) =>
        `height: ${size === 'small' ? '24' : '45'}px;
        width: ${size === 'small' ? '24' : '45'}px;
        border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};
        color: ${isActive ? '#1D1F22' : '#A6A6A6'};
        ${!isActive ? 'background-color: rgba(166, 166, 166, 0.2);'
         : `:hover {
            background-color: #F2F2F2;
          };
          :active {
            background-color: #CCCCCC;
          };
        `}
      `}      
      `;

export class CartButton extends React.PureComponent<MiniButtonPropsType> {
  render() {
    const { isActive, size, children, onButtonClick } = this.props;

    return (
      <Button
        onClick={onButtonClick}
        size={size}
        isActive={isActive}
      >
        {children}
      </Button>
    );
  }
}