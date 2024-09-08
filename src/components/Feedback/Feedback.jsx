import PropTypes from 'prop-types';

// Компонент для відображення статистики фідбеку
export const Feedback = ({ feedback, totalFeedback, positiveFeedback }) => {
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

Feedback.propTypes = {
  feedback: PropTypes.shape({
    good: PropTypes.number.isRequired,  
    neutral: PropTypes.number.isRequired,  
    bad: PropTypes.number.isRequired,  
  }).isRequired,
  totalFeedback: PropTypes.number.isRequired,  
  positiveFeedback: PropTypes.number.isRequired, 
};

