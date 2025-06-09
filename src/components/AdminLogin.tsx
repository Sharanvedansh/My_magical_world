
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Eye, EyeOff, Star, Heart, Book } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-1/4 left-1/4 w-4 h-4 text-poetry-amber/40 animate-pulse" style={{animationDelay: '0s'}} />
        <Heart className="absolute top-1/3 right-1/4 w-3 h-3 text-poetry-sunset/50 animate-pulse" style={{animationDelay: '1s'}} />
        <Book className="absolute bottom-1/3 left-1/6 w-5 h-5 text-poetry-bronze/30 animate-float" style={{animationDelay: '2s'}} />
        <Star className="absolute bottom-1/4 right-1/3 w-3 h-3 text-poetry-honey/60 sparkle-animation" style={{animationDelay: '0.5s'}} />
        <Heart className="absolute top-1/2 left-1/12 w-4 h-4 text-poetry-amber/35 gentle-float" style={{animationDelay: '1.5s'}} />
      </div>

      <div className="max-w-md w-full z-10">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <Lock className="w-16 h-16 text-primary mx-auto magical-glow gentle-float" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-poetry-amber/20 rounded-full sparkle-animation"></div>
          </div>
          <h1 className="font-playfair text-4xl text-poetry-deep mb-3 shimmer-text">
            Welcome to Your Sanctuary
          </h1>
          <p className="font-cormorant text-xl text-poetry-deep/80 italic">
            Where your magical words come to life ✨
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 magical-glow book-shadow paper-texture p-8 rounded-2xl backdrop-blur-sm">
          <div>
            <label htmlFor="username" className="block font-cormorant text-lg text-poetry-deep mb-3 flex items-center">
              <Book className="w-4 h-4 mr-2 text-poetry-bronze" />
              Writer's Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/90 font-cormorant text-lg transition-all duration-300 hover:border-poetry-bronze/50"
              placeholder="Enter your writer's name..."
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-cormorant text-lg text-poetry-deep mb-3 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-poetry-sunset" />
              Secret Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 pr-14 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/90 font-cormorant text-lg transition-all duration-300 hover:border-poetry-bronze/50"
                placeholder="Enter your secret writing key..."
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-poetry-deep/60 hover:text-poetry-deep transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 font-cormorant text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant text-lg font-semibold magical-glow transform hover:scale-105 hover:shadow-lg"
          >
            ✨ Enter Your Magical Writing World ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
