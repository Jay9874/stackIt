const QuestionCard = ({ question, description, tags, username, answers }) => {
  return (
    <div className="bg-white p-4 border rounded shadow-sm mb-4">
      <h2 className="text-lg font-semibold mb-1">{question}</h2>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <div className="flex gap-2 flex-wrap mb-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <div className="text-sm flex justify-between text-gray-600">
        <span>Posted by: {username}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{answers} ans</span>
      </div>
    </div>
  );
};

export default QuestionCard;
