import { useState, useEffect } from "react";
import {Description} from './Description/Description.jsx';
import  Options  from './Options/Options.jsx';
import { Feedback } from './Feedback/Feedback.jsx';
import  Notification from './Notification/Notification.jsx';


const App = () => {
  const savedFeedback = JSON.parse(localStorage.getItem('feedback')) || { good: 0, neutral: 0, bad: 0 };
  const [feedback, setFeedback] = useState(savedFeedback);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      const resetFeedback = { good: 0, neutral: 0, bad: 0 };
      setFeedback(resetFeedback);
    } else {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [feedbackType]: prevFeedback[feedbackType] + 1,
      }));
    }
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />
      {totalFeedback === 0 ? (
        <Notification message="No feedback given yet" />
      ) : (
        <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
      )}
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
    </div>
  );
};

export default App;
