import React, { ComponentType } from 'react';
import { ChildProps, graphql } from '@apollo/react-hoc';
import styled from 'styled-components';

import ItemCard from './ItemCard/ItemCard';
import { productsQuery } from '../../common/queries';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  addProductToCartAC,
  AttributeAndFirstItemIdType,
  setInitialTempProductAC
} from '../../redux/app-reducer';
import { AttributeType } from '../ProductCard/ProductCard';

export type PriceType = {
  currency: 'USD' | 'GBP' | 'AUD' | 'JPY' | 'RUB'
  amount: number
}

export type ProductType = {
  id: string
  name: string
  inStock: boolean
  gallery: string[]
  attributes: AttributeType[]
  prices: PriceType[]
  brand: string
}
type CategoryType = {
  name: string
  products: ProductType[]
}
type ResponseType = {
  categories: CategoryType[]
};
type CategoryPropsType = {
  title: string
  currentCurrencySymbol: string
  currentCurrencyName: string
};
type MapDispatchToPropsType = {
  setInitialTempProductAC: (productId: string, attributesAndFirstItemsId: AttributeAndFirstItemIdType[]) => void
  addProductToCartAC: () => void
}
type InputPropsType = CategoryPropsType & MapDispatchToPropsType

const CategoryName = styled.div`
      font-size: 42px;
      margin-top: 168px;
      margin-bottom: 115px;
    `;
const Items = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, 386px);
      grid-column-gap: 40px;
      grid-row-gap: 103px;
      margin-bottom: 191px;
    `;

class Category extends React.PureComponent<ChildProps<InputPropsType, ResponseType>> {
  onCartClick = (productId: string, attributesAndFirstItemsId: AttributeAndFirstItemIdType[]) => {
    this.props.setInitialTempProductAC(productId, attributesAndFirstItemsId);
    this.props.addProductToCartAC();
  };

  render() {

    const { data, currentCurrencySymbol, currentCurrencyName, title } = this.props;
    let products: ProductType[] = [];
    if (data && data.categories) {
      if (title === 'all') {
        for (let i = 0; i < data.categories.length; i++) {
          products = products.concat(data.categories[i].products);
        }
      } else {
        const requiredCategory = data.categories.find(category => category.name === title);
        products = requiredCategory ? requiredCategory.products : [];
      }
    }
    const capitalizedTitle = title[0].toUpperCase() + title.slice(1);

    return (
      <div>
        <CategoryName>
          {capitalizedTitle}
        </CategoryName>
        <Items>
          {products.length !== 0 && products.map(product =>
            <ItemCard
              key={product.id}
              product={product}
              currentCurrencySymbol={currentCurrencySymbol}
              currentCurrencyName={currentCurrencyName}
              onCartClick={this.onCartClick}
            />
          )}
        </Items>
      </div>
    );
  }
}

export default compose<ComponentType<CategoryPropsType>>(
  connect(undefined, { setInitialTempProductAC, addProductToCartAC }),
  graphql<InputPropsType, ResponseType>(productsQuery, {
    options: props => ({
      fetchPolicy: 'no-cache'
    })
  })
)(Category);
