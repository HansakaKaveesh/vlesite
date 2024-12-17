"use client";

import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./cs.module.css";

// Dynamic imports for the components
const Quiz = dynamic(() => import("@/components/Quiz"), { suspense: true });
const TopicQuiz = dynamic(() => import("@/components/TopicQuiz"), { suspense: true });
const SubjectQuiz = dynamic(() => import("@/components/SubjectQuiz"), { suspense: true });

const CS = () => {
  const [lessonContent, setLessonContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedSyllabus, setSelectedSyllabus] = useState("");
  const [selectedCourseLevel, setSelectedCourseLevel] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({});
  const [userId, setUserId] = useState("");
  const [showTopicQuiz, setShowTopicQuiz] = useState({});
  const [showSubjectQuiz, setShowSubjectQuiz] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const storedSyllabus = localStorage.getItem("syllabus") || "";
    const storedCourseLevel = localStorage.getItem("courseLevel") || "";

    setUserId(storedUserId);
    setSelectedSyllabus(storedSyllabus);
    setSelectedCourseLevel(storedCourseLevel);

    if (!storedSyllabus || !storedCourseLevel) {
      setError("Please select a syllabus and course level before proceeding.");
    }
  }, []);

  const topics = useMemo(
    () => ({
      introduction: [1, 2, 3, 4, 5],
      web_development: [1, 2, 3, 4],
      data_structures: [1, 2, 3],
    }),
    []
  );

  const toggleTopic = useCallback((topic) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  }, []);

  const fetchLessonContent = useCallback(
    async (topic, lessonIndex) => {
      if (!selectedSyllabus || !selectedCourseLevel) {
        setError("Syllabus or course level not set. Please check your selection.");
        return "<p>Error loading content. Please try again later.</p>";
      }

      const lessonUrl = `/${selectedSyllabus}/${selectedCourseLevel}/lessons/cs/${topic}/Lesson${lessonIndex}.html`;

      try {
        setLoading(true);
        const response = await fetch(lessonUrl);
        if (!response.ok) {
          throw new Error(`Error fetching lesson: ${response.status}`);
        }
        return await response.text();
      } catch (fetchError) {
        console.error("Failed to load lesson:", fetchError);
        setError("Failed to load lesson content. Please try again later.");
        return "<p>Error loading content. Please try again later.</p>";
      } finally {
        setLoading(false);
      }
    },
    [selectedSyllabus, selectedCourseLevel]
  );

  const toggleLesson = useCallback(
    async (topic, lessonIndex) => {
      setError("");
      if (expandedTopics[topic] === lessonIndex) {
        setExpandedTopics((prev) => ({ ...prev, [topic]: null }));
        setLessonContent((prev) => ({ ...prev, [topic]: "" }));
        setCurrentLesson(null);
      } else {
        setExpandedTopics((prev) => ({ ...prev, [topic]: lessonIndex }));
        const content = await fetchLessonContent(topic, lessonIndex);
        setLessonContent((prev) => ({ ...prev, [topic]: content }));
        setCurrentLesson({ topic, lessonIndex });
      }
    },
    [expandedTopics, fetchLessonContent]
  );

  const toggleTopicQuiz = (topic) => {
    setShowTopicQuiz((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const toggleSubjectQuiz = () => {
    setShowSubjectQuiz(!showSubjectQuiz);
  };

  const renderLessons = (topic) => (
    <div className={styles.lessonsList}>
      {topics[topic].map((lessonIndex) => (
        <div key={lessonIndex} className={styles.lessonItem}>
          <h4
            className={styles.lessonTitle}
            onClick={loading ? null : () => toggleLesson(topic, lessonIndex)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleLesson(topic, lessonIndex)}
            aria-expanded={expandedTopics[topic] === lessonIndex}
            aria-controls={`lesson-${topic}-${lessonIndex}`}
          >
            Lesson {lessonIndex}
          </h4>
          {expandedTopics[topic] === lessonIndex && (
            <div className={styles.lessonContent} id={`lesson-${topic}-${lessonIndex}`}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className={styles.error}>{error}</p>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: lessonContent[topic] || "" }} />
                  {currentLesson && currentLesson.topic === topic && currentLesson.lessonIndex === lessonIndex && userId && (
                    <Suspense fallback={<div>Loading Quiz...</div>}>
                      <Quiz topic={topic} lesson_number={lessonIndex} userId={userId} subject="cs" />
                    </Suspense>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <div className={styles.quizButtonContainer}>
        <button className={styles.quizButton} onClick={() => toggleTopicQuiz(topic)}>
          {showTopicQuiz[topic] ? "Hide Topic Quiz" : "Start Topic Quiz"}
        </button>
        {showTopicQuiz[topic] && (
          <Suspense fallback={<div>Loading Topic Quiz...</div>}>
            <TopicQuiz topic={topic} userId={userId} subject="cs" />
          </Suspense>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.csContainer}>
      <h1 className={styles.title}>Explore Computer Science</h1>
      <p className={styles.description}>
        Dive into interactive lessons, topic quizzes, and a subject-wide quiz to test your knowledge!
      </p>
      <div className={styles.topicsSection}>
        <h2 className={styles.subtitle}>Course Topics</h2>
        <div className={styles.topicsList}>
          {Object.keys(topics).map((topic) => (
            <div className={styles.topicItem} key={topic}>
              <h3 className={styles.topicTitle} onClick={() => toggleTopic(topic)}>
                {topic.replace("_", " ").toUpperCase()}
              </h3>
              {expandedTopics[topic] && renderLessons(topic)}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.quizButtonContainer}>
        <button className={styles.subjectQuizButton} onClick={toggleSubjectQuiz}>
          {showSubjectQuiz ? "Hide Subject Quiz" : "Start Subject Quiz"}
        </button>
        {showSubjectQuiz && (
          <Suspense fallback={<div>Loading Subject Quiz...</div>}>
            <SubjectQuiz userId={userId} subject="cs" />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CS;
