
import React from 'react';
import Navigation from '@/components/Navigation';
import { Feather, Heart, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredPoems = [
    {
      title: "Whispers of Dawn",
      excerpt: "In the quiet hours before sunrise,\nWhen the world holds its breath...",
      category: "Nature"
    },
    {
      title: "City Dreams",
      excerpt: "Concrete and steel cannot contain\nThe wildness of a dreaming heart...",
      category: "Urban"
    },
    {
      title: "Letters to Tomorrow",
      excerpt: "Dear future self,\nI hope you remember the girl who dared to dream...",
      category: "Reflection"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 floating-element">
              <Feather className="w-16 h-16 text-primary mx-auto mb-6" />
            </div>
            
            <h1 className="font-playfair text-5xl md:text-7xl text-poetry-deep mb-6 animate-fadeIn">
              Poetry & Dreams
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8 animate-fadeIn">
              Where words bloom into beautiful realities
            </p>
            
            <p className="font-cormorant text-xl md:text-2xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed animate-fadeIn">
              Welcome to Tarini's magical corner of the internet where poetry lives, breathes, and touches souls. 
              Each word is carefully crafted, each verse a small piece of magic.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link 
                to="/poetry"
                className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-cormorant text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Poetry
              </Link>
              <Link 
                to="/blog"
                className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-cormorant text-lg"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-poetry-honey/20 to-poetry-amber/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl text-poetry-deep mb-4">Featured Works</h2>
            <p className="font-cormorant text-xl text-poetry-deep/70">Recent pieces from Tarini's heart</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredPoems.map((poem, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group magical-glow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-poetry-amber/30 text-poetry-deep rounded-full text-sm font-cormorant border border-poetry-bronze/20">
                    {poem.category}
                  </span>
                  <Heart className="w-5 h-5 text-rose-400 group-hover:fill-current transition-colors" />
                </div>
                
                <h3 className="font-playfair text-xl text-poetry-deep mb-3 group-hover:text-primary transition-colors">
                  {poem.title}
                </h3>
                
                <p className="font-cormorant text-lg text-poetry-deep/80 leading-relaxed whitespace-pre-line">
                  {poem.excerpt}
                </p>
                
                <Link 
                  to="/poetry"
                  className="mt-4 text-primary hover:text-primary/80 font-cormorant underline underline-offset-4 inline-block"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4 floating-element" />
              <h2 className="font-playfair text-4xl text-poetry-deep mb-6">The Writer's Journey</h2>
            </div>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 leading-relaxed mb-8">
              Every poet has a story. Tarini's began with a notebook filled with midnight thoughts and 
              dreams too big for whispered words. Here, you'll find pieces of that journey—
              raw, honest, and beautifully imperfect.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-poetry-deep/60 mb-8">
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2" />
                <p className="font-cormorant">Inspiration</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <p className="font-cormorant">Emotion</p>
              </div>
              <div className="text-center">
                <Feather className="w-8 h-8 mx-auto mb-2" />
                <p className="font-cormorant">Creation</p>
              </div>
            </div>
            
            <Link 
              to="/about"
              className="inline-block px-8 py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-full hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold text-lg magical-glow transform hover:scale-105"
            >
              ✨ Meet Tarini ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-poetry-deep text-poetry-cream">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Feather className="w-8 h-8 mx-auto mb-4 opacity-70" />
            <p className="font-dancing text-2xl mb-2">Poetry & Dreams</p>
            <p className="font-cormorant text-lg opacity-70">
              Where every word matters, every dream counts
            </p>
          </div>
          
          <div className="border-t border-poetry-cream/20 pt-6">
            <p className="font-cormorant opacity-60">
              © 2024 Tarini. All rights reserved. Made with love and endless cups of tea.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
