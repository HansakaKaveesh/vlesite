// src/components/QuizStartButton.js
import React from 'react';
import styles from './quiz.module.css';

const QuizStartButton = ({ onClick }) => {
    return (
        <button className={styles.startButton} onClick={onClick}>
            Start Quiz
        </button>
    );
};

export default QuizStartButton;
