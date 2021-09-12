import React from 'react';
import styled from 'styled-components';

type HeaderButtonPropsType = {
  buttonName: string
  isSelected: boolean
  onButtonClick: () => void
}

export class HeaderButton extends React.PureComponent<HeaderButtonPropsType> {
  onButtonClick = () => {
    this.props.onButtonClick();
  };

  render() {
    const { buttonName, isSelected } = this.props;

    const HeaderButtonDiv = styled.div`
      ${isSelected && 'border-bottom: 2px solid #5ECE7B'};
      color: ${isSelected ? '#5ECE7B' : '#1D1F22'};
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      div {
        margin-top: 28px;
        margin-left: 16px;
        margin-right: 16px;
        align-self: stretch;
      }
    `;

    return (
      <HeaderButtonDiv onClick={this.onButtonClick}>
        <div>
          {buttonName.toUpperCase()}
        </div>
      </HeaderButtonDiv>
    );
  }
}