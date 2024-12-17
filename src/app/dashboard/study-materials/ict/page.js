"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./ict.module.css";

// Dynamic imports for quizzes
const TopicQuiz = dynamic(() => import("@/components/TopicQuiz"), { suspense: true });
const SubjectQuiz = dynamic(() => import("@/components/SubjectQuiz"), { suspense: true });

const ICT = () => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const [lessonContent, setLessonContent] = useState({});
  const [selectedSyllabus, setSelectedSyllabus] = useState("");
  const [selectedCourseLevel, setSelectedCourseLevel] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [showTopicQuiz, setShowTopicQuiz] = useState({});
  const [showSubjectQuiz, setShowSubjectQuiz] = useState(false);

  // Get user info, syllabus, and course level from localStorage
  useEffect(() => {
    const storedSyllabus = localStorage.getItem("syllabus") || "";
    const storedCourseLevel = localStorage.getItem("courseLevel") || "";
    const storedUserId = localStorage.getItem("userId") || "";

    if (!storedSyllabus || !storedCourseLevel) {
      setError("Please select a syllabus and course level before proceeding.");
    } else {
      setSelectedSyllabus(storedSyllabus);
      setSelectedCourseLevel(storedCourseLevel);
    }
    setUserId(storedUserId);
  }, []);

  const topics = {
    introduction: [1, 2, 3, 4, 5],
    web_development: [1, 2, 3, 4],
    data_structures: [1, 2, 3],
  };

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const fetchLessonContent = async (topic, lessonIndex) => {
    if (!selectedSyllabus || !selectedCourseLevel) {
      setError("Please select a syllabus and course level.");
      return "<p>Error loading content. Please try again later.</p>";
    }

    try {
      const syllabus = selectedSyllabus.replace(/[^a-zA-Z0-9_-]/g, "");
      const courseLevel = selectedCourseLevel.replace(/[^a-zA-Z0-9_-]/g, "");
      const lessonUrl = `/${syllabus}/${courseLevel}/lessons/ict/${topic}/Lesson${lessonIndex}.html`;
      const response = await fetch(lessonUrl);
      if (!response.ok) {
        throw new Error(`Error fetching lesson: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error("Failed to load lesson:", error);
      return "<p>Error loading content. Please try again later.</p>";
    }
  };

  const toggleLesson = async (topic, lessonIndex) => {
    if (expandedTopics[topic] === lessonIndex) {
      setExpandedTopics((prev) => ({
        ...prev,
        [topic]: null,
      }));
      setLessonContent((prev) => ({
        ...prev,
        [topic]: "",
      }));
    } else {
      setExpandedTopics((prev) => ({
        ...prev,
        [topic]: lessonIndex,
      }));

      const content = await fetchLessonContent(topic, lessonIndex);
      setLessonContent((prev) => ({
        ...prev,
        [topic]: content,
      }));
    }
  };

  const toggleTopicQuiz = (topic) => {
    setShowTopicQuiz((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
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
            onClick={() => toggleLesson(topic, lessonIndex)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleLesson(topic, lessonIndex)}
          >
            Lesson {lessonIndex}
          </h4>
          {expandedTopics[topic] === lessonIndex && (
            <div className={styles.lessonContent}>
              <div dangerouslySetInnerHTML={{ __html: lessonContent[topic] || "" }} />
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
            <TopicQuiz topic={topic} userId={userId} subject="ict" />
          </Suspense>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.csContainer}>
      <h1 className={styles.title}>ICT Study Materials</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.topicsSection}>
        <h2 className={styles.subtitle}>Course Topics</h2>
        <div className={styles.topicsList}>
          {Object.keys(topics).map((topic) => (
            <div className={styles.topicItem} key={topic}>
              <h3
                className={styles.topicTitle}
                onClick={() => toggleTopic(topic)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleTopic(topic)}
              >
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
            <SubjectQuiz userId={userId} subject="ict" />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ICT;
