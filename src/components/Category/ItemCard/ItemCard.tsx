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
import { AttributeAndFirstItemIdType } from '../../../redux/app-reducer';

type ItemCardPropsType = {
  product: ProductType
  onCartClick: (productId: string, attributesAndFirstItemsId: AttributeAndFirstItemIdType[]) => void
  currentCurrencySymbol: string
  currentCurrencyName: string
}

class ItemCard extends React.PureComponent<ItemCardPropsType & RouteComponentProps> {
  onItemClick = () => {
    const { history, product } = this.props;
    history.push(`/product-card/${product.id}`);
  };

  onCartClick = (event: any) => {
    event.stopPropagation();
    const { onCartClick, product } = this.props;
    const attributesAndFirstItemsId = product.attributes.map(attribute => ({
      attributeId: attribute.id,
      firstItemId: attribute.items[0].id
    }));
    onCartClick(product.id, attributesAndFirstItemsId);
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
            <img src={circleIcon} alt="" onClick={this.onCartClick}/>
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
