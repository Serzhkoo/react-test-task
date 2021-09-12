import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import circleIcon from '../../../assets/Circle Icon.svg';
import { ProductType } from '../Category';
import {
  CircleIcon,
  Item,
  ItemContent,
  ItemImg,
  Name,
  OutOfStock,
  Price,
  Text
} from './ItemCardStyles';

type ItemCardPropsType = {
  product: ProductType
  currentCurrencySymbol: string
  currentCurrencyName: string
}

class ItemCard extends React.PureComponent<ItemCardPropsType & RouteComponentProps> {
  onItemClick = () => {
    const { history, product } = this.props;
    history.push(`/product-card/${product.id}`);
  };

  render() {
    const { product, currentCurrencyName, currentCurrencySymbol } = this.props;
    const price = product.prices.find(price => price.currency === currentCurrencyName);
    const amount = price ? price.amount.toFixed(2) : 'Choose another currency';

    return (
      <Item onClick={this.onItemClick}>
        <ItemContent>
          <ItemImg>
            <img src={product.gallery[0]} alt=""/>
          </ItemImg>
          <Name>{product.brand + ' ' + product.name}</Name>
          <Price>{currentCurrencySymbol + amount}</Price>
          {product.inStock &&
          <CircleIcon>
            <img src={circleIcon} alt=""/>
          </CircleIcon>}
        </ItemContent>
        {!product.inStock &&
        <OutOfStock>
          <Text>
            OUT OF STOCK
          </Text>
        </OutOfStock>}
      </Item>
    );
  }
}

export default withRouter(ItemCard);
