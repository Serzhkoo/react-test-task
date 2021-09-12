import React from 'react';
import styled from 'styled-components';

type MiniButtonPropsType = {
  isActive: boolean
  size: 'small' | 'large'
  onButtonClick?: () => void
}

export class CartButton extends React.PureComponent<MiniButtonPropsType> {
  render() {
    const { isActive, size, children, onButtonClick } = this.props;

    const Button = styled.div`
      height: ${size === 'small' ? '24' : '45'}px;
      width: ${size === 'small' ? '24' : '45'}px;
      border: 1px solid ${isActive ? '#1D1F22' : '#A6A6A6'};
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: 'Source Sans Pro', sans-serif;
      color: ${isActive ? '#1D1F22' : '#A6A6A6'};
      ${!isActive && 'background-color: rgba(166, 166, 166, 0.2);'}
      cursor: default;
      position: relative;
      transition: 0.3s;      
      ${isActive && `
        :hover {
          background-color: #F2F2F2;
        };
        :active {
          background-color: #CCCCCC;
        };
      `}
      img {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      };
    `;

    return (
      <Button onClick={onButtonClick}>
        {children}
      </Button>
    );
  }
}