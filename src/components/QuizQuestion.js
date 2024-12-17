import React from 'react';
import styles from './quiz.module.css';

const QuizQuestion = ({ question, userAnswers, onAnswerChange, result, incorrectAnswers = [] }) => {
    // Ensure incorrectAnswers is always an array to avoid errors
    const isIncorrect = incorrectAnswers.some(inc => inc.questionText === question.questionText);

    // Check if 'options' is defined and is an array
    const options = Array.isArray(question.options) ? question.options : [];

    return (
        <div className={styles.question}>
            <p>{question.questionText}</p>
            <div className={styles.options}>
                {options.length > 0 ? (
                    options.map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name={question._id}
                                value={option}
                                onChange={() => onAnswerChange(question._id, option)}
                                checked={userAnswers[question._id] === option}
                                aria-label={`Answer option for ${question.questionText}`}
                            />
                            {option}
                        </label>
                    ))
                ) : (
                    <p>No options available for this question.</p>
                )}
            </div>
            {result && isIncorrect && (
                <p className={styles.correctAnswer}>
                    Correct answer: {question.correctAnswer}
                </p>
            )}
        </div>
    );
};

export default QuizQuestion;
