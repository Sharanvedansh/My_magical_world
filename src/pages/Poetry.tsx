
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Heart, BookOpen, Star, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Poem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url?: string;
}

const Poetry = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching poems:', error);
        return;
      }
      
      setPoems(data || []);
    } catch (error) {
      console.error('Error fetching poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(poems.map(poem => poem.category).filter(Boolean)))];
  
  const filteredPoems = selectedCategory === 'All' 
    ? poems 
    : poems.filter(poem => poem.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
            <p className="font-cormorant text-xl text-poetry-deep">Loading magical poetry...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Magical floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-1/4 left-1/12 w-3 h-3 text-poetry-amber/30 sparkle-animation" style={{animationDelay: '0s'}} />
        <Heart className="absolute top-1/3 right-1/12 w-4 h-4 text-poetry-sunset/40 gentle-float" style={{animationDelay: '1s'}} />
        <Sparkles className="absolute bottom-1/4 left-1/6 w-5 h-5 text-poetry-bronze/25 animate-float" style={{animationDelay: '2s'}} />
        <Star className="absolute bottom-1/3 right-1/4 w-3 h-3 text-poetry-honey/50 sparkle-animation" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="pt-20 container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-6xl text-poetry-deep mb-4 shimmer-text">
            ✨ Poetry Collection ✨
          </h1>
          <p className="font-cormorant text-2xl text-poetry-deep/80 italic max-w-2xl mx-auto">
            Where words dance with dreams and emotions paint the sky
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-cormorant font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream shadow-lg transform scale-105 magical-glow'
                    : 'bg-poetry-warm/60 text-poetry-deep hover:bg-poetry-bronze/20 hover:scale-102'
                } backdrop-blur-sm`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Poems Grid */}
        {filteredPoems.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-poetry-bronze/50 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl text-poetry-deep mb-4">
              The magic is brewing...
            </h2>
            <p className="font-cormorant text-xl text-poetry-deep/70 max-w-md mx-auto">
              Beautiful poems are coming soon to fill this space with wonder and emotion.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPoems.map((poem) => (
              <div
                key={poem.id}
                onClick={() => setSelectedPoem(poem)}
                className="magical-glow book-shadow paper-texture rounded-2xl p-6 backdrop-blur-sm cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                {poem.image_url && (
                  <img 
                    src={poem.image_url} 
                    alt={poem.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4 magical-glow"
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-playfair text-xl text-poetry-deep">{poem.title}</h3>
                  <Heart className="w-5 h-5 text-poetry-sunset" />
                </div>
                {poem.category && (
                  <span className="inline-block px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant font-semibold mb-3 border border-poetry-bronze/20">
                    {poem.category}
                  </span>
                )}
                <p className="font-cormorant text-poetry-deep/80 leading-relaxed">
                  {poem.content.substring(0, 120)}...
                </p>
                <p className="text-sm text-poetry-deep/60 font-cormorant italic mt-4">
                  {new Date(poem.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Poem Modal */}
        {selectedPoem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text">
                  {selectedPoem.title}
                </h2>
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="text-poetry-deep/60 hover:text-poetry-deep text-2xl"
                >
                  ×
                </button>
              </div>
              
              {selectedPoem.image_url && (
                <img 
                  src={selectedPoem.image_url} 
                  alt={selectedPoem.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6 magical-glow"
                />
              )}
              
              {selectedPoem.category && (
                <span className="inline-block px-4 py-2 bg-poetry-honey/30 text-poetry-deep rounded-full font-cormorant font-semibold mb-6 border border-poetry-bronze/20">
                  {selectedPoem.category}
                </span>
              )}
              
              <div className="font-cormorant text-lg leading-relaxed text-poetry-deep whitespace-pre-line mb-6">
                {selectedPoem.content}
              </div>
              
              <div className="flex items-center justify-between text-sm text-poetry-deep/60 font-cormorant italic">
                <span>By Varnika</span>
                <span>{new Date(selectedPoem.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poetry;
