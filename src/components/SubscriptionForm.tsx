
import React, { useState } from 'react';
import { Mail, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim() || null
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter! ✨"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success",
          description: "Welcome to our magical community! You'll receive notifications about new posts. ✨"
        });
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-poetry-honey/20 to-poetry-amber/20 rounded-2xl p-8 magical-glow backdrop-blur-sm">
      <div className="text-center mb-6">
        <Bell className="w-12 h-12 text-poetry-bronze mx-auto mb-4" />
        <h3 className="font-playfair text-2xl text-poetry-deep mb-3">
          ✨ Join Our Magical Journey ✨
        </h3>
        <p className="font-cormorant text-lg text-poetry-deep/80">
          Subscribe to receive notifications when new poems and thoughts are shared
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-lg hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <Mail className="w-5 h-5" />
          <span>{loading ? 'Subscribing...' : 'Subscribe to Updates'}</span>
        </button>
      </form>
      
      <p className="text-sm text-poetry-deep/60 font-cormorant text-center mt-4 italic">
        No spam, just pure magic delivered to your inbox ✨
      </p>
    </div>
  );
};

export default SubscriptionForm;
