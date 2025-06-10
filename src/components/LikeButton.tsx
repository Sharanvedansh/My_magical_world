
import React from 'react';
import { Heart } from 'lucide-react';
import { useLikes } from '@/hooks/useLikes';

interface LikeButtonProps {
  postId: string;
  postType: 'poem' | 'blog_post';
  className?: string;
}

const LikeButton = ({ postId, postType, className = '' }: LikeButtonProps) => {
  const { likesCount, hasLiked, loading, toggleLike } = useLikes(postId, postType);

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${
        hasLiked 
          ? 'bg-red-100 text-red-600 border border-red-200' 
          : 'bg-poetry-cream/80 text-poetry-deep border border-poetry-bronze/30 hover:bg-red-50'
      } ${className}`}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${hasLiked ? 'fill-current' : ''}`} 
      />
      <span className="font-cormorant font-semibold">
        {likesCount} {likesCount === 1 ? 'Heart' : 'Hearts'}
      </span>
    </button>
  );
};

export default LikeButton;
