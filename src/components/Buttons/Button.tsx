import React from 'react';
import styled from 'styled-components';

type ButtonPropsType = {
  type: 'primary' | 'secondary'
  width: number
  height: number
  fontSize: number
  onButtonClick?: () => void
}

const ButtonStyle = styled.div<ButtonPropsType>`
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      transition: 0.3s;
      box-sizing: border-box;
      font-weight: 600;
      ${({width, height, fontSize, type}) =>
      `width: ${width}px;
      height: ${height}px;
      font-size: ${fontSize}px;
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
      `}      
    `;

export class Button extends React.PureComponent<ButtonPropsType> {
  render() {
    const { type, width, height, fontSize, onButtonClick, children } = this.props;

    return (
      <ButtonStyle
        onClick={onButtonClick}
        type={type}
        width={width}
        height={height}
        fontSize={fontSize}
      >
        <div>{children}</div>
      </ButtonStyle>
    );
  }
}