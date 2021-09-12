import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { HeaderButton } from './HeaderButton/HeaderButton';
import { CategoryType } from '../../../App';

type HeaderButtonsPropsType = {
  selectedCategoryName: string
  setSelectedCategoryName: (categoryName: string) => void
  categories: CategoryType[]
}

class HeaderButtons extends React.PureComponent<HeaderButtonsPropsType & RouteComponentProps> {
  onButtonClick = (buttonName: string) => {
    const { setSelectedCategoryName, history } = this.props;
    setSelectedCategoryName(buttonName);
    history.push('/category');
  };

  render() {
    const HeaderButtonsDiv = styled.div`
      display: flex;
    `;

    const { categories, selectedCategoryName } = this.props;

    return (
      <HeaderButtonsDiv>
        {categories.length !== 0 && categories.map(category =>
          <HeaderButton
            key={category.name}
            buttonName={category.name}
            isSelected={selectedCategoryName === category.name}
            onButtonClick={() => this.onButtonClick(category.name)}
          />)}
      </HeaderButtonsDiv>
    );
  }
}

export default withRouter(HeaderButtons);
