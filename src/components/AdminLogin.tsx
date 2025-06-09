
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-playfair text-3xl text-poetry-deep mb-2">Welcome Back</h1>
          <p className="font-cormorant text-lg text-poetry-deep/70">
            Enter your magical writing sanctuary
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div>
            <label htmlFor="username" className="block font-cormorant text-lg text-poetry-deep mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-poetry-dusty/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/70 font-cormorant text-lg"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-cormorant text-lg text-poetry-deep mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-poetry-dusty/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/70 font-cormorant text-lg"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-poetry-deep/60 hover:text-poetry-deep"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 font-cormorant text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-cormorant text-lg"
          >
            Enter Writing Sanctuary
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-cormorant text-sm text-poetry-deep/60">
            Demo credentials: poet / writewords2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
