
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Mail, Heart, Send, MessageCircle, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-poetry-amber to-poetry-sunset rounded-full mx-auto mb-6 magical-glow gentle-float flex items-center justify-center">
                  <Mail className="w-10 h-10 text-poetry-cream" />
                </div>
                <Sparkles className="w-6 h-6 text-poetry-honey absolute -top-1 -right-1 sparkle-animation" />
              </div>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-6xl text-poetry-deep mb-6 shimmer-text">
              ✨ Let's Connect ✨
            </h1>
            
            <p className="font-dancing text-2xl md:text-3xl text-primary mb-8">
              Your words matter to me
            </p>
            
            <p className="font-cormorant text-xl text-poetry-deep/80 max-w-2xl mx-auto leading-relaxed">
              I love hearing from fellow dreamers, poetry lovers, and kindred spirits. 
              Whether you want to share your thoughts about a poem, collaborate, or just say hello, 
              I'm here and I'm listening.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
                <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3 text-primary" />
                  Send Me a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-cormorant text-lg text-poetry-deep mb-2">
                      Your Beautiful Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                      placeholder="What should I call you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-cormorant text-lg text-poetry-deep mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                      placeholder="How can I reach you back?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block font-cormorant text-lg text-poetry-deep mb-2">
                      What's This About?
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                    >
                      <option value="">Choose a topic...</option>
                      <option value="poetry">About your poetry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="feedback">Feedback & thoughts</option>
                      <option value="general">Just saying hello</option>
                      <option value="other">Something else magical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-cormorant text-lg text-poetry-deep mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg leading-relaxed bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                      placeholder="Share your thoughts, dreams, or whatever's on your heart..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold text-lg magical-glow transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>✨ Send Your Message ✨</span>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-primary" />
                    Ways to Connect
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="font-cormorant text-lg text-poetry-deep">
                        tarini.dreams@magical.verse
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-cormorant text-poetry-deep/80 mt-4 leading-relaxed">
                    I read every message with my whole heart and try to respond within a few days. 
                    Your words matter to me, so please don't hesitate to reach out.
                  </p>
                </div>

                <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4">
                    What I Love to Hear About
                  </h3>
                  
                  <ul className="space-y-3 font-cormorant text-lg text-poetry-deep/80">
                    <li className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>How my poems made you feel</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Your own writing journey</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Ideas for collaborations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Book recommendations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Just saying hello!</span>
                    </li>
                  </ul>
                </div>

                <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 text-center">
                  <p className="font-dancing text-2xl text-primary mb-2">
                    "Every message is a gift"
                  </p>
                  <p className="font-cormorant text-poetry-deep/80 italic">
                    — Tarini
                  </p>
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
