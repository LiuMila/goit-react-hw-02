import { useState } from "react";
import PropTypes from 'prop-types';
import './App.css'

// Компонент для відображення кнопок опцій
const Options = ({ updateFeedback, totalFeedback }) => {
  return (
    <div>
      <button onClick={() => updateFeedback("good")}>Good</button>
      <button onClick={() => updateFeedback("neutral")}>Neutral</button>
      <button onClick={() => updateFeedback("bad")}>Bad</button>
      {totalFeedback > 0 && (
        <button onClick={() => updateFeedback("reset")}>Reset</button>
      )}
    </div>
  );
};


// Компонент для відображення статистики фідбеку
const Feedback = ({ feedback, totalFeedback, positiveFeedback }) => {
  return (
    <div>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positiveFeedback}%</p>
    </div>
  );
};


// Основний компонент застосунку
const App = () => {
  // Ініціалізація стану з localStorage або з нуля
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  // Оновлюємо стан і записуємо його у localStorage
  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      const resetFeedback = { good: 0, neutral: 0, bad: 0 };
      setFeedback(resetFeedback);
      localStorage.setItem("feedback", JSON.stringify(resetFeedback));
    } else {
      setFeedback((prevFeedback) => {
        const updatedFeedback = {
          ...prevFeedback,
          [feedbackType]: prevFeedback[feedbackType] + 1,
        };
        localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
        return updatedFeedback;
      });
    }
  };

  // Підрахунок загальної кількості фідбеку
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  // Підрахунок відсотка позитивних фідбеків
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <h1>Sip Happens Café</h1>
      <p>Please leave your feedback about our service by selecting one of the options below.</p>
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  );
};




Options.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number.isRequired, 
};

Feedback.propTypes = {
  feedback: PropTypes.shape({
    good: PropTypes.number.isRequired,  
    neutral: PropTypes.number.isRequired,  
    bad: PropTypes.number.isRequired,  
  }).isRequired,
  totalFeedback: PropTypes.number.isRequired,  
  positiveFeedback: PropTypes.number.isRequired, 
};

export default App;
