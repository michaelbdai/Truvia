import AnswerListEntry from './AnswerListEntry.jsx'

const AnswerList = ({answers, answerListEntryClickHandler}) => (
  <div>
    {answers.map((answer, i) =>
      <AnswerListEntry answer={answer} key={i} id={i} answerListEntryClickHandler={answerListEntryClickHandler}/>
    )}
  </div>
);

export default AnswerList
