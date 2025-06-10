import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LikeButton from '@/components/LikeButton';
import { BookOpen, Heart, Star, Calendar } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      
      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error fetching poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPoems = selectedCategory === 'all' 
    ? poems 
    : poems.filter(poem => poem.category?.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(poems.map(poem => poem.category).filter(Boolean)))];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
            <p className="font-cormorant text-xl text-poetry-deep">Loading magical poetry...</p>
          </div>
        </div>
      </div>
    );
  }

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
              Where words dance with the soul
            </p>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed">
              Each poem is a journey through the landscapes of the heart, painted with words 
              that shimmer like starlight and flow like gentle streams.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 1 && (
        <section className="px-6 pb-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-cormorant font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream shadow-lg magical-glow'
                      : 'bg-poetry-cream/80 text-poetry-deep hover:bg-poetry-bronze/20 border border-poetry-bronze/30'
                  }`}
                >
                  {category === 'all' ? 'All Poems' : category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Poems */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          {filteredPoems.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-6" />
              <h3 className="font-playfair text-2xl text-poetry-deep mb-4">No poems yet</h3>
              <p className="font-cormorant text-lg text-poetry-deep/60">
                The poetry collection is waiting for its first magical creation...
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoems.map((poem) => (
                <div key={poem.id} className="magical-glow book-shadow paper-texture rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
                  {poem.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={poem.image_url} 
                        alt={poem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-playfair text-2xl text-poetry-deep group-hover:text-primary transition-colors">
                        {poem.title}
                      </h3>
                      {poem.category && (
                        <span className="px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant border border-poetry-bronze/20">
                          {poem.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="prose prose-poetry max-w-none mb-4">
                      <div className="font-cormorant text-poetry-deep/90 leading-relaxed whitespace-pre-line">
                        {poem.content.length > 200 ? `${poem.content.substring(0, 200)}...` : poem.content}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-poetry-bronze/20">
                      <div className="flex items-center space-x-2 text-poetry-deep/60">
                        <Calendar className="w-4 h-4" />
                        <span className="font-cormorant text-sm">
                          {new Date(poem.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <LikeButton postId={poem.id} postType="poem" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-1/4 left-1/12 w-3 h-3 text-poetry-amber/30 sparkle-animation" style={{animationDelay: '0s'}} />
        <Heart className="absolute top-1/2 right-1/12 w-4 h-4 text-poetry-sunset/40 gentle-float" style={{animationDelay: '1s'}} />
        <BookOpen className="absolute bottom-1/4 left-1/6 w-5 h-5 text-poetry-bronze/25 animate-float" style={{animationDelay: '2s'}} />
        <Star className="absolute bottom-1/3 right-1/4 w-3 h-3 text-poetry-honey/50 sparkle-animation" style={{animationDelay: '0.5s'}} />
      </div>
    </div>
  );
};

export default Poetry;
