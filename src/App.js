import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import { GameContext } from "./components/GameProvider";
import Inbox from "./components/Inbox";
import Drawing from "./views/Drawing";
import GameEnded from "./views/GameEnded";
import Lobby from "./views/Lobby";
import Waiting from "./views/Waiting";
import Welcome from "./views/Welcome";
import WordChoosing from "./views/WordChoosing";

function App() {
  const { gameState } = useContext(GameContext)
  const [isInboxVisible, setIsInboxVisible] = useState(false)

  useEffect(() => {
    if (!!gameState.incomingDrawing.drawing) setIsInboxVisible(true)
  }, [gameState])

  return (
    <div className="App">
      <BrowserRouter>
        <Card>
          <Routes>
            <Route path="/" element={<Welcome />} />
            {
              gameState.nickname !== "" && (
                <>
                <Route path="/word-choosing" element={<WordChoosing />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/drawing" element={<Drawing />} />
                <Route path="/waiting" element={<Waiting />} />
                <Route path="/game-ended" element={<GameEnded />} />
                </>
              )
            }
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Card>
        {
          !!isInboxVisible && <Inbox setIsInboxVisible={setIsInboxVisible} />
        }
      </BrowserRouter>

    </div>
  );
}

export default App;
