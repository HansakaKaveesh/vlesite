'use client';  // Marking it as a Client Component

import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqHeading}>Quick answers</h2>
      <div className={styles.faqList}>
        <div
          className={`${styles.faqItem} ${activeIndex === 0 ? styles.active : ''}`}
          onClick={() => toggleFAQ(0)}
        >
          <div className={styles.faqQuestion}>
            <span>Can I download everything on the website?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 0 && (
            <div className={styles.faqAnswer}>
              Yes, you can download everything as per your membership level.
            </div>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 1 ? styles.active : ''}`}
          onClick={() => toggleFAQ(1)}
        >
          <div className={styles.faqQuestion}>
            <span>How do I renew or cancel my membership?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 1 && (
            <div className={styles.faqAnswer}>
              You can renew or cancel your membership from the account settings page.
            </div>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 2 ? styles.active : ''}`}
          onClick={() => toggleFAQ(2)}
        >
          <div className={styles.faqQuestion}>
            <span>How is payment taken?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 2 && (
            <div className={styles.faqAnswer}>
              Payment is taken through credit card or PayPal, depending on your selection.
            </div>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 3 ? styles.active : ''}`}
          onClick={() => toggleFAQ(3)}
        >
          <div className={styles.faqQuestion}>
            <span>How do I submit an assignment?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 3 && (
            <div className={styles.faqAnswer}>
              Navigate to the assignment page within your course, click the "Submit Assignment" button, and follow the instructions to upload your file. Accepted file types and submission deadlines are typically listed with the assignment. Double-check your submission to ensure the file is complete.
            </div>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 4 ? styles.active : ''}`}
          onClick={() => toggleFAQ(4)}
        >
          <div className={styles.faqQuestion}>
            <span>I missed an online quiz or exam. Can I retake it?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 4 && (
            <div className={styles.faqAnswer}>
              Retakes are often up to the instructor’s discretion. Contact your instructor as soon as possible to explain the situation and inquire about options. Keep in mind that some quizzes or exams are strictly time-bound.
            </div>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 5 ? styles.active : ''}`}
          onClick={() => toggleFAQ(5)}
        >
          <div className={styles.faqQuestion}>
            <span>Where can I find my grades?</span>
            <span className={styles.faqIcon}>&#9660;</span>
          </div>
          {activeIndex === 5 && (
            <div className={styles.faqAnswer}>
              Access your course, then go to the “Grades” section. This area will show you scores for assignments, quizzes, and other assessments. Some courses may also provide feedback from your instructor on graded work.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
