
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import { Mail, Heart, MapPin, Star } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl text-poetry-deep mb-6 shimmer-text">
              ✨ Let's Connect ✨
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8">
              Every message is a bridge between hearts
            </p>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed">
              I believe in the magic of connection. Whether you want to share your thoughts,
              collaborate on something beautiful, or just say hello - I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
                <h3 className="font-playfair text-2xl text-poetry-deep mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-primary" />
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-poetry-amber/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-poetry-deep" />
                    </div>
                    <div>
                      <p className="font-cormorant text-lg text-poetry-deep">
                        varnika1947kaushik@gmail.com
                      </p>
                      <p className="font-cormorant text-poetry-deep/60">
                        I usually reply within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-poetry-sunset/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-poetry-deep" />
                    </div>
                    <div>
                      <p className="font-cormorant text-lg text-poetry-deep">
                        Somewhere in the magical realm of words
                      </p>
                      <p className="font-cormorant text-poetry-deep/60">
                        Available for virtual coffee chats
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
                <h3 className="font-playfair text-2xl text-poetry-deep mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-primary" />
                  Let's Create Magic Together
                </h3>
                
                <p className="font-cormorant text-lg text-poetry-deep/80 leading-relaxed mb-4">
                  I'm always excited to connect with fellow dreamers, writers, and anyone who believes 
                  in the power of words to change the world.
                </p>
                
                <div className="space-y-3 font-cormorant text-poetry-deep">
                  <p>✨ Collaboration inquiries</p>
                  <p>📚 Writing workshops</p>
                  <p>💭 Just to say hello</p>
                  <p>💌 Share your own magical words</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
