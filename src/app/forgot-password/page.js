'use client';  // Ensures it's a client component
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading state

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Check your email for a password reset link.');
      } else {
        setMessage('Something went wrong, please try again.');
      }
    } catch (error) {
      setMessage('Failed to send reset link. Please try again later.');
    } finally {
      setLoading(false);  // Remove loading state
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black min-h-[80vh] flex items-center justify-center mt-[-10px]">
      <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Enter your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 bg-white bg-opacity-20 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="example@example.com"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-white">{message}</p>
        )}
      </div>
    </div>
  );
}
