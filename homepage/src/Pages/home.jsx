import { useState } from 'react';
import Header from '../components/header';
import QuestionCard from '../components/questioncard';
import Pagination from '../components/pagination';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const questions = [
    {
      question: 'How to join 2 columns in a dataset to make a separate column in SQL?',
      description: 'I do not know the code for it as I am a beginner. For example, column 1 contains First name and column 2 Last name...',
      tags: ['SQL', 'Beginner'],
      username: 'User Name',
      answers: 5,
    },
    {
      question: 'How to center a div in CSS?',
      description: 'Looking for a CSS-only solution to center a div both horizontally and vertically...',
      tags: ['CSS', 'HTML'],
      username: 'Jane Doe',
      answers: 3,
    },
    {
      question: 'Difference between let and var in JavaScript',
      description: 'What’s the actual difference and when should we use each?',
      tags: ['JavaScript'],
      username: 'John Smith',
      answers: 2,
    },
  ];

  return (
    <div>
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        {questions.map((q, i) => (
          <QuestionCard key={i} {...q} />
        ))}
        <Pagination
          totalPages={5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default Home;
