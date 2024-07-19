import useGameTable from "../hooks/useGameTable"
import Score from "./Score";

export default function GameTable() {
    const { matriz, fillMatriz, currentPlayer, switchCurrentPlayer } = useGameTable();


    const showValue = (value) => {
        if (value === 1) {
            return "fas fa-times"
        } else if (value === 2) {
            return "far fa-circle"
        }

        return ""
    }

    const handleClick = ({ line, linePosition }) => {
        fillMatriz({ line, linePosition });
        switchCurrentPlayer();
    }

    return (
        <>
            <div className="visor">
                Vez do jogador: <i className={showValue(currentPlayer)}></i>
            </div>
            <div className="table-wrapper">
                <div className="game-table">
                    {matriz.map(line => {
                        return (
                            <div key={matriz.indexOf(line)} className="table-row">
                                {line.map(square => {
                                    return (
                                        <div
                                            key={square.id}
                                            className="cell"
                                            onClick={() => handleClick(square.position)}
                                        >
                                            <i className={showValue(square.value)}></i>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <Score />
            </div>
        </>
    )
}