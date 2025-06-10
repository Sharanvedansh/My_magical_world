
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Heart, Star, BookOpen, Mail, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WriterBio {
  name: string;
  title: string;
  bio: string;
  email: string;
}

const About = () => {
  const [writerBio, setWriterBio] = useState<WriterBio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWriterBio();
  }, []);

  const fetchWriterBio = async () => {
    try {
      const { data, error } = await supabase
        .from('writer_bio')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching writer bio:', error);
        return;
      }
      
      setWriterBio(data);
    } catch (error) {
      console.error('Error fetching writer bio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
            <p className="font-cormorant text-xl text-poetry-deep">Loading magical story...</p>
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
        <BookOpen className="absolute top-1/2 left-1/8 w-4 h-4 text-poetry-bronze/30 gentle-float" style={{animationDelay: '3s'}} />
      </div>

      <div className="pt-20 container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-playfair text-6xl text-poetry-deep mb-6 shimmer-text">
              ✨ About {writerBio?.name || 'Varnika'} ✨
            </h1>
            <p className="font-cormorant text-2xl text-poetry-deep/80 italic">
              {writerBio?.title || 'Magical Word Weaver'}
            </p>
          </div>

          {/* Main Content */}
          <div className="magical-glow book-shadow paper-texture rounded-2xl p-12 backdrop-blur-sm mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image Placeholder */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="w-full aspect-square bg-gradient-to-br from-poetry-warm to-poetry-honey rounded-2xl magical-glow flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-24 h-24 text-poetry-deep/60 mx-auto mb-4" />
                      <p className="font-cormorant text-lg text-poetry-deep/70">
                        Where magic lives in every word
                      </p>
                    </div>
                  </div>
                  <Heart className="absolute -top-3 -right-3 w-8 h-8 text-poetry-sunset animate-pulse" />
                  <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-poetry-amber sparkle-animation" />
                </div>
              </div>

              {/* Bio Content */}
              <div className="order-1 lg:order-2">
                <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center">
                  <Sparkles className="w-8 h-8 mr-3 text-poetry-bronze" />
                  My Story
                </h2>
                
                <div className="font-cormorant text-lg leading-relaxed text-poetry-deep/90 space-y-4">
                  {writerBio?.bio ? (
                    <p>{writerBio.bio}</p>
                  ) : (
                    <>
                      <p>
                        Welcome to my magical sanctuary of words! I'm a dreamer who believes in the transformative power 
                        of poetry and the written word. Every poem I craft is a piece of my soul, every story a doorway 
                        to new worlds.
                      </p>
                      <p>
                        In this space, I weave together emotions, experiences, and imagination to create verses that 
                        dance with the heart and speak to the spirit. Poetry, for me, is not just an art form—it's a 
                        way of breathing magic into the everyday moments of life.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Writing Philosophy */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 text-center backdrop-blur-sm">
              <Heart className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
              <h3 className="font-playfair text-xl text-poetry-deep mb-3">From the Heart</h3>
              <p className="font-cormorant text-poetry-deep/80">
                Every word I write comes from deep within, carrying emotions that resonate with souls across the universe.
              </p>
            </div>

            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 text-center backdrop-blur-sm">
              <Sparkles className="w-12 h-12 text-poetry-amber mx-auto mb-4 sparkle-animation" />
              <h3 className="font-playfair text-xl text-poetry-deep mb-3">With Magic</h3>
              <p className="font-cormorant text-poetry-deep/80">
                I believe in the magic that happens when words dance together, creating something greater than themselves.
              </p>
            </div>

            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 text-center backdrop-blur-sm">
              <BookOpen className="w-12 h-12 text-poetry-bronze mx-auto mb-4 gentle-float" />
              <h3 className="font-playfair text-xl text-poetry-deep mb-3">For Everyone</h3>
              <p className="font-cormorant text-poetry-deep/80">
                My words are for every heart that has ever felt deeply, dreamed wildly, or loved completely.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 text-center backdrop-blur-sm">
            <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 mr-3 text-poetry-bronze" />
              Let's Connect
            </h2>
            <p className="font-cormorant text-lg text-poetry-deep/80 mb-6 max-w-2xl mx-auto">
              I'd love to hear from fellow dreamers, poetry lovers, and kindred spirits. 
              Share your thoughts, your own verses, or simply say hello!
            </p>
            <a
              href={`mailto:${writerBio?.email || 'varnika1947kaushik@gmail.com'}`}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Send me a magical message</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
