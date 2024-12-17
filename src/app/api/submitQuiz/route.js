import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Joi from 'joi';
import mongoose from 'mongoose';
import Quiz from '@/models/Quiz';
import QuizResult from '@/models/QuizResult';

// Joi schema for validation
const quizSubmissionSchema = Joi.object({
    userId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    topic: Joi.string().optional(),
    lesson_number: Joi.number().integer().optional(),
    subject: Joi.string().valid('cs', 'ict').required(),
    percentage: Joi.number().min(0).max(100).required(),
    incorrectAnswers: Joi.array().items(
        Joi.object({
            questionText: Joi.string().required(),
            selectedAnswer: Joi.string().required(),
            correctAnswer: Joi.string().required(),
        })
    ).required(),
    type: Joi.string().valid('lesson', 'topic', 'subject').required(),
});

// Validate submission
function validateQuizSubmission(data) {
    const { error, value } = quizSubmissionSchema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    return value;
}

// POST handler
export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { userId, topic, lesson_number, subject, percentage, incorrectAnswers, type } = validateQuizSubmission(body);

        let quiz = null;
        if (type === 'lesson') {
            if (!lesson_number) throw new Error('Lesson number is required for lesson quizzes');
            quiz = await Quiz.findOne({ lesson_number, topic }).exec();
        } else if (type === 'topic') {
            if (!topic) throw new Error('Topic is required for topic quizzes');
            quiz = await Quiz.findOne({ topic }).exec();
        }

        if (type !== 'subject' && !quiz) {
            return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
        }

        const incorrectQuestionDetails = quiz?.questions.map(q => {
            const incorrectAnswer = incorrectAnswers.find(a => a.questionText === q.questionText);
            return incorrectAnswer
                ? {
                      questionText: q.questionText,
                      correctAnswer: q.correctAnswer,
                      selectedAnswer: incorrectAnswer.selectedAnswer,
                  }
                : null;
        }).filter(q => q !== null) || [];

        const quizResult = new QuizResult({
            userId: new mongoose.Types.ObjectId(userId),
            quizId: quiz?._id || null,
            topic: topic || undefined,
            subject,
            lesson_number: lesson_number || undefined,
            incorrectAnswers: incorrectQuestionDetails.length > 0 ? incorrectQuestionDetails : incorrectAnswers,
            percentage,
            type,
        });

        const savedQuizResult = await quizResult.save();

        return NextResponse.json({
            message: 'Quiz results saved successfully',
            quizResultId: savedQuizResult._id,
            percentage,
        });
    } catch (error) {
        console.error('Error saving quiz results:', error);
        return NextResponse.json(
            { message: 'Error saving quiz results', error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
