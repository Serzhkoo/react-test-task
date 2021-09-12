import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Category from '../components/Category/Category';
import Cart from '../components/Cart/Cart';
import ProductCard from '../components/ProductCard/ProductCard';

type RoutesPropsType = {
  activeCategoryName: string
  currentCurrencySymbol: string
  currentCurrencyName: string
}

export class Routes extends React.PureComponent<RoutesPropsType> {
  render() {
    const { activeCategoryName, currentCurrencyName, currentCurrencySymbol } = this.props;

    return (
      <Switch>
        <Redirect exact from={'/'} to={'/category'}/>
        <Route exact path={'/category'} component={() =>
          <Category
            title={activeCategoryName}
            currentCurrencySymbol={currentCurrencySymbol}
            currentCurrencyName={currentCurrencyName}
          />}
        />
        <Route exact path={'/product-card/:productItem'}
               component={ProductCard}/>
        <Route exact path={'/cart'} component={Cart}/>
      </Switch>
    );
  }
}