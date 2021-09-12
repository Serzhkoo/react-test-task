import React from 'react';
import { ChildProps, graphql } from '@apollo/react-hoc';

import styled from 'styled-components';
import { pricesQuery } from '../../../common/queries';
import { AddedProductType } from '../../../redux/app-reducer';
import { PriceType } from '../../Category/Category';

type InputPropsType = {
  currentCurrencyName: string
  currentCurrencySymbol: string
  addedProducts: AddedProductType[]
}

type ProductType = {
  id: string
  prices: PriceType[]
}

type CategoryType = {
  products: ProductType[]
}

type ResponseType = {
  categories: CategoryType[]
}

type AmountInCurrentCurrencyType = {
  [productId: string]: number
}

class Total extends React.PureComponent<ChildProps<InputPropsType, ResponseType>> {
  render() {
    const Total = styled.div`
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      padding-top: 24px;
    `;

    const { data, currentCurrencyName, currentCurrencySymbol, addedProducts } = this.props;
    const fetchedCategories = data && data.categories ? data.categories : undefined;

    if (!fetchedCategories) return <div>Loading...</div>;

    const fetchedProducts = fetchedCategories.reduce((acc, category) => {
      return [...acc, ...category.products];
    }, [] as ProductType[]);
    const amountInCurrentCurrency: AmountInCurrentCurrencyType = {};

    let isCurrentCurrencyExist = true;

    fetchedProducts.forEach(prod => {
      const price = prod.prices.find(price => price.currency === currentCurrencyName);
      if (price) {
        amountInCurrentCurrency[prod.id] = price.amount;
      } else {
        isCurrentCurrencyExist = false
      }
    });

    const total = addedProducts.reduce((acc: number, prod) => {
      acc = acc + amountInCurrentCurrency[prod.productId] * prod.amount;
      return acc;
    }, 0);
    const totalAmount = isCurrentCurrencyExist ? total.toFixed(2) : 'Choose another currency'

    return (
      <Total>
        <div>Total</div>
        <div>{currentCurrencySymbol + totalAmount}</div>
      </Total>
    );
  }
}

export default graphql<InputPropsType, ResponseType>(pricesQuery)(Total);