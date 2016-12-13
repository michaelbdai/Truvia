import ScoreListEntry from './ScoreListEntry.jsx'

const ScoreList = ({scores}) => (
  <div>
    <div className="headers background-shadow">
      <div className="rank" >Rank</div>
      <div className="name" >Player</div>
      <div className="score" >Score</div>
      <div className="total" >Total</div>
    </div>
    {scores.map((score, i) =>
      <ScoreListEntry score={score} key={i} id={i} />
    )}
  </div>
);

export default ScoreList
