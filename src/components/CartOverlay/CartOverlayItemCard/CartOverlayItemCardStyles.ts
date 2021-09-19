import styled from 'styled-components';

export const ItemCard = styled.div`
      min-height: 137px;
      padding: 21px 0;
      display: flex;
      justify-content: center;
    `;
export const Product = styled.div`
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    `;
export const ImageAndAmount = styled.div`
      flex: 1 1 50%;
      display: flex;
      justify-content: flex-end;      
    `;
export const Brand = styled.div`
      font-weight: 300;
      padding-top: 2px;
      padding-bottom: 8px;
    `;
export const Name = styled.div`
      font-weight: 300;
      padding-bottom: 9px;
    `;
export const Price = styled.div`
      font-weight: 500;
      flex: 1 1 auto;
    `;
export const Attributes = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, 24px);
      grid-column-gap: 8px;
      grid-row-gap: 5px;
      margin-top: 10px;
    `;
export const Label = styled.div`
      margin-top: 12px;
      font-size: 12px;
    `;
export const AmountChange = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `;
export const Image = styled.div`
      margin-left: 10px;
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 105px;
        max-height: 137px;
        object-fit: cover;        
      };
    `;
export const Amount = styled.div`
      font-size: 16px;
      font-weight: 500;
    `;