import styled from 'styled-components';

export const ItemCard = styled.div`
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #E5E5E5;
      min-height: 225px;
    `;
export const Product = styled.div`
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      margin: 16px 0;
    `;
export const Brand = styled.div`
      font-size: 30px;
      font-weight: 600;      
      margin-bottom: 8px;
    `;
export const Name = styled.div`
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 16px;    
    `;
export const Price = styled.div`
      font-size: 24px;
      font-weight: 700;
      flex: 1 1 auto;
    `;
export const Attributes = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, 63px);
      grid-column-gap: 12px;
      margin-top: 15px;
    `;
export const Label = styled.div`
      margin-top: 16px;
    `;
export const ImageAndAmount = styled.div`
      display: flex;
      justify-content: flex-end;
      margin: 20px 0;
    `;
export const AmountChange = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `;
export const Amount = styled.div`
      font-size: 24px;
      font-weight: 500;
    `;
export const Image = styled.div`
      margin-left: 12px;
      position: relative;
      display: flex;
      align-items: center;
      img {
        display: block;                
      };
    `;
export const ItemImage = styled.img`
        width: 141px;
        max-height: 185px;
        object-fit: cover;
    `;
export const RightArrow = styled.img`
      position: absolute;
      cursor: pointer;
      top: 87px;
      right: 8px;
    `;
export const LeftArrow = styled.img`
      position: absolute;
      cursor: pointer;
      top: 87px;
      right: 125px;
      transform: rotate(180deg);
    `;