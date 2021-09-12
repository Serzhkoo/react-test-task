import React from 'react';
import { ChildProps, graphql } from '@apollo/react-hoc';

import { AttributeButton } from '../../Buttons/AttributeButton';
import { CartButton } from '../../Buttons/CartButton';
import minus from '../../../assets/Minus2.svg';
import plus from '../../../assets/Plus2.svg';
import arrow from '../../../assets/Arrow.svg';
import { AddedProductType } from '../../../redux/app-reducer';
import { PriceType } from '../../Category/Category';
import { AttributeType } from '../../ProductCard/ProductCard';
import { productQuery } from '../../../common/queries';
import {
  Amount,
  AmountChange,
  Attributes,
  Brand,
  Image,
  ImageAndAmount,
  ItemCard,
  ItemImage,
  LeftArrow,
  Name,
  Price,
  Product,
  RightArrow
} from './CartItemCardStyles';
import { SwatchAttributeButton } from '../../Buttons/SwatchAttributeButton';

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

type StateType = {
  imgId: number
}

class CartItemCard extends React.PureComponent<ChildProps<InputPropsType, ResponseType>, StateType> {
  constructor(props: ChildProps<InputPropsType, ResponseType>) {
    super(props);
    this.state = {
      imgId: 0
    };
  }

  onRightArrowClick = () => {
    const imgId = this.state.imgId;
    const data = this.props.data;
    const gallery = data && data.product ? data.product.gallery : [];
    imgId === gallery.length - 1
      ? this.setState({ imgId: 0 })
      : this.setState({ imgId: imgId + 1 });
  };

  onLeftArrowClick = () => {
    const imgId = this.state.imgId;
    const data = this.props.data;
    const gallery = data && data.product ? data.product.gallery : [];
    imgId === 0
      ? this.setState({ imgId: gallery.length - 1 })
      : this.setState({ imgId: imgId - 1 });
  };

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
            <Attributes key={attribute.id + id}>
              {attribute.items.map(item =>
                attribute.type === 'text'
                  ? <AttributeButton
                    key={item.id + id}
                    isActive={product.attributes[attribute.id] === item.id}
                    isSelected={product.attributes[attribute.id] === item.id}
                  >{item.value}
                  </AttributeButton>
                  : <SwatchAttributeButton
                    key={item.id}
                    size={'large'}
                    isActive={product.attributes[attribute.id] === item.id}
                    isSelected={product.attributes[attribute.id] === item.id}
                    color={item.value}
                  />
              )}
            </Attributes>
          )}
        </Product>
        <ImageAndAmount>
          <AmountChange>
            <CartButton
              onButtonClick={() => increaseProductAmount(productIndex)}
              isActive={true}
              size={'large'}
            >
              <img src={minus} alt=""/>
              <img src={plus} alt=""/>
            </CartButton>
            <Amount>{product.amount}</Amount>
            <CartButton
              onButtonClick={() => decreaseProductAmount(productIndex)}
              isActive={true}
              size={'large'}
            >
              <img src={minus} alt=""/>
            </CartButton>
          </AmountChange>
          <Image>
            <ItemImage src={gallery[this.state.imgId]} alt=""/>
            <RightArrow onClick={this.onRightArrowClick} src={arrow} alt=""/>
            <LeftArrow onClick={this.onLeftArrowClick} src={arrow} alt=""/>
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
})(CartItemCard);