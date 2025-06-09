
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Mail, Heart, Send, MapPin, Star } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with the form data
    const mailtoLink = `mailto:varnika1947kaushik@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <div className="magical-glow book-shadow paper-texture rounded-2xl p-8">
              <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center">
                <Send className="w-8 h-8 mr-3 text-primary" />
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-cormorant text-lg text-poetry-deep mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/80 font-cormorant text-lg transition-all duration-300"
                      placeholder="What should I call you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cormorant text-lg text-poetry-deep mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/80 font-cormorant text-lg transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-cormorant text-lg text-poetry-deep mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/80 font-cormorant text-lg transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block font-cormorant text-lg text-poetry-deep mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-poetry-bronze/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-poetry-cream/80 font-cormorant text-lg leading-relaxed transition-all duration-300"
                    placeholder="Share your thoughts, dreams, or just say hello..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant text-lg font-semibold magical-glow transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>✨ Send with Love ✨</span>
                </button>
              </form>
            </div>

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
