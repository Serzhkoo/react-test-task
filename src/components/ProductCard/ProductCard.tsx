import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import parse from 'html-react-parser';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ChildProps, graphql } from '@apollo/react-hoc';

import { AttributeButton } from '../Buttons/AttributeButton';
import { Button } from '../Buttons/Button';
import { PriceType } from '../Category/Category';
import { productQuery } from '../../common/queries';
import { SwatchAttributeButton } from '../Buttons/SwatchAttributeButton';
import { AppRootStateType } from '../../redux/store';
import {
  addProductToCartAC,
  AttributeAndFirstItemIdType,
  AttributesType,
  setInitialTempProductAC,
  setItemOfAttributeAC
} from '../../redux/app-reducer';
import {
  Attribute,
  AttributeSelection,
  Brand,
  Card,
  Description,
  Image,
  MiniImages,
  Name,
  OutOfStock,
  Price,
  PriceValue,
  TextDescription
} from './ProductCardStyles';

type PathParamsType = {
  productItem: string
}

type MapStateToProps = {
  currentCurrencySymbol: string
  currentCurrencyName: string
  stateAttributes: AttributesType
}

type MapDispatchToProps = {
  setInitialTempProductAC: (id: string, attributesAndFirstItemsId: AttributeAndFirstItemIdType[]) => void
  setItemOfAttributeAC: (attributeId: string, itemId: string) => void
  addProductToCartAC: () => void
}

type InputPropsType =
  RouteComponentProps<PathParamsType>
  & MapStateToProps
  & MapDispatchToProps;

type AttributeItemType = {
  displayValue: string
  id: string
  value: string
}

export type AttributeType = {
  id: string
  name: string
  type: string
  items: AttributeItemType[]
}

type ResponseType = {
  product: {
    id: string
    name: string
    gallery: string[]
    description: string
    inStock: boolean
    attributes: AttributeType[]
    prices: PriceType[]
    brand: string
  }
};

type StateType = {
  imgId: number
}

class ProductCard extends React.PureComponent<ChildProps<InputPropsType, ResponseType>, StateType> {
  constructor(props: ChildProps<InputPropsType, ResponseType>) {
    super(props);
    this.state = {
      imgId: 0
    };
  }

  componentDidUpdate(prevProps: Readonly<ChildProps<InputPropsType, ResponseType>>, prevState: Readonly<StateType>): void {
    const { data, setInitialTempProductAC } = this.props;

    if (prevProps.data && prevProps.data.loading && data && !data.loading && data.product) {
      const { id, attributes } = data.product;
      const attributesAndFirstItemsId = attributes.map(attribute => ({
        attributeId: attribute.id,
        firstItemId: attribute.items[0].id
      }));
      setInitialTempProductAC(id, attributesAndFirstItemsId);
    }
  }

  setImgId = (imgId: number) => {
    this.setState({ imgId });
  };

  render() {
    const { data, currentCurrencySymbol, currentCurrencyName, stateAttributes, setItemOfAttributeAC, addProductToCartAC } = this.props;
    const product = data && data.product ? data.product : undefined;

    if (!product) return <div>Loading...</div>;

    const { id, name, gallery, description, inStock, attributes, brand, prices } = product;
    const price = prices.find(price => price.currency === currentCurrencyName);
    const amount = price ? price.amount.toFixed(2) : 'Choose another currency';

    return (
      <Card>
        <MiniImages>
          {gallery.map((img, index) =>
            <img key={img}
                 src={img}
                 alt=""
                 onClick={() => this.setImgId(index)}
            />)}
        </MiniImages>
        <Image>
          <img src={gallery[this.state.imgId]} alt=""/>
        </Image>
        <Description>
          <Brand>{brand}</Brand>
          <Name>{name}</Name>
          {attributes.length !== 0 && attributes.map(attribute =>
            <div key={attribute.id + id}>
              <Attribute>{attribute.name.toUpperCase()}:</Attribute>
              <AttributeSelection>
                {attribute.items.map(item =>
                  attribute.type === 'text'
                    ? <AttributeButton
                      key={item.id + id}
                      onButtonClick={() => setItemOfAttributeAC(attribute.id, item.id)}
                      isActive={inStock}
                      isSelected={inStock && (item.id === stateAttributes[attribute.id])}
                    >{item.value}
                    </AttributeButton>
                    : <SwatchAttributeButton
                      key={item.id}
                      size={'large'}
                      onButtonClick={() => setItemOfAttributeAC(attribute.id, item.id)}
                      isActive={inStock}
                      isSelected={inStock && (item.id === stateAttributes[attribute.id])}
                      color={item.value}
                    />)}
              </AttributeSelection>
            </div>)}
          <Price>PRICE</Price>
          <PriceValue>{currentCurrencySymbol + amount}</PriceValue>
          {inStock
            ? <Button
              onButtonClick={addProductToCartAC}
              type={'primary'}
              width={292}
              height={52}
              fontSize={16}
            >ADD TO CART</Button>
            : <OutOfStock>OUT OF STOCK</OutOfStock>}
          <TextDescription>
            {parse(description)}
          </TextDescription>
        </Description>
      </Card>
    );
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
  return {
    currentCurrencyName: state.app.currentCurrency.currencyName,
    currentCurrencySymbol: state.app.currentCurrency.currencySymbol,
    stateAttributes: state.app.temporaryProduct.attributes
  };
};

export default compose<ComponentType>(
  withRouter,
  graphql<InputPropsType, ResponseType>(productQuery, {
    options: props => ({
      fetchPolicy: 'no-cache',
      variables: {
        title: props.match.params.productItem
      }
    })
  }),
  connect(mapStateToProps, {
    setInitialTempProductAC,
    setItemOfAttributeAC,
    addProductToCartAC
  })
)(ProductCard);
