// src/lib/quizResults.js
import QuizResult from '../models/QuizResult'; // Adjust the import path as necessary

// Save lesson quiz result
export const saveLessonQuizResult = async (userId, quizId, incorrectAnswers, percentage, lessonNumber) => {
    try {
        const quizResult = new QuizResult({
            userId,
            quizId,
            incorrectAnswers, // Array of IDs of questions answered incorrectly
            percentage,
            lesson_number: lessonNumber,
        });

        await quizResult.save();
        console.log('Lesson quiz result saved successfully:', quizResult);
    } catch (error) {
        console.error('Error saving lesson quiz result:', error);
        throw error; // Re-throw the error if needed for further handling
    }
};

// Save topic quiz result
export const saveTopicQuizResult = async (userId, topicId, incorrectAnswers, percentage) => {
    try {
        const quizResult = new QuizResult({
            userId,
            topicId,
            incorrectAnswers, // Array of IDs of questions answered incorrectly
            percentage,
            type: 'topic', // Specify this is a topic-level result
        });

        await quizResult.save();
        console.log('Topic quiz result saved successfully:', quizResult);
    } catch (error) {
        console.error('Error saving topic quiz result:', error);
        throw error; // Re-throw the error if needed for further handling
    }
};

// Save subject quiz result
export const saveSubjectQuizResult = async (userId, subjectId, incorrectAnswers, percentage) => {
    try {
        const quizResult = new QuizResult({
            userId,
            subjectId,
            incorrectAnswers, // Array of IDs of questions answered incorrectly
            percentage,
            type: 'subject', // Specify this is a subject-level result
        });

        await quizResult.save();
        console.log('Subject quiz result saved successfully:', quizResult);
    } catch (error) {
        console.error('Error saving subject quiz result:', error);
        throw error; // Re-throw the error if needed for further handling
    }
};
