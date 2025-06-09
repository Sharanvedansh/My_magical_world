
import React from 'react';
import Navigation from '@/components/Navigation';
import { Heart, Sparkles, BookOpen, PenTool, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-poetry-amber to-poetry-sunset rounded-full mx-auto mb-6 magical-glow gentle-float flex items-center justify-center">
                  <Heart className="w-16 h-16 text-poetry-cream animate-pulse" />
                </div>
                <Sparkles className="w-8 h-8 text-poetry-honey absolute -top-2 -right-2 sparkle-animation" />
                <Star className="w-6 h-6 text-poetry-amber absolute -bottom-2 -left-2 sparkle-animation" style={{animationDelay: '1s'}} />
              </div>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-6xl text-poetry-deep mb-6 shimmer-text">
              Meet Tarini ✨
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8">
              A soul who speaks in verses and dreams in metaphors
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="magical-glow book-shadow paper-texture rounded-3xl p-12 mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="font-cormorant text-xl leading-relaxed text-poetry-deep mb-6">
                  Hello, beautiful soul! I'm Tarini, and I believe that magic lives in the spaces between words, 
                  in the pause before a poem begins, and in the moment when a reader's heart recognizes itself 
                  in a stranger's verse.
                </p>
                
                <p className="font-cormorant text-xl leading-relaxed text-poetry-deep mb-6">
                  My journey with words began in childhood, when I discovered that feelings too big for my small heart 
                  could find a home on paper. What started as scribbled thoughts in school notebooks has blossomed 
                  into a lifelong love affair with poetry and storytelling.
                </p>
                
                <p className="font-cormorant text-xl leading-relaxed text-poetry-deep mb-8">
                  I write because I believe in the power of words to heal, to connect, to make the invisible visible. 
                  Every poem is a bridge between my world and yours, an invitation to feel less alone in this 
                  beautiful, complicated existence we share.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-poetry-honey/30 rounded-full flex items-center justify-center mx-auto mb-4 magical-glow">
                    <PenTool className="w-8 h-8 text-poetry-deep" />
                  </div>
                  <h3 className="font-playfair text-xl text-poetry-deep mb-2">Writing</h3>
                  <p className="font-cormorant text-poetry-deep/80">Poetry that touches hearts and awakens souls</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-poetry-amber/30 rounded-full flex items-center justify-center mx-auto mb-4 magical-glow">
                    <BookOpen className="w-8 h-8 text-poetry-deep" />
                  </div>
                  <h3 className="font-playfair text-xl text-poetry-deep mb-2">Reading</h3>
                  <p className="font-cormorant text-poetry-deep/80">Always seeking new worlds between pages</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-poetry-sunset/30 rounded-full flex items-center justify-center mx-auto mb-4 magical-glow">
                    <Sparkles className="w-8 h-8 text-poetry-deep" />
                  </div>
                  <h3 className="font-playfair text-xl text-poetry-deep mb-2">Dreaming</h3>
                  <p className="font-cormorant text-poetry-deep/80">Believing in magic and infinite possibilities</p>
                </div>
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="magical-glow book-shadow paper-texture rounded-3xl p-12">
              <h2 className="font-playfair text-3xl text-poetry-deep mb-8 text-center shimmer-text">
                My Writing Philosophy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Heart className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-xl text-poetry-deep mb-2">Write from the Heart</h3>
                    <p className="font-cormorant text-lg text-poetry-deep/80">
                      Authenticity is the most beautiful thing a writer can offer. I write what I feel, 
                      not what I think people want to hear.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-xl text-poetry-deep mb-2">Find Magic in the Ordinary</h3>
                    <p className="font-cormorant text-lg text-poetry-deep/80">
                      Poetry exists everywhere - in morning coffee steam, in strangers' smiles, 
                      in the way light falls through windows.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-xl text-poetry-deep mb-2">Share to Connect</h3>
                    <p className="font-cormorant text-lg text-poetry-deep/80">
                      Words are bridges. Every poem I share is an attempt to say "you are not alone" 
                      to someone who needs to hear it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
