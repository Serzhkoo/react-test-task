import { gql } from '@apollo/client';

export const categoriesQuery = gql`
  query {
    categories {
      name
    }
    currencies
  }
`;

export const productsQuery = gql`
  query ProductsQuery($title: String!) {
    category(input: {title: $title}) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency
          amount
        }
        brand
      }
    }
  }
`;

export const productQuery = gql`
  query ProductQuery($title: String!) {
    product(id: $title) {
      id
      name
      gallery
      description
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
`;

export const pricesQuery = gql`
  query {
    categories {
      products {
        id
        prices {
          currency
          amount
        }
      }
    }
  }
`;