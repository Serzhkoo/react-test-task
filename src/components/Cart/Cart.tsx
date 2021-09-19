import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { AppRootStateType } from '../../redux/store';
import {
  AddedProductType,
  decreaseProductAmountAC,
  increaseProductAmountAC
} from '../../redux/app-reducer';
import CartItemCard from './CartItemCard/CartItemCard';

type MapStateToPropsType = {
  addedProducts: AddedProductType[]
  currentCurrencySymbol: string
  currentCurrencyName: string
}

type MapDispatchToPropsType = {
  increaseProductAmountAC: (productIndex: number) => void
  decreaseProductAmountAC: (productIndex: number) => void
}

type CartPropsType = MapStateToPropsType & MapDispatchToPropsType

const CartDiv = styled.div`
      max-width: 1097px;
    `;
const CartTitle = styled.div`
      font-size: 32px;
      font-weight: 700;
      margin-top: 161px;
      margin-bottom: 61px;
    `;

class Cart extends React.PureComponent<CartPropsType> {
  render() {
    const { addedProducts, decreaseProductAmountAC, increaseProductAmountAC, currentCurrencyName, currentCurrencySymbol } = this.props;

    return (
      <CartDiv>
        <CartTitle>
          CART
        </CartTitle>
        <div>
          {addedProducts.length
            ? addedProducts.map((prod, index) =>
              <CartItemCard
                key={prod.id}
                productIndex={index}
                product={prod}
                increaseProductAmount={increaseProductAmountAC}
                decreaseProductAmount={decreaseProductAmountAC}
                currentCurrencyName={currentCurrencyName}
                currentCurrencySymbol={currentCurrencySymbol}
              />)
            : 'Cart is empty'}
        </div>
      </CartDiv>
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    addedProducts: state.app.addedProducts,
    currentCurrencySymbol: state.app.currentCurrency.currencySymbol,
    currentCurrencyName: state.app.currentCurrency.currencyName
  };
};

export default connect(mapStateToProps,
  { increaseProductAmountAC, decreaseProductAmountAC })(Cart);