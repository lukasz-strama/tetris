import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, OverlayBottomAction, OverlayMainAction, StyledStartGame, StyledTetris, StyledOverlay, StyledTetrisH1, StyledTetrisBackground, StyledTetrisBoard } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if(!gameStart) {
      if (keyCode === 32) {
        setGameStart(true);
        startGame();
      }
    }

    if(gameOver) {
      if (keyCode === 32) {
        startGame();
      }
    }

    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 83) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // move the tetromino downwards
    setDropTime(null);
    drop();
  };

  // This one starts the game
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 65) {
        movePlayer(-1);
      } else if (keyCode === 68) {
        movePlayer(1);
      } else if (keyCode === 83) {
        dropPlayer();
      } else if (keyCode === 32) {
        playerRotate(stage, 1);
      }
    }
    
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetrisBackground/>
      
      <StyledTetrisBoard>
        <StyledTetris>
          <StyledTetrisH1 style={{"font-size": 40}}><span style={{color: "#DB0000"}}>T</span><span style={{color: "#FF7A00"}}>E</span><span style={{color: "#FCD400"}}>T</span><span style={{color: "#267800"}}>R</span><span style={{color: "#007CC2"}}>I</span><span style={{color: "#9900CF"}}>S</span></StyledTetrisH1>
          <Stage stage={stage} />
          <aside>
            <StyledTetrisH1 style={{"font-size": 20}}>Dalej</StyledTetrisH1>
          </aside>
        </StyledTetris>
        <StyledTetris style={{left: "calc(100% - 300px)"}}>
          <StyledTetrisH1 style={{"font-size": 25}}><span style={{color: "#DB0000"}}>W</span><span style={{color: "#FF7A00"}}>y</span><span style={{color: "#FCD400"}}>n</span><span style={{color: "#267800"}}>i</span><span style={{color: "#007CC2"}}>k</span></StyledTetrisH1>
          <StyledTetrisH1 style={{"font-size": 35}}>{score}</StyledTetrisH1>
        </StyledTetris>
        
      </StyledTetrisBoard>
      {gameOver ? (
            <StyledOverlay style={{background: "rgba(92, 0, 0, .8)"}}>
              <OverlayMainAction>
                <StyledTetrisH1 style={{"font-size": 100}}>Przegrałeś</StyledTetrisH1>
                <StyledTetrisH1 style={{"font-size": 50}}><span style={{color: "#DB0000"}}>W</span><span style={{color: "#FF7A00"}}>y</span><span style={{color: "#FCD400"}}>n</span><span style={{color: "#267800"}}>i</span><span style={{color: "#007CC2"}}>k</span><span style={{color: "#9900CF"}}>:</span> {score}</StyledTetrisH1>
              </OverlayMainAction>
              <OverlayBottomAction>
                <StyledStartGame style={{"font-size": 40}}>Rozpocznij od nowa</StyledStartGame>
                <StyledStartGame style={{"font-size": 20}}>(Spacja)</StyledStartGame>
              </OverlayBottomAction>
            </StyledOverlay>
        ):null}
        {gameStart ? null : (
          <StyledOverlay style={{background: "rgba(0, 0, 0, .8)"}}>
            <OverlayMainAction>
              <StyledTetrisH1 style={{"font-size": 140}}><span style={{color: "#DB0000"}}>T</span><span style={{color: "#FF7A00"}}>E</span><span style={{color: "#FCD400"}}>T</span><span style={{color: "#267800"}}>R</span><span style={{color: "#007CC2"}}>I</span><span style={{color: "#9900CF"}}>S</span></StyledTetrisH1>
            </OverlayMainAction>
            <OverlayBottomAction>
              <StyledStartGame style={{"font-size": 40}}>Rozpocznij grę</StyledStartGame>
              <StyledStartGame style={{"font-size": 20}}>(Spacja)</StyledStartGame>
            </OverlayBottomAction>
          </StyledOverlay>
        )}
    </StyledTetrisWrapper>
  );
};
/*{gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
      <Display text={`rows: ${rows}`} />
      <Display text={`Level: ${level}`} />
              </div>
            )}
                  <StartButton callback={startGame} />
*/
export default Tetris;
