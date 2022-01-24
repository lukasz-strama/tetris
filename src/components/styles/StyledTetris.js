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
    position: absolute;
    width: 50px;
    height: 150px;
    border-radius: 0px 15px 15px 0px;
    top: 50px;
    left: 100%;
    padding: 20px;
    background-image: linear-gradient(#010104, #02010E);
  }
`;

export const StyledOverlay = styled.div`
  width: 100vw;
  position: absolute;
  height: 100vh;
`;

export const OverlayBottomAction= styled.div`
  position: absolute;
  height: 100px;
  width: 100%;
  text-align: center;
  top: calc(100% - 100px);
`;

export const OverlayMainAction= styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledStartGame = styled.h1`
  font-family: Nova Square; 
  color: #fff;
  letter-spacing: 2px;
  text-align: center;
  margin: 0;
`;