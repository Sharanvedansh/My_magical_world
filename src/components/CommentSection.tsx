import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  approved: boolean;
}

interface CommentSectionProps {
  postId: string;
  postType: 'poem' | 'blog_post';
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, postType }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [postId, postType]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('post_type', postType)
        .eq('approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author_name.trim() || !newComment.author_email.trim() || !newComment.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          post_type: postType,
          author_name: newComment.author_name.trim(),
          author_email: newComment.author_email.trim(),
          content: newComment.content.trim()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your comment has been submitted for review! ✨"
      });

      setNewComment({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit comment",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-8 h-8 text-poetry-bronze/50 mx-auto mb-4 animate-pulse" />
        <p className="font-cormorant text-poetry-deep/70">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="border-t border-poetry-bronze/20 pt-8">
        <h3 className="font-playfair text-2xl text-poetry-deep mb-6 flex items-center">
          <MessageCircle className="w-6 h-6 mr-3 text-poetry-bronze" />
          Comments ({comments.length})
        </h3>

        {/* Existing Comments */}
        <div className="space-y-6 mb-8">
          {comments.length === 0 ? (
            <p className="font-cormorant text-poetry-deep/60 italic text-center py-8">
              No comments yet. Be the first to share your thoughts! ✨
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-poetry-cream/40 rounded-xl p-6 magical-glow">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-5 h-5 text-poetry-bronze" />
                  <span className="font-cormorant font-semibold text-poetry-deep">
                    {comment.author_name}
                  </span>
                  <div className="flex items-center space-x-2 text-poetry-deep/60">
                    <Calendar className="w-4 h-4" />
                    <span className="font-cormorant text-sm">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="font-cormorant text-poetry-deep leading-relaxed whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        <div className="bg-poetry-warm/60 rounded-xl p-6 backdrop-blur-sm magical-glow">
          <h4 className="font-playfair text-xl text-poetry-deep mb-4">Leave a Comment</h4>
          
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={newComment.author_name}
                onChange={(e) => setNewComment({...newComment, author_name: e.target.value})}
                className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                required
              />
              <input
                type="email"
                placeholder="Your email (not published)"
                value={newComment.author_email}
                onChange={(e) => setNewComment({...newComment, author_email: e.target.value})}
                className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                required
              />
            </div>
            
            <textarea
              placeholder="Share your thoughts..."
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              required
            />
            
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-lg hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Comment'}</span>
            </button>
          </form>
          
          <p className="text-sm text-poetry-deep/60 font-cormorant mt-3 italic">
            Comments are reviewed before being published. ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
