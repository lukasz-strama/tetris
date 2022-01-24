import styled from 'styled-components';
// BG Image
import bgImage from '../../img/bg.jpg';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0,0,0);
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetrisBackground = styled.div`
  width: 100vw;
  position: absolute;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  opacity: .2;
  overflow: hidden;
`;

export const StyledTetrisH1 = styled.h1`
  font-family: Nova Square; 
  color: #fff;
  letter-spacing: 2px;
  font-size: 40px;
  margin: 0 0 10px 0;
  text-align: center;
`;

export const StyledTetrisBoard = styled.div`
  width: 100vw;
  position: absolute;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTetris = styled.div`
  padding: 20px;
  background-image: linear-gradient(#000, #030023);
  position: absolute;
  border-radius: 15px;
  aside {
    width: 70px;
    display: block;
    padding: 0 20px;
    background: #000;
  }
`;
