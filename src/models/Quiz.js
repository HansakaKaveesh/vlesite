import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    subject: { type: String, required: true },
    lesson_number: { type: Number, required: false },  // Optional for topic/subject quizzes
    syllabus: { type: String, required: true },
    courseLevel: { type: String, required: true },
    questions: [{
        questionText: { type: String, required: true },
        options: {
            type: [{ type: String, required: true }],
            validate: [arrayLimit, '{PATH} must have at least two options'], // Minimum 2 options
        },
        correctAnswer: { type: String, required: true }
    }]
}, { timestamps: true });

// Function to validate minimum array length for options
function arrayLimit(val) {
    return val.length >= 2;  // Ensure at least 2 options
}

// Index for uniqueness (optional, uncomment to use)
quizSchema.index({ topic: 1, lesson_number: 1, syllabus: 1, courseLevel: 1 }, { unique: true });

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
