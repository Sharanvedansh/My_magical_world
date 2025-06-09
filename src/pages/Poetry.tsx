
import React from 'react';
import Navigation from '@/components/Navigation';
import { Heart, BookOpen, Calendar, Tag } from 'lucide-react';

const Poetry = () => {
  const poems = [
    {
      id: 1,
      title: "Whispers of Dawn",
      content: `In the quiet hours before sunrise,
When the world holds its breath,
I find pieces of my soul
Scattered like morning dew.

Each droplet carries a dream,
A whisper of what could be,
In this sacred space between
Night's end and day's beginning.`,
      category: "Nature",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "City Dreams",
      content: `Concrete and steel cannot contain
The wildness of a dreaming heart,
Urban symphonies play
In the rhythm of my steps.

Between the noise and chaos,
I find melodies unspoken,
Stories written in streetlights
And hope painted on walls.`,
      category: "Urban",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Letters to Tomorrow",
      content: `Dear future self,
I hope you remember the girl
Who dared to dream
When the world said "impossible."

Keep her close to your heart,
For she is the reason
You became who you are—
Beautiful, brave, and whole.`,
      category: "Reflection",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl text-poetry-deep mb-6 shimmer-text">
              ✨ Poetry Collection ✨
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8">
              Words that dance from heart to paper
            </p>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed">
              Welcome to my collection of poems, where every verse carries a piece of my soul.
              Each poem is a journey, a moment captured in words that bloom like flowers in the mind.
            </p>
          </div>
        </div>
      </section>

      {/* Poems Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {poems.map((poem) => (
              <div 
                key={poem.id}
                className="magical-glow book-shadow paper-texture rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative">
                  <img 
                    src={poem.image} 
                    alt={poem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-poetry-deep/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-poetry-cream">
                      <span className="px-3 py-1 bg-poetry-amber/90 text-poetry-deep rounded-full text-sm font-cormorant font-semibold">
                        {poem.category}
                      </span>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-cormorant">{poem.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4 group-hover:text-primary transition-colors">
                    {poem.title}
                  </h3>
                  
                  <p className="font-cormorant text-lg text-poetry-deep/80 leading-relaxed whitespace-pre-line mb-4">
                    {poem.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-poetry-bronze/20">
                    <div className="flex items-center space-x-2 text-poetry-deep/60">
                      <Heart className="w-4 h-4" />
                      <span className="font-cormorant text-sm">By Tarini</span>
                    </div>
                    <button className="text-primary hover:text-primary/80 font-cormorant underline underline-offset-4">
                      Read more →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-br from-poetry-honey/20 to-poetry-amber/20">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-6 floating-element" />
            <h2 className="font-playfair text-3xl text-poetry-deep mb-4">
              More Magic Coming Soon
            </h2>
            <p className="font-cormorant text-xl text-poetry-deep/80 mb-8">
              New poems are born regularly. Subscribe to never miss a magical moment.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-full hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold text-lg magical-glow transform hover:scale-105">
              ✨ Stay Connected ✨
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Poetry;
