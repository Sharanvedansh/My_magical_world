
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLikes = (postId: string, postType: 'poem' | 'blog_post') => {
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get user's IP address (simplified - using a mock approach)
  const getUserIP = async () => {
    try {
      // In production, you'd use a proper IP detection service
      // For now, we'll use a combination of timestamp and browser fingerprint
      const fingerprint = `${navigator.userAgent}_${screen.width}_${screen.height}_${new Date().toDateString()}`;
      return btoa(fingerprint).substring(0, 50);
    } catch {
      return 'anonymous_user';
    }
  };

  // Fetch likes count and user's like status
  const fetchLikes = async () => {
    try {
      const { data: likes, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('post_type', postType);

      if (error) throw error;

      setLikesCount(likes?.length || 0);

      // Check if current user has liked
      const userIP = await getUserIP();
      const userLike = likes?.find(like => like.user_ip === userIP);
      setHasLiked(!!userLike);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  // Toggle like
  const toggleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const userIP = await getUserIP();

      if (hasLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('post_type', postType)
          .eq('user_ip', userIP);

        if (error) throw error;

        setLikesCount(prev => prev - 1);
        setHasLiked(false);
        toast({
          title: "💔 Like removed",
          description: "Your like has been removed"
        });
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            post_type: postType,
            user_ip: userIP
          });

        if (error) throw error;

        setLikesCount(prev => prev + 1);
        setHasLiked(true);
        toast({
          title: "❤️ Liked!",
          description: "Thank you for showing love!"
        });
      }
    } catch (error: any) {
      console.error('Error toggling like:', error);
      if (error.message?.includes('duplicate key')) {
        toast({
          title: "Already liked",
          description: "You've already liked this post",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update like",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId, postType]);

  return {
    likesCount,
    hasLiked,
    loading,
    toggleLike
  };
};
