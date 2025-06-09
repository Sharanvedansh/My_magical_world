
import React from 'react';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Magic of Morning Pages",
      excerpt: "Discovering the transformative power of writing three pages every morning, and how it changed my relationship with words forever.",
      content: "There's something magical about the quiet hours of dawn...",
      category: "Writing Tips",
      date: "2024-01-20",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Finding Poetry in Everyday Moments",
      excerpt: "How I learned to see poetry everywhere - from grocery store receipts to conversations with strangers.",
      content: "Poetry isn't just in grand gestures or dramatic moments...",
      category: "Inspiration",
      date: "2024-01-15",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "The Writer's Heart",
      excerpt: "On vulnerability, courage, and the beautiful terrifying act of sharing your soul with the world.",
      content: "Every writer knows the feeling of standing at the edge...",
      category: "Personal",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop"
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
              ✨ Magical Thoughts ✨
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8">
              Stories from the writer's journey
            </p>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed">
              Welcome to my thoughts, reflections, and the stories behind the stories.
              Here, I share the magic and mess of the creative process.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="space-y-8 max-w-4xl mx-auto">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="magical-glow book-shadow paper-texture rounded-2xl overflow-hidden hover:transform hover:scale-102 transition-all duration-300 group"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-poetry-amber/20 text-poetry-deep rounded-full text-sm font-cormorant font-semibold border border-poetry-bronze/20">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {post.category}
                      </span>
                      <div className="flex items-center text-poetry-deep/60 text-sm font-cormorant">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center text-poetry-deep/60 text-sm font-cormorant">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h2 className="font-playfair text-2xl md:text-3xl text-poetry-deep mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="font-cormorant text-lg text-poetry-deep/80 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-poetry-deep/60 italic">
                        By Tarini
                      </span>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-cormorant font-semibold transition-colors">
                        <span>Read full story</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-poetry-honey/20 to-poetry-amber/20">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto magical-glow book-shadow paper-texture rounded-2xl p-8">
            <h2 className="font-playfair text-3xl text-poetry-deep mb-4">
              Join the Magic
            </h2>
            <p className="font-cormorant text-xl text-poetry-deep/80 mb-6">
              Get new posts and poetry delivered to your heart's inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your magical email..."
                className="flex-1 px-4 py-3 rounded-full border-2 border-poetry-bronze/30 font-cormorant focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-full hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold">
                ✨ Subscribe ✨
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
