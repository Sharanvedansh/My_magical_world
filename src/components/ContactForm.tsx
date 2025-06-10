
import React, { useState } from 'react';
import { Send, Heart, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save message to database
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) throw error;

      toast({
        title: "✨ Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon!"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
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
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant text-lg font-semibold magical-glow transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-poetry-cream border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              <span>✨ Send with Love ✨</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
