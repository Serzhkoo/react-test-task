import React from 'react';
import { ChildProps, graphql } from '@apollo/react-hoc';

import { CartButton } from '../../Buttons/CartButton';
import minus from '../../../assets/Minus.svg';
import plus from '../../../assets/Plus.svg';
import { productQuery } from '../../../common/queries';
import { AddedProductType } from '../../../redux/app-reducer';
import { AttributeType } from '../../ProductCard/ProductCard';
import { PriceType } from '../../Category/Category';
import { SwatchAttributeButton } from '../../Buttons/SwatchAttributeButton';
import {
  Amount,
  AmountChange,
  Attributes,
  Brand,
  Image,
  ImageAndAmount,
  ItemCard,
  Name,
  Price,
  Product,
  Label
} from './CartOverlayItemCardStyles';

type InputPropsType = {
  product: AddedProductType
  productIndex: number
  currentCurrencySymbol: string
  currentCurrencyName: string
  increaseProductAmount: (productIndex: number) => void
  decreaseProductAmount: (productIndex: number) => void
}

type ResponseType = {
  product: {
    id: string
    name: string
    gallery: string[]
    attributes: AttributeType[]
    prices: PriceType[]
    brand: string
  }
};

class CartOverlayItemCard extends React.PureComponent<ChildProps<InputPropsType, ResponseType>> {
  render() {
    const { product, data, decreaseProductAmount, increaseProductAmount, currentCurrencySymbol, currentCurrencyName, productIndex } = this.props;
    const fetchedProduct = data && data.product ? data.product : undefined;

    if (!fetchedProduct) return <div>Loading...</div>;

    const { id, attributes, prices, name, brand, gallery } = fetchedProduct;
    const price = prices.find(price => price.currency === currentCurrencyName);
    const amount = price ? price.amount.toFixed(2) : 'Choose another currency';

    return (
      <ItemCard>
        <Product>
          <Brand>{brand}</Brand>
          <Name>{name}</Name>
          <Price>{currentCurrencySymbol + amount}</Price>
          {attributes.length !== 0 && attributes.map(attribute =>
            <React.Fragment key={attribute.id + id}>
              {attribute.items[0].id.toLowerCase() === 'yes' &&
              <Label>{attribute.name}</Label>}
              <Attributes>
                {attribute.items.map(item =>
                  attribute.type === 'text'
                    ? <CartButton
                      key={item.id + id}
                      isActive={product.attributes[attribute.id] === item.id}
                      size={'small'}
                    >{item.value.split('').slice(0, 3).join('')}
                    </CartButton>
                    : <SwatchAttributeButton
                      key={item.id}
                      size={'small'}
                      isActive={product.attributes[attribute.id] === item.id}
                      isSelected={product.attributes[attribute.id] === item.id}
                      color={item.value}
                    />
                )}
              </Attributes>
            </React.Fragment>
          )}
        </Product>
        <ImageAndAmount>
          <AmountChange>
            <CartButton
              onButtonClick={() => increaseProductAmount(productIndex)}
              isActive={true}
              size={'small'}
            >
              <img src={minus} alt=""/>
              <img src={plus} alt=""/>
            </CartButton>
            <Amount>{product.amount}</Amount>
            <CartButton
              onButtonClick={() => decreaseProductAmount(productIndex)}
              isActive={true}
              size={'small'}
            >
              <img src={minus} alt=""/>
            </CartButton>
          </AmountChange>
          <Image>
            <img src={gallery[0]} alt=""/>
          </Image>
        </ImageAndAmount>
      </ItemCard>
    );
  }
}

export default graphql<InputPropsType, ResponseType>(productQuery, {
  options: props => ({
    fetchPolicy: 'no-cache',
    variables: {
      title: props.product.productId
    }
  })
})(CartOverlayItemCard);
