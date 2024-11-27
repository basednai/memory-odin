export default function Score({score, best}) {

    return <div className="score">
        <h3>Score: {score}</h3>
        <br/>
        <h3>Best: {best}</h3>
    </div>

}