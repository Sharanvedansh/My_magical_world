
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Heart, Edit, Star, Clock, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  read_time: string;
  image_url?: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }
      
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Edit className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
            <p className="font-cormorant text-xl text-poetry-deep">Loading magical thoughts...</p>
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
        <Edit className="absolute bottom-1/4 left-1/6 w-5 h-5 text-poetry-bronze/25 animate-float" style={{animationDelay: '2s'}} />
        <Star className="absolute bottom-1/3 right-1/4 w-3 h-3 text-poetry-honey/50 sparkle-animation" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="pt-20 container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-6xl text-poetry-deep mb-4 shimmer-text">
            ✨ Magical Thoughts ✨
          </h1>
          <p className="font-cormorant text-2xl text-poetry-deep/80 italic max-w-2xl mx-auto">
            Insights, inspiration, and the magic behind the words
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

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Edit className="w-20 h-20 text-poetry-bronze/50 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl text-poetry-deep mb-4">
              Thoughts are brewing...
            </h2>
            <p className="font-cormorant text-xl text-poetry-deep/70 max-w-md mx-auto">
              Magical insights and inspiring thoughts will appear here soon to share wisdom and wonder.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="magical-glow book-shadow paper-texture rounded-2xl p-8 backdrop-blur-sm cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
              >
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {post.image_url && (
                    <div className="lg:col-span-1">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-48 lg:h-full object-cover rounded-lg magical-glow"
                      />
                    </div>
                  )}
                  <div className={post.image_url ? 'lg:col-span-2' : 'lg:col-span-3'}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {post.category && (
                          <span className="px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant font-semibold border border-poetry-bronze/20">
                            {post.category}
                          </span>
                        )}
                        <div className="flex items-center space-x-2 text-poetry-deep/60 text-sm font-cormorant">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        {post.read_time && (
                          <div className="flex items-center space-x-2 text-poetry-deep/60 text-sm font-cormorant">
                            <Clock className="w-4 h-4" />
                            <span>{post.read_time}</span>
                          </div>
                        )}
                      </div>
                      <Heart className="w-6 h-6 text-poetry-sunset" />
                    </div>
                    
                    <h2 className="font-playfair text-3xl text-poetry-deep mb-4 hover:shimmer-text transition-all duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="font-cormorant text-lg text-poetry-deep/80 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <button className="font-cormorant text-poetry-bronze hover:text-poetry-amber font-semibold transition-colors duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-playfair text-4xl text-poetry-deep shimmer-text">
                  {selectedPost.title}
                </h1>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-poetry-deep/60 hover:text-poetry-deep text-3xl"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center space-x-6 mb-6 text-poetry-deep/60 font-cormorant">
                {selectedPost.category && (
                  <span className="px-4 py-2 bg-poetry-honey/30 text-poetry-deep rounded-full font-semibold border border-poetry-bronze/20">
                    {selectedPost.category}
                  </span>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedPost.created_at).toLocaleDateString()}</span>
                </div>
                {selectedPost.read_time && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost.read_time}</span>
                  </div>
                )}
              </div>
              
              {selectedPost.image_url && (
                <img 
                  src={selectedPost.image_url} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-lg mb-8 magical-glow"
                />
              )}
              
              <div className="font-cormorant text-lg leading-relaxed text-poetry-deep whitespace-pre-line mb-8">
                {selectedPost.content}
              </div>
              
              <div className="border-t border-poetry-bronze/20 pt-6">
                <div className="flex items-center justify-between text-sm text-poetry-deep/60 font-cormorant italic">
                  <span>Written with ✨ by Varnika</span>
                  <span>Magical Word Weaver</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
