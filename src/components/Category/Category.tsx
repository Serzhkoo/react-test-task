import React from 'react';
import { ChildProps, graphql } from '@apollo/react-hoc';
import styled from 'styled-components';

import ItemCard from './ItemCard/ItemCard';
import { productsQuery } from '../../common/queries';

export type PriceType = {
  currency: 'USD' | 'GBP' | 'AUD' | 'JPY' | 'RUB'
  amount: number
}

export type ProductType = {
  id: string
  name: string
  inStock: boolean
  gallery: string[]
  prices: PriceType[]
  brand: string
}

type ResponseType = {
  category: {
    name: string
    products: ProductType[]
  }
};

type InputPropsType = {
  title: string
  currentCurrencySymbol: string
  currentCurrencyName: string
};

class Category extends React.PureComponent<ChildProps<InputPropsType, ResponseType>> {
  render() {
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

    const { data, currentCurrencySymbol, currentCurrencyName } = this.props;
    const products = data && data.category ? data.category.products : [];

    return (
      <div>
        <CategoryName>
          Category name
        </CategoryName>
        <Items>
          {products.length !== 0 && products.map(product =>
            <ItemCard
              key={product.id}
              product={product}
              currentCurrencySymbol={currentCurrencySymbol}
              currentCurrencyName={currentCurrencyName}
            />
          )}
        </Items>
      </div>
    );
  }
}

export default graphql<InputPropsType, ResponseType>(productsQuery, {
  options: props => ({
    fetchPolicy: 'no-cache',
    variables: {
      title: props.title
    }
  })
})(Category);
