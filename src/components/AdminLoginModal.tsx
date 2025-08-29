import React, { useState } from 'react';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password-modal" className="sr-only">Password</label>
            <input
              id="password-modal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none placeholder-gray-400"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled={!password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
