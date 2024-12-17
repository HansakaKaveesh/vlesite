// src/app/courses/page.js
import Head from 'next/head';
import styles from './courses.module.css';

export default function Courses() {
    return (
        <div className={styles.coursesContainer}>
            <Head>
                <title>Courses</title>
            </Head>
            <h1 className={styles.pageTitle}>Select Your Course</h1>

            <div className={styles.coursesGrid}>
                {/* A/L Courses */}
                <div className={styles.courseCard}>
                    <h2 className={styles.courseTitle}>A/L Courses</h2>
                    <div className={styles.levelOptions}>
                        <div className={styles.course}>
                            <h3>ICT</h3>
                            <button className={styles.courseButton}>View Details</button>
                        </div>
                        <div className={styles.course}>
                            <h3>CS</h3>
                            <button className={styles.courseButton}>View Details</button>
                        </div>
                    </div>
                </div>

                {/* O/L Courses */}
                <div className={styles.courseCard}>
                    <h2 className={styles.courseTitle}>O/L Courses</h2>
                    <div className={styles.levelOptions}>
                        <div className={styles.course}>
                            <h3>ICT</h3>
                            <button className={styles.courseButton}>View Details</button>
                        </div>
                        <div className={styles.course}>
                            <h3>CSS</h3>
                            <button className={styles.courseButton}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
