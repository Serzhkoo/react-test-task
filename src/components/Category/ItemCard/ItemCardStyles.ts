import styled from 'styled-components';

export const CircleIcon = styled.div`
      visibility: hidden;
      opacity: 0;
      position: absolute;
      bottom: 68px;
      right: 33px;
      transition: 0.3s;      
      img {
        border-radius: 50%;
        transition: 0.3s;
      };
    `;
export const Item = styled.div`      
      width: 386px;
      font-size: 18px;
      position: relative;
      cursor: default;
      transition: 0.3s;
      :hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        transition: 0.3s;
        ${CircleIcon} {          
          visibility: visible;
          opacity: 1;
        };
      };    
    `;
export const ItemContent = styled.div`
      padding: 16px;
    `;
export const ItemImg = styled.div`
      width: 354px;
      height: 330px;
      img {
        object-fit: cover;
        max-width: 354px;
        max-height: 330px;
      }   
    `;
export const Name = styled.div`
      padding-top: 28px;
      font-weight: 300;
    `;
export const Price = styled.div`
      padding-top: 8px;
      padding-bottom: 4px;
      font-weight: 500;  
    `;
export const Text = styled.div`
      font-size: 24px;
      color: #8D8F9A;
      margin-top: 167px;
      margin-left: 106px;      
    `;
export const OutOfStock = styled.div`
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;  
      width: 386px;
      height: 444px;
      bottom: 0;
    `;