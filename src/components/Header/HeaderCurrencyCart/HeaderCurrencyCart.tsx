import React from 'react';
import styled from 'styled-components';

import vector from '../../../assets/Vector.svg';
import emptyCart from '../../../assets/Empty Cart.svg';
import CartOverlay from '../../CartOverlay/CartOverlay';
import {
  HeaderCurrencyCartDiv,
  Currency,
  BackDrop,
  Cart,
  Currencies,
  CurrencySwitcher,
  CurrentCurrency,
  NumberOfItems
} from './HeaderCurrencyCartStyles';

type StateType = {
  areCurrenciesCollapsed: boolean
  isCartCollapsed: boolean
}

type HeaderCurrencyCartPropsType = {
  arrayOfCurrencies: CurrencyType[]
  setCurrency: (currencyName: string) => void
  currentCurrencySymbol: string
  cartItemsNumber: number
}

export type CurrencyType = {
  currencySymbol: string
  currencyName: string
}

export class HeaderCurrencyCart extends React.PureComponent<HeaderCurrencyCartPropsType, StateType> {
  constructor(props: HeaderCurrencyCartPropsType) {
    super(props);
    this.state = {
      areCurrenciesCollapsed: true,
      isCartCollapsed: true
    };
  }

  componentDidMount(): void {
    window.addEventListener('click', this.onWindowClick);
  }

  componentWillUnmount(): void {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    !this.state.areCurrenciesCollapsed &&
    this.setState({ areCurrenciesCollapsed: true });
    !this.state.isCartCollapsed &&
    this.setState({ isCartCollapsed: true });
  };

  onCurrencyClick = (event: any) => {
    !this.state.isCartCollapsed &&
    this.setState({ isCartCollapsed: true });
    this.setState({ areCurrenciesCollapsed: !this.state.areCurrenciesCollapsed });
    event.stopPropagation();
  };

  onCartClick = (event: any) => {
    !this.state.areCurrenciesCollapsed &&
    this.setState({ areCurrenciesCollapsed: true });
    this.setState({ isCartCollapsed: !this.state.isCartCollapsed });
    event.stopPropagation();
  };

  setIsCartCollapsed = (isCartCollapsed: boolean) => {
    this.setState({ isCartCollapsed });
  };

  render() {
    const { areCurrenciesCollapsed, isCartCollapsed } = this.state;

    const Vector = styled.div`
      margin-left: 10px;
      img {
        margin-bottom: 2px;
        ${!areCurrenciesCollapsed && 'transform: scale(1, -1);'}
      }
    `;

    const { arrayOfCurrencies, setCurrency, currentCurrencySymbol, cartItemsNumber } = this.props;

    return (
      <HeaderCurrencyCartDiv>
        {!isCartCollapsed && <BackDrop></BackDrop>}
        <CurrentCurrency onClick={this.onCurrencyClick}>
          <div>{currentCurrencySymbol}</div>
          <Vector>
            <img src={vector} alt=""/>
          </Vector>
        </CurrentCurrency>
        <Cart onClick={this.onCartClick}>
          <img src={emptyCart} alt=""/>
          {cartItemsNumber !== 0 &&
          <NumberOfItems>
            <div>{cartItemsNumber}</div>
          </NumberOfItems>}
        </Cart>
        {!areCurrenciesCollapsed &&
        <CurrencySwitcher>
          <Currencies>
            {arrayOfCurrencies.map(currency =>
              <Currency
                onClick={() => setCurrency(currency.currencyName)}
                key={currency.currencyName}
              >{currency.currencySymbol + ' ' + currency.currencyName}
              </Currency>)}
          </Currencies>
        </CurrencySwitcher>}
        {!isCartCollapsed &&
        <CartOverlay setIsCartCollapsed={this.setIsCartCollapsed}/>}
      </HeaderCurrencyCartDiv>
    );
  }
}