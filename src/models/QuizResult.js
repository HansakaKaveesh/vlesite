// src/models/QuizResult.js
import mongoose from 'mongoose';

// Schema for incorrect answers
const IncorrectAnswerSchema = new mongoose.Schema({
    questionText: { type: String, required: true }, // The text of the question
    selectedAnswer: { type: String, required: true }, // The user's selected answer
    correctAnswer: { type: String, required: true }, // The correct answer for the question
});

// Main schema for quiz results
const QuizResultSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Registration', 
            required: true 
        }, // Reference to the user who took the quiz
        quizId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Quiz', 
            required: false 
        }, // Optional: Reference to the quiz (not needed for topic/subject results)
        topicId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Topic', 
            required: false 
        }, // Optional: Reference to the topic (for topic-level quizzes)
        subjectId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Subject', 
            required: false 
        }, // Optional: Reference to the subject (for subject-level quizzes)
        subject: { 
            type: String, 
            required: true 
        }, // The subject of the quiz (e.g., 'CS', 'ICT')
        lesson_number: { 
            type: Number, 
            required: false 
        }, // Optional: Lesson number for the quiz (only for lesson-level results)
        incorrectAnswers: [IncorrectAnswerSchema], // Array of detailed incorrect answers
        percentage: { 
            type: Number, 
            required: true 
        }, // Percentage score of the quiz
        type: { 
            type: String, 
            enum: ['lesson', 'topic', 'subject'], 
            required: true 
        }, // Quiz type (lesson-level, topic-level, or subject-level)
    },
    { 
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Export the model
const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
export default QuizResult;
