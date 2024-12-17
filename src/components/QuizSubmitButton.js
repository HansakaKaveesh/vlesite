// src/components/QuizSubmitButton.js
import React from 'react';
import styles from './quiz.module.css';

const QuizSubmitButton = ({ onClick, disabled }) => {
    return (
        <button className={styles.submitButton} onClick={onClick} disabled={disabled}>
            Submit
        </button>
    );
};

export default QuizSubmitButton;
