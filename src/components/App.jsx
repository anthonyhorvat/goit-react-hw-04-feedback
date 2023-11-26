import React, { useState } from 'react';
import Statistic from './Feedback/Statistic/Statistic';
import FeedbackOptions from './Feedback/FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Feedback/Notification/Notification';
import { StyledContainer } from './App.styled';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleLeaveFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };
  const countTotalFeedback = () => {
    const feedbackValues = Object.values(feedback);
    const totalFeedback = feedbackValues.reduce(
      (total, value) => total + value,
      0
    );

    return totalFeedback;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };
  const total = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();
  const feedbackOptions = Object.keys(feedback);

  return (
    <StyledContainer>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>
      <Section>
        {total === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Statistic
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        )}
      </Section>
    </StyledContainer>
  );
};
