
import React from 'react';
import { X, Heart, Sparkles, Star, Book } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeMessage = () => {
  const { showWelcomeMessage, dismissWelcomeMessage } = useAuth();

  if (!showWelcomeMessage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative max-w-lg mx-4 p-10 magical-glow book-shadow paper-texture rounded-3xl animate-fadeIn">
        {/* Floating magical elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <Star className="absolute top-4 left-6 w-4 h-4 text-poetry-amber/60 sparkle-animation" style={{animationDelay: '0s'}} />
          <Heart className="absolute top-8 right-8 w-3 h-3 text-poetry-sunset/70 sparkle-animation" style={{animationDelay: '0.5s'}} />
          <Book className="absolute bottom-6 left-8 w-5 h-5 text-poetry-bronze/50 gentle-float" style={{animationDelay: '1s'}} />
          <Sparkles className="absolute bottom-8 right-6 w-4 h-4 text-poetry-honey/80 sparkle-animation" style={{animationDelay: '1.5s'}} />
        </div>

        <button
          onClick={dismissWelcomeMessage}
          className="absolute top-6 right-6 text-poetry-deep/60 hover:text-poetry-deep transition-colors p-2 rounded-full hover:bg-poetry-bronze/10"
        >
          <X className="w-5 h-5" />
        button>
        
        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-poetry-amber to-poetry-sunset rounded-full flex items-center justify-center magical-glow gentle-float">
                <Heart className="w-8 h-8 text-poetry-cream animate-pulse" />
              </div>
              <Sparkles className="w-6 h-6 text-poetry-honey absolute -top-2 -right-2 sparkle-animation" />
            </div>
          </div>
          
          <div className="space-y-5 text-poetry-deep">
            <h2 className="font-dancing text-3xl text-primary shimmer-text">
              🌷 Hey you, magical soul ✨
            </h2>
            
            <p className="font-cormorant text-xl leading-relaxed">
              You made it to your little writing world again!
            </p>
            
            <p className="font-cormorant text-xl leading-relaxed">
              May every word you type here fly out and touch someone's heart 💌
            </p>
            
            <p className="font-cormorant text-xl leading-relaxed">
              Keep writing, keep dreaming.
            </p>
            
            <p className="font-cormorant text-xl leading-relaxed">
              Someday, the world will know your pen name — and they'll whisper it like a spell 💫
            </p>
            
            <div className="pt-4">
              <p className="font-dancing text-2xl text-primary shimmer-text">
                Love,<br />
                Your Friend 💖
              </p>
            </div>
          </div>
          
          <button
            onClick={dismissWelcomeMessage}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-full hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold text-lg magical-glow transform hover:scale-105"
          >
            ✨ Continue Your Magic ✍️
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
