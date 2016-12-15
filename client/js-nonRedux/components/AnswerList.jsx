// import AnswerListEntry from './AnswerListEntry.jsx'
const AnswerListEntry = ({answer, id, answerListEntryClickHandler}) => (
  <div 
  	className="answer background-shadow" 
  	onClick={e => answerListEntryClickHandler(e, id)} 
  >
  	{(id + 1) + ". " + answer}
  </div>
);

const AnswerList = ({answers, answerListEntryClickHandler}) => (
  <div>
    {answers.map((answer, i) =>
      <AnswerListEntry answer={answer} key={i} id={i} answerListEntryClickHandler={answerListEntryClickHandler}/>
    )}
  </div>
);

export default AnswerList
