import React from 'react';
import styled from 'styled-components';

import HeaderButtons from './HeaderButtons/HeaderButtons';
import logo from '../../assets/a-logo.svg';
import {
  CurrencyType,
  HeaderCurrencyCart
} from './HeaderCurrencyCart/HeaderCurrencyCart';
import { CategoryType } from '../../App';

type HeaderPropsType = {
  selectedCategoryName: string
  setSelectedCategoryName: (categoryName: string) => void
  categories: CategoryType[]
  arrayOfCurrencies: CurrencyType[]
  setCurrency: (currencyName: string) => void
  currentCurrencySymbol: string
  cartItemsNumber: number
}

const HeaderDiv = styled.div`
      position: fixed;
      margin-left: -100px;
      border-right: 100px solid #FFFFFF;
      border-left: 100px solid #FFFFFF;
      top: 0;
      z-index: 1;    
      display: flex;
      justify-content: space-between;
      height: 80px;
      background-color: #FFFFFF;
      @media (max-width: 1044px) {width: 568px};
      @media (min-width: 1045px) and (max-width: 1220px) {width: 824px};
      @media (min-width: 1221px) and (max-width: 1460px) {width: 1000px};
      @media (min-width: 1461px) {width: 1240px};
    `;
const HeaderImageDiv = styled.div`
      position: absolute;
      left: 50%;
      top: 24px;
      transform: translate(-50%, 0);
    `;

export class Header extends React.PureComponent<HeaderPropsType> {

  render() {

    const { categories, selectedCategoryName, setSelectedCategoryName, arrayOfCurrencies, setCurrency, currentCurrencySymbol, cartItemsNumber } = this.props;

    return (
      <HeaderDiv>
        <HeaderButtons
          selectedCategoryName={selectedCategoryName}
          setSelectedCategoryName={setSelectedCategoryName}
          categories={categories}
        />
        <HeaderImageDiv><img src={logo} alt=""/></HeaderImageDiv>
        <HeaderCurrencyCart
          arrayOfCurrencies={arrayOfCurrencies}
          setCurrency={setCurrency}
          currentCurrencySymbol={currentCurrencySymbol}
          cartItemsNumber={cartItemsNumber}
        />
      </HeaderDiv>
    );
  }
}

