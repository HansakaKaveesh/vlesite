import connectToDatabase from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic') || null;
    const subject = searchParams.get('subject') || null;
    const syllabus = searchParams.get('syllabus');
    const courseLevel = searchParams.get('courseLevel');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // Validate required parameters
    if (!syllabus) {
        return new Response(JSON.stringify({ error: 'Missing required parameter: syllabus' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    if (!courseLevel) {
        return new Response(JSON.stringify({ error: 'Missing required parameter: courseLevel' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await connectToDatabase();

        // Build query object
        const query = { syllabus, courseLevel };
        if (topic) query.topic = topic;
        if (subject) query.subject = subject;

        // Pagination and query execution
        const quizzes = await Quiz.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalQuizzes = await Quiz.countDocuments(query);

        if (quizzes.length === 0) {
            return new Response(JSON.stringify({ message: 'No quizzes found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return quizzes with pagination metadata
        return new Response(
            JSON.stringify({
                quizzes,
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(totalQuizzes / limit),
                    totalQuizzes,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch quizzes' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
