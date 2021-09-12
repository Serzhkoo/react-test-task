import { v1 as uuidv1 } from 'uuid';

import { CurrencyType } from '../components/Header/HeaderCurrencyCart/HeaderCurrencyCart';

export type AttributesType = {
  [attributeId: string]: string
}

export type AddedProductType = {
  id: string
  productId: string
  attributes: AttributesType
  amount: number
}

type TemporaryProductType = {
  productId: string
  attributes: AttributesType
}

export type AttributeAndFirstItemIdType = {
  attributeId: string
  firstItemId: string
}

type AppReducerType = {
  currentCurrency: CurrencyType
  addedProducts: AddedProductType[]
  temporaryProduct: TemporaryProductType
}

type AppReducerActionsType =
  SetCurrencyActionType
  | SetInitialTempProductActionType
  | SetItemOfAttributeActionType
  | AddProductToCartActionType
  | IncreaseProductAmountActionType
  | DecreaseProductAmountActionType

type SetCurrencyActionType = {
  type: 'SET-CURRENCY'
  currency: CurrencyType
}

type SetInitialTempProductActionType = {
  type: 'SET-INITIAL-TEMP-PRODUCT'
  productId: string
  attributesAndFirstItemsId: AttributeAndFirstItemIdType[]
}

type SetItemOfAttributeActionType = {
  type: 'SET-ITEM-OF-ATTRIBUTE'
  attributeId: string
  itemId: string
}

type AddProductToCartActionType = {
  type: 'ADD-PRODUCT-TO-CART'
}

type IncreaseProductAmountActionType = {
  type: 'INCREASE-PRODUCT-AMOUNT'
  productIndex: number
}

type DecreaseProductAmountActionType = {
  type: 'DECREASE-PRODUCT-AMOUNT'
  productIndex: number
}

const initialState: AppReducerType = {
  currentCurrency: {
    currencyName: '',
    currencySymbol: ''
  },
  addedProducts: [],
  temporaryProduct: {
    productId: '',
    attributes: {}
  }
};

export const appReducer = (state: AppReducerType = initialState, action: AppReducerActionsType): AppReducerType => {
  switch (action.type) {
    case 'SET-CURRENCY':
      return {
        ...state,
        currentCurrency: { ...state.currentCurrency, ...action.currency }
      };
    case 'SET-INITIAL-TEMP-PRODUCT': {
      const initAttributes = {} as AttributesType;
      action.attributesAndFirstItemsId.forEach(elem => initAttributes[elem.attributeId] = elem.firstItemId);
      return {
        ...state,
        temporaryProduct: {
          ...state.temporaryProduct,
          productId: action.productId,
          attributes: { ...initAttributes }
        }
      };
    }
    case 'SET-ITEM-OF-ATTRIBUTE':
      return {
        ...state,
        temporaryProduct: {
          ...state.temporaryProduct,
          attributes: {
            ...state.temporaryProduct.attributes,
            [action.attributeId]: action.itemId
          }
        }
      };
    case 'ADD-PRODUCT-TO-CART': {
      const tempProductAttributes = state.temporaryProduct.attributes;
      const productIdInCart = state.addedProducts.findIndex(prod => {
        if (prod.productId !== state.temporaryProduct.productId) return false;
        for (let key in prod.attributes) {
          if (tempProductAttributes.hasOwnProperty(key)) {
            if (tempProductAttributes[key] !== prod.attributes[key]) return false;
          } else return false;
        }
        return true;
      });
      if (productIdInCart > -1) {
        return {
          ...state, addedProducts: state.addedProducts.map((prod, index) =>
            index === productIdInCart ? {
              ...prod,
              amount: prod.amount + 1
            } : prod
          )
        };
      } else {
        const newProdInCart: AddedProductType = {
          id: uuidv1(),
          productId: state.temporaryProduct.productId,
          attributes: { ...tempProductAttributes },
          amount: 1
        };
        return {
          ...state,
          addedProducts: [...state.addedProducts, newProdInCart]
        };
      }
    }
    case 'INCREASE-PRODUCT-AMOUNT':
      return {
        ...state,
        addedProducts: state.addedProducts.map((prod, index) => index === action.productIndex
          ? { ...prod, amount: prod.amount + 1 }
          : prod)
      };
    case 'DECREASE-PRODUCT-AMOUNT':
      if (state.addedProducts[action.productIndex].amount === 1) {
        return {
          ...state,
          addedProducts: state.addedProducts.filter((prod, index) => index !== action.productIndex)
        };
      } else {
        return {
          ...state,
          addedProducts: state.addedProducts.map((prod, index) => index === action.productIndex
            ? { ...prod, amount: prod.amount - 1 }
            : prod)
        };
      }
    default:
      return { ...state };
  }
};

export const setCurrencyAC = (currency: CurrencyType): SetCurrencyActionType => {
  return { type: 'SET-CURRENCY', currency } as const;
};
export const setInitialTempProductAC = (productId: string, attributesAndFirstItemsId: AttributeAndFirstItemIdType[]): SetInitialTempProductActionType => {
  return {
    type: 'SET-INITIAL-TEMP-PRODUCT',
    productId,
    attributesAndFirstItemsId
  } as const;
};
export const setItemOfAttributeAC = (attributeId: string, itemId: string): SetItemOfAttributeActionType => {
  return { type: 'SET-ITEM-OF-ATTRIBUTE', attributeId, itemId } as const;
};
export const addProductToCartAC = (): AddProductToCartActionType => {
  return { type: 'ADD-PRODUCT-TO-CART' } as const;
};
export const increaseProductAmountAC = (productIndex: number): IncreaseProductAmountActionType => {
  return { type: 'INCREASE-PRODUCT-AMOUNT', productIndex } as const;
};
export const decreaseProductAmountAC = (productIndex: number): DecreaseProductAmountActionType => {
  return { type: 'DECREASE-PRODUCT-AMOUNT', productIndex } as const;
};