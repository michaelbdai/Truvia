const AnswerListEntry = ({answer, id, answerListEntryClickHandler}) => (
  <div className="answer background-shadow" onClick={e => answerListEntryClickHandler(e, id)} >{(id + 1) + ". " + answer}</div>
);

export default AnswerListEntry
