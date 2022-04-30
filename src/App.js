import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import { GameContext } from "./components/GameProvider";
import Inbox from "./components/Inbox";
import Drawing from "./views/Drawing";
import Lobby from "./views/Lobby";
import Waiting from "./views/Waiting";
import Welcome from "./views/Welcome";
import WordChoosing from "./views/WordChoosing";

function App() {
  const { gameState } = useContext(GameContext)
  const [isInboxVisible, setIsInboxVisible] = useState(false)

  const renderValidRoute = (condition, element) => {
    if (!condition) return element
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    if (!!gameState.incomingDrawing.drawing) setIsInboxVisible(true)
  }, [gameState])

  return (
    <div className="App">
      <BrowserRouter>
        <Card>
          <Routes>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/word-choosing" exact element={renderValidRoute(gameState.nickname === "" || gameState.rival === null, <WordChoosing />)} />
            <Route path="/lobby" exact element={renderValidRoute(gameState.nickname === "", <Lobby />)} />
            <Route path="/drawing" exact element={renderValidRoute(gameState.nickname === "" || gameState.selectedWord === null, <Drawing />)} />
            <Route path="/waiting" exact element={renderValidRoute(gameState.nickname === "", <Waiting />)} />
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
