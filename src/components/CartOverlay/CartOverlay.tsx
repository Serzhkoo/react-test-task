import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { AppRootStateType } from '../../redux/store';
import { Button } from '../Buttons/Button';
import {
  AddedProductType,
  decreaseProductAmountAC,
  increaseProductAmountAC
} from '../../redux/app-reducer';
import CartOverlayItemCard from './CartOverlayItemCard/CartOverlayItemCard';
import Total from './CartOverlayItemCard/Total';
import { Buttons, Cart, CartContent, MyBag } from './CartOverlayStyles';

type MapStateToPropsType = {
  addedProducts: AddedProductType[]
  currentCurrencySymbol: string
  currentCurrencyName: string
}

type MapDispatchToPropsType = {
  increaseProductAmountAC: (productIndex: number) => void
  decreaseProductAmountAC: (productIndex: number) => void
}

type CartOverlayPropsType = {
  setIsCartCollapsed: (isCartCollapsed: boolean) => void
  cartItemsNumber: number
}

type PropsType =
  CartOverlayPropsType
  & MapStateToPropsType
  & MapDispatchToPropsType
  & RouteComponentProps

class CartOverlay extends React.PureComponent<PropsType> {
  onCartOverlayClick = (event: any) => {
    event.stopPropagation();
  };

  onViewBagClick = () => {
    this.props.history.push('/cart');
    this.props.setIsCartCollapsed(true);
  };

  render() {

    const { addedProducts, decreaseProductAmountAC, increaseProductAmountAC, currentCurrencyName, currentCurrencySymbol, cartItemsNumber } = this.props;

    return (
      <Cart onClick={this.onCartOverlayClick}>
        <CartContent>
          <MyBag><b>My Bag</b>, {cartItemsNumber === 1
            ? `1 item` : `${cartItemsNumber} items`}</MyBag>
          <div>
            {addedProducts.length
              ? addedProducts.map((prod, index) =>
                <CartOverlayItemCard
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
          <Total
            currentCurrencyName={currentCurrencyName}
            currentCurrencySymbol={currentCurrencySymbol}
            addedProducts={addedProducts}
          />
          <Buttons>
            <Button
              onButtonClick={this.onViewBagClick}
              width={140}
              height={43}
              type={'secondary'}
              fontSize={14}
            >VIEW BAG</Button>
            <Button
              width={140}
              height={43}
              type={'primary'}
              fontSize={14}
            >CHECK OUT</Button>
          </Buttons>
        </CartContent>
      </Cart>
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

export default compose<ComponentType<CartOverlayPropsType>>(
  withRouter,
  connect(mapStateToProps, { increaseProductAmountAC, decreaseProductAmountAC })
)(CartOverlay);