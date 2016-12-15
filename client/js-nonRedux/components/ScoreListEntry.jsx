const ScoreListEntry = ({score, id}) => (
  <div className="player background-shadow">
    <div className="rank" >{score.rank}</div>
    <div className="name" >{score.name}</div>
    <div className="score" >{score.score}</div>
    <div className="total" >{score.total}</div>
  </div>
);

export default ScoreListEntry
