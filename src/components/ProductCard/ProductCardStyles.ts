import styled from 'styled-components';

export const Card = styled.div`
      margin-top: 160px;
      display: flex;
    `;
export const MiniImages = styled.div`
      width: 80px;
      margin-right: 40px;
      img {
        margin-bottom: 40px;
        display: block;
        width: 80px;
        height: 80px;
        object-fit: cover;
        cursor: pointer;
      };
    `;
export const Image = styled.div`
      max-width: 670px;
      flex: 1 1 auto;
      text-align: center;
      img {
        max-width: 100%;
        height: auto;
      };
    `;
export const Description = styled.div`
      width: 292px;
      margin-left: 40px;
    `;
export const Brand = styled.div`
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 7px;
    `;
export const Name = styled.div`
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 38px;     
    `;
export const Attribute = styled.div`
      font-family: "Roboto Condensed", sans-serif;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
    `;
export const AttributeSelection = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, 63px);
      grid-column-gap: 12px;
      grid-row-gap: 12px;
      margin-bottom: 39px;
    `;
export const Price = Attribute;
export const PriceValue = styled.div`
      font-size: 24px;
      font-weight: 700;
      margin-top: 15px;
      margin-bottom: 28px;
    `;
export const OutOfStock = styled.div`
      font-size: 30px;
      font-weight: 400;
    `;
export const TextDescription = styled.div`
      font-family: "Roboto", sans-serif;
      font-size: 16px;
      line-height: 26px;
      margin-top: 37px;
    `;