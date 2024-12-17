// src/components/Quiz.js
"use client"; // This makes the component a Client Component

import { useEffect, useState } from 'react';
import styles from './quiz.module.css';
import QuizStartButton from './QuizStartButton';
import QuizSubmitButton from './QuizSubmitButton';
import QuizQuestion from './QuizQuestion';

const Quiz = ({ topic, lesson_number, subject }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [unansweredNotification, setUnansweredNotification] = useState(false); // State for unanswered question notification

    // Fetch syllabus and course level from localStorage when component mounts
    useEffect(() => {
        const storedSyllabus = localStorage.getItem('syllabus') || '';
        const storedCourseLevel = localStorage.getItem('courseLevel') || '';
        setSyllabus(storedSyllabus);
        setCourseLevel(storedCourseLevel);
    }, []);

    // Fetch quiz questions based on topic, lesson number, syllabus, and course level
    useEffect(() => {
        const fetchQuiz = async () => {
            if (!lesson_number || !quizStarted) return;

            setLoading(true);
            setError('');

            try {
                const response = await fetch(`/api/quizzes?topic=${topic}&lesson_number=${lesson_number}&syllabus=${syllabus}&courseLevel=${courseLevel}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                if (data.length > 0) {
                    setQuestions(data[0].questions);
                } else {
                    setError('No quiz found for the specified topic and lesson number.');
                }
            } catch (err) {
                setError(err.message || 'Error fetching quiz. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (syllabus && courseLevel) fetchQuiz();
    }, [quizStarted, topic, lesson_number, syllabus, courseLevel]);

    // Update user answers
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    // Calculate the quiz score, handle submission, and provide feedback on incorrect answers
    const calculateScore = async () => {
        const totalQuestions = questions.length;
        const correctAnswers = questions.filter(q => q.correctAnswer === userAnswers[q._id]).length;
        const incorrect = questions.filter(q => q.correctAnswer !== userAnswers[q._id]).map(q => ({
            questionText: q.questionText,
            selectedAnswer: userAnswers[q._id],
            correctAnswer: q.correctAnswer
        }));

        setIncorrectAnswers(incorrect); // Store the incorrect answers with details
        const percentage = Math.floor((correctAnswers / totalQuestions) * 100);
        setResult(`You scored ${percentage}%`);

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('You must be logged in to submit the quiz.');
            return;
        }

        // Prepare submission data for saving quiz results
        const submissionData = {
            userId,
            topic,
            subject,
            lesson_number,
            percentage,
            incorrectAnswers: incorrect, // Pass the full details here
        };

        try {
            const response = await fetch('/api/submitQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit quiz');
            }

            setResult(`Quiz submitted successfully! Your score: ${percentage}%`);
            
        } catch (error) {
            setError('Failed to save quiz result. Please try again.');
        }
    };

    // Check if all questions have been answered
    const allQuestionsAnswered = questions.every(question => userAnswers[question._id]);
    useEffect(() => {
        // Check for unanswered questions whenever userAnswers or questions change
        if (questions.length > 0) {
            setUnansweredNotification(!allQuestionsAnswered);
        }
    }, [questions, userAnswers]);

    return (
        <div className={styles.quizContainer}>
            {!quizStarted ? (
                <QuizStartButton onClick={() => setQuizStarted(true)} />
            ) : (
                <>
                    <h2 className={styles.quizTitle}>Quiz for Lesson {lesson_number}</h2>
                    {loading ? (
                        <div className={styles.loadingSpinner}>Loading quiz questions...</div>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : (
                        questions.length > 0 ? (
                            questions.map((question) => (
                                <QuizQuestion 
                                    key={question._id} 
                                    question={question} 
                                    userAnswers={userAnswers} 
                                    onAnswerChange={handleAnswerChange} 
                                    result={result} 
                                    incorrectAnswers={incorrectAnswers} 
                                />
                            ))
                        ) : (
                            <p>No questions available for this quiz.</p>
                        )
                    )}
                    <QuizSubmitButton 
                        onClick={calculateScore} 
                        disabled={loading || questions.length === 0 || !allQuestionsAnswered} 
                    />
                    {unansweredNotification && (
                        <p className={styles.unansweredNotification}>Please answer all questions before submitting.</p>
                    )}
                    {result && <p className={styles.result}>{result}</p>}
                </>
            )}
        </div>
    );
};

export default Quiz;
