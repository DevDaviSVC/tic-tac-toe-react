import useGameTable from "../hooks/useGameTable";

function Score () {
    const { score } = useGameTable();

    return (
        <div className="score">
            <div>
                <h2><i className="fas fa-times"></i>: {score[0]}</h2>
            </div>
            <div>
                <h2><i className="far fa-circle"></i>: {score[1]}</h2>
            </div>
        </div>
    )
}

export default Score;