import { createContext, useEffect, useState } from "react";
import TableSquare from "../entities/TableSquare";

export const GameTableContext = createContext();

export default function GameTableContextProvider ({children}) {
    // Gerando matriz default

    const defaultMatriz =  [
        [],
        [],
        []
    ]

    let squareId = 0;

    for (let i = 0; i < 3; i++) {
        for (let l = 0; l < 3; l++) {
            squareId++
            defaultMatriz[i].push(new TableSquare(squareId, {line: i, linePosition: l}))
        }
    }

    //////////////////////////////

    const [matriz, setMatriz] = useState(defaultMatriz);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [score, setScore] = useState([0, 0]);
    const [timesPlayed, setTimesPlayed] = useState(0);

    const showWinner = (winnerValue) => {
        let winner;

        if (typeof winnerValue === 'number') {
            if (winnerValue === 1) {
                winner = "X";
            } else if (winnerValue === 2) {
                winner = "O";
            }
    
            alert(`O jogador ${winner} ganhou!`);
            setScore(currentState => {
                let updatedState = [...currentState];
                updatedState[winnerValue - 1]++;
                return updatedState;
            });
        } else {
            alert(winnerValue);
        }
       
        setTimesPlayed(0);
        setCurrentPlayer(1);
        setMatriz(defaultMatriz);
    }

    const switchCurrentPlayer = () => {
        if (currentPlayer == 1) {
            setCurrentPlayer(2);
        } else {
            setCurrentPlayer(1);
        }
    }

    function verifyWinner () {
        for (let i = 0; i < 3; i++) {
            // Análise Horizontal
            if ((matriz[i][0].value == matriz[i][1].value) && (matriz[i][0].value == matriz[i][2].value)) {
                if (matriz[i][0].value > 0) {
                    return [true, matriz[i][0].value];
                }
            }

            // Análise Vertical
            if ((matriz[0][i].value == matriz[1][i].value) && (matriz[0][i].value == matriz[2][i].value)) {
                if (matriz[0][i].value > 0) {
                    return [true, matriz[0][i].value];
                }
            }
        }

        // Análise Diagonal
        if ((matriz[0][0].value == matriz[1][1].value) && (matriz[0][0].value == matriz[2][2].value)) {
            if (matriz[0][0].value > 0) {
                return [true, matriz[0][0].value];
            }
        }

        if ((matriz[0][2].value == matriz[1][1].value) && (matriz[0][2].value == matriz[2][0].value)) {
            if (matriz[0][2].value > 0) {
                return [true, matriz[0][2].value];
            }
        }

        // Verificar velha
        if (timesPlayed === 9) {
            return [true, "Nenhum ganhador!"];
        }

        return [false]
    }

    useEffect(() => {
        setTimesPlayed(currentState => currentState + 1);
        let winnerMessage = verifyWinner();
        if (winnerMessage[0]) {
            showWinner(winnerMessage[1]);
        }
    }, [matriz]);

    const fillMatriz = ({ line, linePosition }) => {
        setMatriz(currentState => {
            let updatedState = [...currentState];
            let square = updatedState[line][linePosition];
            if (square.value === 0) {
                updatedState[line][linePosition].value = currentPlayer;
            }
            return updatedState;
        })
    }

    const GameTable = {
        matriz,
        fillMatriz,
        currentPlayer,
        switchCurrentPlayer,
        score
    }

    return (
        <GameTableContext.Provider value={GameTable}>
            {children}
        </GameTableContext.Provider>
    )
}