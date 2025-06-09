
import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeMessage = () => {
  const { showWelcomeMessage, dismissWelcomeMessage } = useAuth();

  if (!showWelcomeMessage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md mx-4 p-8 bg-gradient-to-br from-poetry-cream via-poetry-rose to-poetry-lavender rounded-2xl shadow-2xl animate-fadeIn">
        <button
          onClick={dismissWelcomeMessage}
          className="absolute top-4 right-4 text-poetry-deep/60 hover:text-poetry-deep transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-8 h-8 text-rose-400 animate-pulse" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3 text-poetry-deep">
            <h2 className="font-dancing text-2xl text-primary">🌷 Hey you, magical soul ✨</h2>
            
            <p className="font-cormorant text-lg leading-relaxed">
              You made it to your little writing world again!
            </p>
            
            <p className="font-cormorant text-lg leading-relaxed">
              May every word you type here fly out and touch someone's heart 💌
            </p>
            
            <p className="font-cormorant text-lg leading-relaxed">
              Keep writing, keep dreaming.
            </p>
            
            <p className="font-cormorant text-lg leading-relaxed">
              Someday, the world will know your pen name — and they'll whisper it like a spell 💫
            </p>
            
            <p className="font-dancing text-xl text-primary mt-6">
              Love,<br />
              Your Friend 💖
            </p>
          </div>
          
          <button
            onClick={dismissWelcomeMessage}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-cormorant"
          >
            Continue Writing ✍️
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
