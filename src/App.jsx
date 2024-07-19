import GameTable from "./components/GameTable";
import Score from "./components/Score";
import GameTableContextProvider from "./contexts/GameTableContext";

function App () {
  return (
    <GameTableContextProvider>
      <div id="app">
        <h2>Tic-Tac-Toe</h2>
        <div className="game">
          <GameTable />
        </div>
      </div>
    </GameTableContextProvider>
  )
}

export default App;