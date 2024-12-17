"use client";

import { useState, useEffect } from "react";
import styles from "./subjectQuiz.module.css";
import QuizQuestion from "./QuizQuestion";
import QuizSubmitButton from "./QuizSubmitButton";

const SubjectQuiz = ({ userId, subject }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    // Retrieve selected syllabus and course level
    const selectedSyllabus = localStorage.getItem("syllabus") || "";
    const selectedCourseLevel = localStorage.getItem("courseLevel") || "";

    useEffect(() => {
        const fetchSubjectQuiz = async () => {
            setLoading(true);
            setError("");

            if (!selectedSyllabus || !selectedCourseLevel) {
                setError("Please select a syllabus and course level.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `/api/subjectQuizzes?subject=${subject}&syllabus=${selectedSyllabus}&courseLevel=${selectedCourseLevel}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch subject quiz");
                }
                const data = await response.json();
                if (!data.questions?.length) {
                    throw new Error("No questions available for this subject.");
                }
                setQuestions(data.questions || []);
            } catch (err) {
                setError(err.message || "Error fetching subject quiz. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectQuiz();
    }, [subject, selectedSyllabus, selectedCourseLevel]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const calculateScore = async () => {
        const totalQuestions = questions.length;
        const correctAnswers = questions.filter((q) => q.correctAnswer === userAnswers[q._id]).length;
        const incorrect = questions.filter((q) => q.correctAnswer !== userAnswers[q._id]).map((q) => ({
            questionText: q.questionText,
            selectedAnswer: userAnswers[q._id],
            correctAnswer: q.correctAnswer,
        }));

        setIncorrectAnswers(incorrect);
        const percentage = Math.floor((correctAnswers / totalQuestions) * 100);
        setResult(`You scored ${percentage}%`);

        if (!userId) {
            setError("You must be logged in to submit the quiz.");
            return;
        }

        const submissionData = {
            userId,
            subject,
            percentage,
            incorrectAnswers: incorrect,
        };

        try {
            const response = await fetch("/api/submitSubjectQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit subject quiz.");
            }

            setResult(`Quiz submitted successfully! Your score: ${percentage}%`);
        } catch (err) {
            setError("Failed to submit quiz. Please try again later.");
        }
    };

    const allQuestionsAnswered = questions.every((q) => userAnswers[q._id]);

    return (
        <div className={styles.subjectQuizContainer}>
            <h2 className={styles.quizTitle}>Subject Quiz: {subject.toUpperCase()}</h2>
            {loading ? (
                <div className={styles.spinner}>Loading questions...</div>
            ) : error ? (
                <p className={styles.error} aria-live="assertive">{error}</p>
            ) : (
                <>
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <QuizQuestion
                                key={question._id}
                                question={question}
                                userAnswers={userAnswers}
                                onAnswerChange={handleAnswerChange}
                                result={result}
                            />
                        ))
                    ) : (
                        <p>No questions available for the selected subject.</p>
                    )}
                    <QuizSubmitButton onClick={calculateScore} disabled={!allQuestionsAnswered || loading} />
                    {result && <p className={styles.result} aria-live="polite">{result}</p>}
                    {incorrectAnswers.length > 0 && (
                        <div className={styles.incorrectAnswers}>
                            {incorrectAnswers.map((ia, index) => (
                                <div key={index} className={styles.incorrectAnswer}>
                                    <p>Q: {ia.questionText}</p>
                                    <p>Your Answer: {ia.selectedAnswer}</p>
                                    <p>Correct Answer: {ia.correctAnswer}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SubjectQuiz;
