"use client"; // This makes the component a Client Component

import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';
import { FaTasks, FaClipboard, FaBullhorn, FaBook } from 'react-icons/fa';
import Link from 'next/link'; // Import Link from Next.js

function Dashboard() {
  const [username, setUsername] = useState('');
  const [syllabus, setSyllabus] = useState([]); // State for syllabus
  const [courseLevels, setCourseLevels] = useState({}); // State for course levels
  const [subjects, setSubjects] = useState({}); // State for subjects
  const [selectedSyllabus, setSelectedSyllabus] = useState(''); // State for selected syllabus
  const [selectedCourseLevel, setSelectedCourseLevel] = useState(''); // State for selected course level

  // Retrieve the username, syllabus, course level, and subjects from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedSyllabus = localStorage.getItem('syllabus');
    const storedCourseLevels = localStorage.getItem('courseLevels');
    const storedSubjects = localStorage.getItem('subjects');

    console.log('storedUsername:', storedUsername);
    console.log('storedSyllabus:', storedSyllabus);
    console.log('storedCourseLevels:', storedCourseLevels);
    console.log('storedSubjects:', storedSubjects);

    // Ensure syllabus and username are retrieved properly
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedSyllabus) {
      const syllabusArray = JSON.parse(storedSyllabus);
      setSyllabus(syllabusArray); // Store all syllabi
    }

    if (storedCourseLevels) {
      const courseLevels = JSON.parse(storedCourseLevels);
      setCourseLevels(courseLevels); // Store all course levels
    }

    if (storedSubjects) {
      const subjects = JSON.parse(storedSubjects);
      setSubjects(subjects); // Store all subjects
    }
  }, []); // Empty dependency array means this will run once when the component mounts

  // Handler for syllabus change
  const handleSyllabusChange = (event) => {
    const selectedSyllabus = event.target.value;
    setSelectedSyllabus(selectedSyllabus);
    setSelectedCourseLevel(''); // Reset course level when syllabus changes
  };

  // Handler for course level change
  const handleCourseLevelChange = (event) => {
    setSelectedCourseLevel(event.target.value);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Head>
        <title>Dashboard | Your Learning Hub</title>
        <meta name="description" content="Stay updated with your assignments, grades, and announcements." />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome {username ? `, ${username}` : ''} to Your Dashboard</h1>
        <p className={styles.subtitle}>Keep track of your progress and stay updated.</p>
      </header>
      <main className={styles.mainContent}>
        {/* Syllabus and Course Level Selectors */}
        <section className={styles.subjectsSection}>
          <h2 className={styles.subjectsTitle}>Your Learning Information</h2>

          {/* Syllabus Selector */}
          <div className={styles.selector}>
            <label htmlFor="syllabus">Select Syllabus:</label>
            <select
              id="syllabus"
              value={selectedSyllabus}
              onChange={handleSyllabusChange}
            >
              <option value="">Select a syllabus</option>
              {syllabus.map((syllabusItem, index) => (
                <option key={index} value={syllabusItem}>
                  {syllabusItem}
                </option>
              ))}
            </select>
          </div>

          {/* Course Level Selector */}
          {selectedSyllabus && (
            <div className={styles.selector}>
              <label htmlFor="courseLevel">Select Course Level:</label>
              <select
                id="courseLevel"
                value={selectedCourseLevel}
                onChange={handleCourseLevelChange}
              >
                <option value="">Select a course level</option>
                {courseLevels[selectedSyllabus]?.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Display Subjects based on selected syllabus and course level */}
          {selectedSyllabus && selectedCourseLevel && (
            <section>
              <h3>Subjects for {selectedSyllabus} - {selectedCourseLevel}</h3>
              <ul>
                {subjects[`${selectedSyllabus}-${selectedCourseLevel}`]?.map((subject, index) => (
                  <li key={index} className={styles.subjectItem}>
                    <Link href={`/dashboard/study-materials/${subject.toLowerCase()}`} className={styles.link}>
                      {subject}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        {/* New Section for Syllabus, Course Level, and Selected Subjects */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FaBook className={styles.icon} />
            <h2 className={styles.cardTitle}>Course Information</h2>
          </div>
          <ul className={styles.cardList}>
            <li className={styles.cardItem}>
              Syllabus: <span className={styles.itemValue}>{selectedSyllabus || 'Not specified'}</span>
            </li>
            <li className={styles.cardItem}>
              Course Level: <span className={styles.itemValue}>{selectedCourseLevel || 'Not specified'}</span>
            </li>
            <li className={styles.cardItem}>
              Selected Subjects:
              {selectedSyllabus && selectedCourseLevel ? (
                <ul className={`${styles.cardList} ${styles.SubjectsList}`}>
                  {subjects[`${selectedSyllabus}-${selectedCourseLevel}`]?.map((subject, index) => (
                    <li key={index} className={styles.cardItem}>
                      <Link href={`/dashboard/study-materials/${subject.toLowerCase()}`} className={styles.link}>
                        {subject}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className={styles.itemValue}>None selected</span>
              )}
            </li>
          </ul>
        </section>

        {/* Upcoming Assignments Card */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FaTasks className={styles.icon} />
            <h2 className={styles.cardTitle}>Upcoming Assignments</h2>
          </div>
          <ul className={styles.cardList}>
            <li className={styles.cardItem}>Math Homework - <span className={styles.dueDate}>Due: Oct 10</span></li>
            <li className={styles.cardItem}>Science Project - <span className={styles.dueDate}>Due: Oct 15</span></li>
            <li className={styles.cardItem}>English Essay - <span className={styles.dueDate}>Due: Oct 20</span></li>
          </ul>
        </section>

        {/* Recent Grades Card */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FaClipboard className={styles.icon} />
            <h2 className={styles.cardTitle}>Recent Grades</h2>
          </div>
          <ul className={styles.cardList}>
            <li className={styles.cardItem}>Math: <span className={styles.grade}>85%</span></li>
            <li className={styles.cardItem}>Science: <span className={styles.grade}>90%</span></li>
            <li className={styles.cardItem}>English: <span className={styles.grade}>88%</span></li>
          </ul>
        </section>

        {/* Announcements Card */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FaBullhorn className={styles.icon} />
            <h2 className={styles.cardTitle}>Announcements</h2>
          </div>
          <ul className={styles.cardList}>
            <li className={styles.cardItem}>Parent-Teacher Meeting: <span className={styles.eventDate}>Oct 5</span></li>
            <li className={styles.cardItem}>Field Trip to the Science Museum: <span className={styles.eventDate}>Oct 12</span></li>
            <li className={styles.cardItem}>School Sports Day: <span className={styles.eventDate}>Oct 25</span></li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
