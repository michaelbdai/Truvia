const AnswerListEntry = ({answer, id}) => (
  <div className="answer background-shadow">{(id + 1) + ". " + answer}</div>
);

export default AnswerListEntry
