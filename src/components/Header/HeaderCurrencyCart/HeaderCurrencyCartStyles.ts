import styled from 'styled-components';

export const Cart = styled.div`
      margin-left: 22px;
      cursor: pointer;
      position: relative;
    `;
export const CurrencySwitcher = styled.div`
      position: absolute;      
      background-color: #FFFFFF;
      width: 114px;
      top: 31px;
      left: -22px;
      box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
      z-index: 1;
    `;
export const Currencies = styled.div`
      margin: 10px 0;
    `;
export const Currency = styled.div`
      padding-left: 20px;
      padding-top: 15px;
      padding-bottom: 14px;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        background-color: #DAE1E8;
        transition: 0.3s;
      };
    `;
export const NumberOfItems = styled.div`
      background-color:#1D1F22;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      font-family: "Roboto", sans-serif;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      right: -12px;
      bottom: 35px;
    `;
export const BackDrop = styled.div`
      position: fixed;
      top: 78px;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(57, 55, 72, 0.22);
    `;
export const HeaderCurrencyCartDiv = styled.div`
      margin-top: 33px;
      display: flex;
      justify-content: flex-end;
      position: relative;
      font-weight: 500;
      font-size: 18px;  
    `;
export const CurrentCurrency = styled.div`
      cursor: pointer;
      display: flex;
    `;
export const Vector = styled.div<{areCurrenciesCollapsed: boolean}>`
      margin-left: 10px;
      img {
        margin-bottom: 2px;
        ${({areCurrenciesCollapsed}) => !areCurrenciesCollapsed && 'transform: scale(1, -1);'}
      }
    `;