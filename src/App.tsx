import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChildProps, graphql } from '@apollo/react-hoc';
import { compose } from 'redux';

import { Header } from './components/Header/Header';
import styled from 'styled-components';
import { Routes } from './routes/Routes';
import { categoriesQuery } from './common/queries';
import { connect } from 'react-redux';
import { AppRootStateType } from './redux/store';
import { CurrencyType } from './components/Header/HeaderCurrencyCart/HeaderCurrencyCart';
import { setCurrencyAC } from './redux/app-reducer';

type CurrencyArray = {
  [currency: string]: string
}

export const currenciesSymbols: CurrencyArray = {
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  JPY: '¥',
  RUB: '₽'
};

type StateType = {
  selectedCategoryName: string
}

export type CategoryType = {
  name: string
}

type ResponseType = {
  categories: CategoryType[];
  currencies: string[]
};

type MapStateToPropsType = {
  currentCurrencyName: string
  currentCurrencySymbol: string
  cartItemsNumber: number
}

type MapDispatchToPropsType = {
  setCurrencyAC: (currency: CurrencyType) => void
}

type AppPropsType =
  MapStateToPropsType
  & MapDispatchToPropsType
  & ChildProps<{}, ResponseType>

const AppDiv = styled.div`
      margin: 0 100px;
    `;

class App extends React.PureComponent<AppPropsType, StateType> {
  constructor(props: AppPropsType) {
    super(props);
    this.state = {
      selectedCategoryName: ''
    };
  }

  componentDidUpdate(prevProps: Readonly<AppPropsType>, prevState: Readonly<StateType>): void {
    const { data, setCurrencyAC } = this.props;
    if (prevProps.data && prevProps.data.loading && data && !data.loading && data.currencies) {
      setCurrencyAC({
        currencySymbol: currenciesSymbols[data.currencies[0]],
        currencyName: data.currencies[0]
      });
      if (data && data.categories) {
        this.setState({ selectedCategoryName: 'all' });
      }
    }
  }

  setSelectedCategoryName = (categoryName: string) => {
    this.setState({ selectedCategoryName: categoryName });

  };

  setCurrency = (currencyName: string) => {
    this.props.setCurrencyAC({
      currencySymbol: currenciesSymbols[currencyName],
      currencyName: currencyName
    });
  };

  render() {
    if (!this.state.selectedCategoryName) return <div>Loading...</div>;

    const { selectedCategoryName } = this.state;
    const { currentCurrencyName, currentCurrencySymbol, cartItemsNumber } = this.props;
    const data = this.props.data;
    const categories = data && data.categories ? data.categories : [];
    const allCategories = [{ name: 'all' }].concat(categories);
    const currencies = data && data.currencies ? data.currencies : [];
    const activeCategoryName = categories.length
      ? selectedCategoryName
      : '';
    const arrayOfCurrencies = currencies.map(currency =>
      ({
        currencySymbol: currenciesSymbols[currency],
        currencyName: currency
      }));

    return (
      <BrowserRouter>
        <AppDiv>
          <Header
            selectedCategoryName={selectedCategoryName}
            setSelectedCategoryName={this.setSelectedCategoryName}
            categories={allCategories}
            arrayOfCurrencies={arrayOfCurrencies}
            setCurrency={this.setCurrency}
            currentCurrencySymbol={currentCurrencySymbol}
            cartItemsNumber={cartItemsNumber}

          />
          <Routes
            activeCategoryName={activeCategoryName}
            currentCurrencySymbol={currentCurrencySymbol}
            currentCurrencyName={currentCurrencyName}
          />
        </AppDiv>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    currentCurrencyName: state.app.currentCurrency.currencyName,
    currentCurrencySymbol: state.app.currentCurrency.currencySymbol,
    cartItemsNumber: state.app.addedProducts.reduce((acc: number, prod) => acc + prod.amount, 0)
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { setCurrencyAC }),
  graphql<{}, ResponseType>(categoriesQuery))(App);