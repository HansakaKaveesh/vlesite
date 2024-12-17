"use client";

import { useState, useEffect } from "react";
import styles from "./topicQuiz.module.css";
import QuizQuestion from "./QuizQuestion";
import QuizSubmitButton from "./QuizSubmitButton";

const TopicQuiz = ({ topic, userId, subject }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchTopicQuiz = async () => {
      if (loading) return; // Prevent duplicate requests
      setLoading(true);
      setError(""); // Clear previous errors

      const selectedSyllabus = localStorage.getItem("syllabus")?.trim() || "";
      const selectedCourseLevel = localStorage.getItem("courseLevel")?.trim() || "";

      if (!selectedSyllabus || !selectedCourseLevel) {
        setError("Please select a syllabus and course level.");
        setLoading(false);
        return;
      }

      // Fix for syllabus formatting (check if it's an array or string)
      const syllabusParam = Array.isArray(JSON.parse(selectedSyllabus)) ? JSON.parse(selectedSyllabus).join(',') : selectedSyllabus;

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/topicQuizzes?topic=${encodeURIComponent(topic)}&subject=${encodeURIComponent(
            subject
          )}&syllabus=${encodeURIComponent(syllabusParam)}&courseLevel=${encodeURIComponent(
            selectedCourseLevel
          )}`
        );

        if (!response.ok) {
          const errorDetails = await response.json().catch(() => ({ message: "Unknown error" }));
          throw new Error(errorDetails.message || "Failed to fetch topic quiz.");
        }

        const data = await response.json();
        setQuestions(data.quizzes || []); // Assuming quizzes are in the 'quizzes' field in response
      } catch (err) {
        setError(err.message || "Error fetching topic quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicQuiz();
  }, [topic, subject, userId]); // Added userId to dependencies for better optimization

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = async () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q) => q.correctAnswer === userAnswers[q._id]).length;
    const incorrect = questions
      .filter((q) => q.correctAnswer !== userAnswers[q._id])
      .map((q) => ({
        questionText: q.questionText,
        selectedAnswer: userAnswers[q._id],
        correctAnswer: q.correctAnswer,
      }));

    setIncorrectAnswers(incorrect); // Set incorrect answers here
    const percentage = Math.floor((correctAnswers / totalQuestions) * 100);
    setResult(`You scored ${percentage}%`);

    if (!userId) {
      setError("You must be logged in to submit the quiz.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/submitTopicQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, topic, subject, percentage, incorrectAnswers: incorrect }),
      });

      if (!response.ok) throw new Error("Failed to submit topic quiz.");
      setResult(`Quiz submitted successfully! Your score: ${percentage}%`);
    } catch (err) {
      setError(err.message || "Failed to submit quiz. Please try again later.");
    }
  };

  return (
    <div className={styles.topicQuizContainer}>
      <h2 className={styles.quizTitle}>Topic Quiz: {topic.replace("_", " ").toUpperCase()}</h2>
      {loading ? (
        <p>Loading questions...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : questions.length ? (
        <>
          {questions.map((question, index) => (
            <QuizQuestion
              key={question._id || index} // Added index to avoid issues with missing _id
              question={question}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              result={result}
              incorrectAnswers={incorrectAnswers}
            />
          ))}
          <QuizSubmitButton onClick={calculateScore} disabled={!questions.length} />
          {result && <p className={styles.result}>{result}</p>}
        </>
      ) : (
        <p>No questions available for this topic and syllabus.</p>
      )}
    </div>
  );
};

export default TopicQuiz;
