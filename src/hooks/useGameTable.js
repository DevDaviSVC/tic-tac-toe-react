import { useContext } from "react"
import { GameTableContext } from "../contexts/GameTableContext";

export default function useGameTable () {
    const GameTable = useContext(GameTableContext);
    return GameTable;
}