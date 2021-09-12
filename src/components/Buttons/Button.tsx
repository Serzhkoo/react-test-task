import React from 'react';
import styled from 'styled-components';

type ButtonPropsType = {
  type: 'primary' | 'secondary'
  width: number
  height: number
  fontSize: number
  onButtonClick?: () => void
}

export class Button extends React.PureComponent<ButtonPropsType> {
  render() {
    const { type, width, height, fontSize, onButtonClick, children } = this.props;

    const Button = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${width}px;
      height: ${height}px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: ${fontSize}px;
      cursor: default;
      transition: 0.3s;
      ${type === 'primary'
      ? `
        background-color: #5ECE7B;
        color: #FFFFFF;
        :hover {
          background-color: #3CC360;
        };
        :active {
          background-color: #309C4D;
        };
      `
      : `
        border: 1px solid #1D1F22;
        color: #1D1F22;
        :hover {
          background-color: #F2F2F2;
        };
        :active {
          background-color: #CCCCCC;
        };
      `}      
    `;

    return (
      <Button onClick={onButtonClick}>
        <div>{children}</div>
      </Button>
    );
  }
}