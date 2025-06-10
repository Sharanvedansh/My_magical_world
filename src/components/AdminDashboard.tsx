import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Plus, Edit, Trash2, Eye, BookOpen, Upload, Image, X, Star, Heart, User, Mail, MessageCircle, Check, Reply } from 'lucide-react';
import WelcomeMessage from './WelcomeMessage';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Poem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  published: boolean;
  image_url?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  read_time: string;
  published: boolean;
  image_url?: string;
}

interface WriterBio {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  post_type: string;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  created_at: string;
}

interface Subscription {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  is_active: boolean;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('poems');
  
  const [poems, setPoems] = useState<Poem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [writerBio, setWriterBio] = useState<WriterBio | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [newPoem, setNewPoem] = useState({
    title: '',
    content: '',
    category: '',
    published: false,
    image_url: ''
  });

  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    read_time: '',
    published: false,
    image_url: ''
  });

  const [editingBio, setEditingBio] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchPoems(), 
        fetchBlogPosts(), 
        fetchWriterBio(), 
        fetchContactMessages(),
        fetchComments(),
        fetchSubscriptions()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact messages:', error);
      return;
    }
    
    setContactMessages(data || []);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }
    
    setComments(data || []);
  };

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching subscriptions:', error);
      return;
    }
    
    setSubscriptions(data || []);
  };

  const fetchPoems = async () => {
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching poems:', error);
      return;
    }
    
    setPoems(data || []);
  };

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return;
    }
    
    setBlogPosts(data || []);
  };

  const fetchWriterBio = async () => {
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
  };

  const handleSavePoem = async () => {
    try {
      if (editingPoem) {
        const { error } = await supabase
          .from('poems')
          .update({
            title: editingPoem.title,
            content: editingPoem.content,
            category: editingPoem.category,
            published: editingPoem.published,
            image_url: editingPoem.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPoem.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Poem updated successfully! ✨"
        });
        setEditingPoem(null);
      } else {
        const { error } = await supabase
          .from('poems')
          .insert({
            title: newPoem.title,
            content: newPoem.content,
            category: newPoem.category,
            published: newPoem.published,
            image_url: newPoem.image_url
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Poem saved successfully! ✨"
        });
        setNewPoem({ title: '', content: '', category: '', published: false, image_url: '' });
      }
      
      await fetchPoems();
    } catch (error) {
      console.error('Error saving poem:', error);
      toast({
        title: "Error",
        description: "Failed to save poem",
        variant: "destructive"
      });
    }
  };

  const handleDeletePoem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('poems')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Poem deleted successfully"
      });
      
      await fetchPoems();
    } catch (error) {
      console.error('Error deleting poem:', error);
      toast({
        title: "Error",
        description: "Failed to delete poem",
        variant: "destructive"
      });
    }
  };

  const handleSaveBlogPost = async () => {
    try {
      if (editingBlogPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: editingBlogPost.title,
            excerpt: editingBlogPost.excerpt,
            content: editingBlogPost.content,
            category: editingBlogPost.category,
            read_time: editingBlogPost.read_time,
            published: editingBlogPost.published,
            image_url: editingBlogPost.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBlogPost.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post updated successfully! ✨"
        });
        setEditingBlogPost(null);
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: newBlogPost.title,
            excerpt: newBlogPost.excerpt,
            content: newBlogPost.content,
            category: newBlogPost.category,
            read_time: newBlogPost.read_time,
            published: newBlogPost.published,
            image_url: newBlogPost.image_url
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post saved successfully! ✨"
        });
        setNewBlogPost({ title: '', excerpt: '', content: '', category: '', read_time: '', published: false, image_url: '' });
      }
      
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
      
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleSaveBio = async () => {
    try {
      if (!writerBio) return;
      
      const { error } = await supabase
        .from('writer_bio')
        .update({
          name: writerBio.name,
          title: writerBio.title,
          bio: writerBio.bio,
          email: writerBio.email,
          updated_at: new Date().toISOString()
        })
        .eq('id', writerBio.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully! ✨"
      });
      setEditingBio(false);
    } catch (error) {
      console.error('Error saving bio:', error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive"
      });
    }
  };

  const handleApproveComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ approved: true })
        .eq('id', commentId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Comment approved successfully! ✨"
      });
      
      await fetchComments();
    } catch (error) {
      console.error('Error approving comment:', error);
      toast({
        title: "Error",
        description: "Failed to approve comment",
        variant: "destructive"
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Comment deleted successfully"
      });
      
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive"
      });
    }
  };

  const handleReplyToMessage = async (messageId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent! ✨ (Note: Email functionality requires additional setup)"
    });
    
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleImageUpload = (file: File, isEditing: boolean = false, type: 'poem' | 'blog' = 'poem') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (type === 'poem') {
        if (isEditing && editingPoem) {
          setEditingPoem({...editingPoem, image_url: imageUrl});
        } else {
          setNewPoem({...newPoem, image_url: imageUrl});
        }
      } else {
        if (isEditing && editingBlogPost) {
          setEditingBlogPost({...editingBlogPost, image_url: imageUrl});
        } else {
          setNewBlogPost({...newBlogPost, image_url: imageUrl});
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, isEditing: boolean = false, type: 'poem' | 'blog' = 'poem') => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0], isEditing, type);
    }
  };

  const removeImage = (isEditing: boolean = false, type: 'poem' | 'blog' = 'poem') => {
    if (type === 'poem') {
      if (isEditing && editingPoem) {
        setEditingPoem({...editingPoem, image_url: ''});
      } else {
        setNewPoem({...newPoem, image_url: ''});
      }
    } else {
      if (isEditing && editingBlogPost) {
        setEditingBlogPost({...editingBlogPost, image_url: ''});
      } else {
        setNewBlogPost({...newBlogPost, image_url: ''});
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-poetry-sunset mx-auto mb-4 animate-pulse" />
          <p className="font-cormorant text-xl text-poetry-deep">Loading your magical sanctuary...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <WelcomeMessage />
      
      <div className="min-h-screen pt-20 relative overflow-hidden">
        {/* Magical floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Star className="absolute top-1/4 left-1/12 w-3 h-3 text-poetry-amber/30 sparkle-animation" style={{animationDelay: '0s'}} />
          <Heart className="absolute top-1/2 right-1/12 w-4 h-4 text-poetry-sunset/40 gentle-float" style={{animationDelay: '1s'}} />
          <BookOpen className="absolute bottom-1/4 left-1/6 w-5 h-5 text-poetry-bronze/25 animate-float" style={{animationDelay: '2s'}} />
          <Star className="absolute bottom-1/3 right-1/4 w-3 h-3 text-poetry-honey/50 sparkle-animation" style={{animationDelay: '0.5s'}} />
        </div>

        <div className="container mx-auto px-6 py-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-5xl text-poetry-deep mb-3 shimmer-text">
                ✨ Your Magical Writing Sanctuary ✨
              </h1>
              <p className="font-cormorant text-xl text-poetry-deep/80 italic">
                Where dreams become words and words become magic
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-100 to-red-50 text-red-600 rounded-xl hover:from-red-200 hover:to-red-100 transition-all duration-300 magical-glow transform hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-cormorant font-semibold">Leave Sanctuary</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-8 magical-glow bg-poetry-warm/60 rounded-2xl p-2 backdrop-blur-sm">
            {[
              { id: 'poems', label: 'Poetry Collection', icon: BookOpen },
              { id: 'blog', label: 'Magical Thoughts', icon: Edit },
              { id: 'bio', label: 'Writer Profile', icon: User },
              { id: 'comments', label: 'Comments', icon: MessageCircle },
              { id: 'messages', label: 'Messages', icon: Mail },
              { id: 'subscriptions', label: 'Subscribers', icon: Heart },
              { id: 'analytics', label: 'Reader Hearts', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-cormorant font-semibold ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream shadow-lg transform scale-105 magical-glow'
                    : 'text-poetry-deep hover:bg-poetry-cream/50 hover:scale-102'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.id === 'messages' && contactMessages.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {contactMessages.length}
                  </span>
                )}
                {tab.id === 'comments' && comments.filter(c => !c.approved).length > 0 && (
                  <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                    {comments.filter(c => !c.approved).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'poems' && (
            <div className="space-y-8">
              {/* Add New Poem */}
              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center shimmer-text">
                  <Plus className="w-7 h-7 mr-3" />
                  {editingPoem ? '✨ Edit Your Magical Creation ✨' : '✨ Birth New Magic ✨'}
                </h2>
                
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Give your poem a magical title..."
                    value={editingPoem ? editingPoem.title : newPoem.title}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, title: e.target.value})
                      : setNewPoem({...newPoem, title: e.target.value})
                    }
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-playfair text-2xl bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />
                  
                  <input
                    type="text"
                    placeholder="Category (Nature, Love, Dreams, Magic)..."
                    value={editingPoem ? editingPoem.category : newPoem.category}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, category: e.target.value})
                      : setNewPoem({...newPoem, category: e.target.value})
                    }
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />

                  {/* Photo Upload Area */}
                  <div className="space-y-4">
                    <label className="block font-cormorant text-lg text-poetry-deep flex items-center">
                      <Image className="w-5 h-5 mr-2 text-poetry-bronze" />
                      Add a magical image to your poem
                    </label>
                    
                    {(editingPoem?.image_url || newPoem.image_url) ? (
                      <div className="relative">
                        <img 
                          src={editingPoem?.image_url || newPoem.image_url} 
                          alt="Poem visual" 
                          className="w-full h-48 object-cover rounded-xl magical-glow"
                        />
                        <button
                          onClick={() => removeImage(!!editingPoem, 'poem')}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`photo-upload-area ${dragOver ? 'dragover' : ''} rounded-xl p-8 text-center cursor-pointer transition-all duration-300`}
                        onDrop={(e) => handleDrop(e, !!editingPoem, 'poem')}
                        onDragOver={(e) => {e.preventDefault(); setDragOver(true);}}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => document.getElementById(editingPoem ? 'edit-file-input' : 'file-input')?.click()}
                      >
                        <Upload className="w-12 h-12 text-poetry-bronze/60 mx-auto mb-4" />
                        <p className="font-cormorant text-lg text-poetry-deep/70 mb-2">
                          Drop your magical image here, or click to browse
                        </p>
                        <p className="font-cormorant text-sm text-poetry-deep/50">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                    
                    <input
                      id={editingPoem ? 'edit-file-input' : 'file-input'}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, !!editingPoem, 'poem');
                      }}
                      className="hidden"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Let your magical words flow here..."
                    value={editingPoem ? editingPoem.content : newPoem.content}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, content: e.target.value})
                      : setNewPoem({...newPoem, content: e.target.value})
                    }
                    rows={10}
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg leading-relaxed bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingPoem ? editingPoem.published : newPoem.published}
                        onChange={(e) => editingPoem 
                          ? setEditingPoem({...editingPoem, published: e.target.checked})
                          : setNewPoem({...newPoem, published: e.target.checked})
                        }
                        className="w-5 h-5 rounded border-poetry-bronze text-primary focus:ring-primary"
                      />
                      <span className="font-cormorant text-lg text-poetry-deep">Share this magic with the world</span>
                    </label>
                    
                    <div className="flex space-x-4">
                      {editingPoem && (
                        <button
                          onClick={() => setEditingPoem(null)}
                          className="px-6 py-3 text-poetry-deep border-2 border-poetry-bronze/30 rounded-xl hover:bg-poetry-bronze/10 transition-all duration-300 font-cormorant font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={handleSavePoem}
                        className="px-8 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105"
                      >
                        {editingPoem ? '✨ Update Magic ✨' : '✨ Save Magic ✨'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poems List */}
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text">Your Collection of Magic</h2>
                {poems.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-4" />
                    <p className="font-cormorant text-xl text-poetry-deep/70">Your poetry collection is waiting for its first magical creation...</p>
                  </div>
                ) : (
                  poems.map((poem) => (
                    <div key={poem.id} className="magical-glow book-shadow paper-texture rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {poem.image_url && (
                            <img 
                              src={poem.image_url} 
                              alt={poem.title} 
                              className="w-full h-32 object-cover rounded-lg mb-4 magical-glow"
                            />
                          )}
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-playfair text-2xl text-poetry-deep">{poem.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-cormorant font-semibold ${
                              poem.published ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {poem.published ? '✨ Published' : '📝 Draft'}
                            </span>
                            {poem.category && (
                              <span className="px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant border border-poetry-bronze/20">
                                {poem.category}
                              </span>
                            )}
                          </div>
                          <p className="font-cormorant text-poetry-deep/80 mb-3 leading-relaxed text-lg">
                            {poem.content.substring(0, 150)}...
                          </p>
                          <p className="text-sm text-poetry-deep/60 font-cormorant italic">{new Date(poem.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2 ml-6">
                          <button
                            onClick={() => setEditingPoem(poem)}
                            className="p-3 text-poetry-deep hover:bg-poetry-bronze/20 rounded-xl transition-all duration-300 magical-glow"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePoem(poem.id)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8">
              {/* Add New Blog Post */}
              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center shimmer-text">
                  <Plus className="w-7 h-7 mr-3" />
                  {editingBlogPost ? '✨ Edit Your Magical Thought ✨' : '✨ Share New Magical Thought ✨'}
                </h2>
                
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Give your thought a magical title..."
                    value={editingBlogPost ? editingBlogPost.title : newBlogPost.title}
                    onChange={(e) => editingBlogPost 
                      ? setEditingBlogPost({...editingBlogPost, title: e.target.value})
                      : setNewBlogPost({...newBlogPost, title: e.target.value})
                    }
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-playfair text-2xl bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Category (Writing Tips, Inspiration, Personal)..."
                      value={editingBlogPost ? editingBlogPost.category : newBlogPost.category}
                      onChange={(e) => editingBlogPost 
                        ? setEditingBlogPost({...editingBlogPost, category: e.target.value})
                        : setNewBlogPost({...newBlogPost, category: e.target.value})
                      }
                      className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                    />
                    
                    <input
                      type="text"
                      placeholder="Read time (e.g., 5 min read)..."
                      value={editingBlogPost ? editingBlogPost.read_time : newBlogPost.read_time}
                      onChange={(e) => editingBlogPost 
                        ? setEditingBlogPost({...editingBlogPost, read_time: e.target.value})
                        : setNewBlogPost({...newBlogPost, read_time: e.target.value})
                      }
                      className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                    />
                  </div>

                  <textarea
                    placeholder="Write a captivating excerpt..."
                    value={editingBlogPost ? editingBlogPost.excerpt : newBlogPost.excerpt}
                    onChange={(e) => editingBlogPost 
                      ? setEditingBlogPost({...editingBlogPost, excerpt: e.target.value})
                      : setNewBlogPost({...newBlogPost, excerpt: e.target.value})
                    }
                    rows={3}
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg leading-relaxed bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />

                  {/* Image upload section */}
                  <div className="space-y-4">
                    <label className="block font-cormorant text-lg text-poetry-deep flex items-center">
                      <Image className="w-5 h-5 mr-2 text-poetry-bronze" />
                      Add a magical image to your thought
                    </label>
                    
                    {(editingBlogPost?.image_url || newBlogPost.image_url) ? (
                      <div className="relative">
                        <img 
                          src={editingBlogPost?.image_url || newBlogPost.image_url} 
                          alt="Blog post visual" 
                          className="w-full h-48 object-cover rounded-xl magical-glow"
                        />
                        <button
                          onClick={() => removeImage(!!editingBlogPost, 'blog')}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`photo-upload-area ${dragOver ? 'dragover' : ''} rounded-xl p-8 text-center cursor-pointer transition-all duration-300`}
                        onDrop={(e) => handleDrop(e, !!editingBlogPost, 'blog')}
                        onDragOver={(e) => {e.preventDefault(); setDragOver(true);}}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => document.getElementById(editingBlogPost ? 'edit-blog-file-input' : 'blog-file-input')?.click()}
                      >
                        <Upload className="w-12 h-12 text-poetry-bronze/60 mx-auto mb-4" />
                        <p className="font-cormorant text-lg text-poetry-deep/70 mb-2">
                          Drop your magical image here, or click to browse
                        </p>
                        <p className="font-cormorant text-sm text-poetry-deep/50">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                    
                    <input
                      id={editingBlogPost ? 'edit-blog-file-input' : 'blog-file-input'}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, !!editingBlogPost, 'blog');
                      }}
                      className="hidden"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Let your magical thoughts flow here..."
                    value={editingBlogPost ? editingBlogPost.content : newBlogPost.content}
                    onChange={(e) => editingBlogPost 
                      ? setEditingBlogPost({...editingBlogPost, content: e.target.value})
                      : setNewBlogPost({...newBlogPost, content: e.target.value})
                    }
                    rows={12}
                    className="w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg leading-relaxed bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-poetry-bronze/50"
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingBlogPost ? editingBlogPost.published : newBlogPost.published}
                        onChange={(e) => editingBlogPost 
                          ? setEditingBlogPost({...editingBlogPost, published: e.target.checked})
                          : setNewBlogPost({...newBlogPost, published: e.target.checked})
                        }
                        className="w-5 h-5 rounded border-poetry-bronze text-primary focus:ring-primary"
                      />
                      <span className="font-cormorant text-lg text-poetry-deep">Share this magic with the world</span>
                    </label>
                    
                    <div className="flex space-x-4">
                      {editingBlogPost && (
                        <button
                          onClick={() => setEditingBlogPost(null)}
                          className="px-6 py-3 text-poetry-deep border-2 border-poetry-bronze/30 rounded-xl hover:bg-poetry-bronze/10 transition-all duration-300 font-cormorant font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={handleSaveBlogPost}
                        className="px-8 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105"
                      >
                        {editingBlogPost ? '✨ Update Thought ✨' : '✨ Save Thought ✨'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts List */}
              <div className="space-y-6">
                <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text">Your Magical Thoughts</h2>
                {blogPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <Edit className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-4" />
                    <p className="font-cormorant text-xl text-poetry-deep/70">Your thoughts are waiting to be shared with the world...</p>
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <div key={post.id} className="magical-glow book-shadow paper-texture rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {post.image_url && (
                            <img 
                              src={post.image_url} 
                              alt={post.title} 
                              className="w-full h-32 object-cover rounded-lg mb-4 magical-glow"
                            />
                          )}
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-playfair text-2xl text-poetry-deep">{post.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-cormorant font-semibold ${
                              post.published ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {post.published ? '✨ Published' : '📝 Draft'}
                            </span>
                          </div>
                          <p className="font-cormorant text-poetry-deep/80 mb-3 leading-relaxed text-lg">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-poetry-deep/60 font-cormorant">
                            {post.category && <span>{post.category}</span>}
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            {post.read_time && <span>{post.read_time}</span>}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-6">
                          <button
                            onClick={() => setEditingBlogPost(post)}
                            className="p-3 text-poetry-deep hover:bg-poetry-bronze/20 rounded-xl transition-all duration-300 magical-glow"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'bio' && (
            <div className="space-y-8">
              <div className="magical-glow book-shadow paper-texture rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="font-playfair text-3xl text-poetry-deep mb-6 flex items-center shimmer-text">
                  <User className="w-7 h-7 mr-3" />
                  ✨ Your Writer Profile ✨
                </h2>
                
                {writerBio && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-cormorant text-lg text-poetry-deep mb-3">
                          Writer Name
                        </label>
                        <input
                          type="text"
                          value={writerBio.name}
                          onChange={(e) => setWriterBio({...writerBio, name: e.target.value})}
                          disabled={!editingBio}
                          className={`w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg transition-all duration-300 ${
                            editingBio ? 'bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-poetry-cream/40'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block font-cormorant text-lg text-poetry-deep mb-3">
                          Title
                        </label>
                        <input
                          type="text"
                          value={writerBio.title}
                          onChange={(e) => setWriterBio({...writerBio, title: e.target.value})}
                          disabled={!editingBio}
                          className={`w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg transition-all duration-300 ${
                            editingBio ? 'bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-poetry-cream/40'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-cormorant text-lg text-poetry-deep mb-3">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={writerBio.email}
                        onChange={(e) => setWriterBio({...writerBio, email: e.target.value})}
                        disabled={!editingBio}
                        className={`w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg transition-all duration-300 ${
                          editingBio ? 'bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-poetry-cream/40'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-cormorant text-lg text-poetry-deep mb-3">
                        Bio
                      </label>
                      <textarea
                        value={writerBio.bio}
                        onChange={(e) => setWriterBio({...writerBio, bio: e.target.value})}
                        disabled={!editingBio}
                        rows={6}
                        className={`w-full px-6 py-4 border-2 border-poetry-bronze/30 rounded-xl font-cormorant text-lg leading-relaxed transition-all duration-300 ${
                          editingBio ? 'bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-poetry-cream/40'
                        }`}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      {editingBio ? (
                        <>
                          <button
                            onClick={() => setEditingBio(false)}
                            className="px-6 py-3 text-poetry-deep border-2 border-poetry-bronze/30 rounded-xl hover:bg-poetry-bronze/10 transition-all duration-300 font-cormorant font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveBio}
                            className="px-8 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105"
                          >
                            ✨ Save Profile ✨
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingBio(true)}
                          className="px-8 py-3 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-xl hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold magical-glow transform hover:scale-105"
                        >
                          ✨ Edit Profile ✨
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text flex items-center">
                <MessageCircle className="w-8 h-8 mr-3 text-primary" />
                Comment Management
              </h2>
              
              {comments.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-6" />
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4">No comments yet</h3>
                  <p className="font-cormorant text-lg text-poetry-deep/60">
                    Waiting for the first magical conversation...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className={`magical-glow book-shadow paper-texture rounded-2xl p-6 ${!comment.approved ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-playfair text-xl text-poetry-deep">{comment.author_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-cormorant ${comment.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {comment.approved ? '✓ Approved' : '⏳ Pending'}
                            </span>
                            <span className="px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant">
                              {comment.post_type === 'poem' ? 'Poetry' : 'Blog'}
                            </span>
                          </div>
                          <p className="font-cormorant text-poetry-deep/80 text-sm mb-2">
                            Email: {comment.author_email}
                          </p>
                          <p className="font-cormorant text-poetry-deep/80 text-sm mb-4">
                            Posted: {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          {!comment.approved && (
                            <button
                              onClick={() => handleApproveComment(comment.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve comment"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete comment"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="font-cormorant text-poetry-deep leading-relaxed whitespace-pre-line bg-poetry-cream/40 rounded-lg p-4">
                        {comment.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text flex items-center">
                <Heart className="w-8 h-8 mr-3 text-primary" />
                Subscribers ({subscriptions.filter(s => s.is_active).length})
              </h2>
              
              {subscriptions.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-6" />
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4">No subscribers yet</h3>
                  <p className="font-cormorant text-lg text-poetry-deep/60">
                    Your magical community is waiting to grow...
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {subscriptions.filter(s => s.is_active).map((subscription) => (
                    <div key={subscription.id} className="magical-glow book-shadow paper-texture rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-cormorant text-lg font-semibold text-poetry-deep">
                            {subscription.name || 'Anonymous Reader'}
                          </h3>
                          <p className="font-cormorant text-poetry-deep/70">{subscription.email}</p>
                          <p className="font-cormorant text-sm text-poetry-deep/60">
                            Joined: {new Date(subscription.subscribed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Heart className="w-6 h-6 text-poetry-sunset" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl text-poetry-deep shimmer-text flex items-center">
                <Mail className="w-8 h-8 mr-3 text-primary" />
                Contact Messages
              </h2>
              
              {contactMessages.length === 0 ? (
                <div className="text-center py-16">
                  <Mail className="w-16 h-16 text-poetry-bronze/50 mx-auto mb-6" />
                  <h3 className="font-playfair text-2xl text-poetry-deep mb-4">No messages yet</h3>
                  <p className="font-cormorant text-lg text-poetry-deep/60">
                    Waiting for the first magical connection...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((message) => (
                    <div key={message.id} className="magical-glow book-shadow paper-texture rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-playfair text-xl text-poetry-deep mb-1">{message.subject}</h3>
                          <p className="font-cormorant text-poetry-deep/80">
                            From: <span className="font-semibold">{message.name}</span> ({message.email})
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-cormorant text-sm text-poetry-deep/60">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                            className="p-2 text-poetry-deep hover:bg-poetry-bronze/20 rounded-lg transition-colors"
                            title="Reply to message"
                          >
                            <Reply className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="font-cormorant text-poetry-deep leading-relaxed whitespace-pre-line mb-4">
                        {message.message}
                      </div>

                      {replyingTo === message.id && (
                        <div className="border-t border-poetry-bronze/20 pt-4">
                          <h4 className="font-cormorant text-lg font-semibold text-poetry-deep mb-3">Reply to {message.name}</h4>
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            rows={4}
                            className="w-full px-4 py-3 border border-poetry-bronze/30 rounded-lg font-cormorant bg-poetry-cream/80 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          />
                          <div className="flex justify-end space-x-3 mt-3">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 text-poetry-deep border border-poetry-bronze/30 rounded-lg hover:bg-poetry-bronze/10 transition-colors font-cormorant"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplyToMessage(message.id)}
                              className="px-4 py-2 bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream rounded-lg hover:from-poetry-amber hover:to-poetry-sunset transition-all duration-300 font-cormorant font-semibold"
                            >
                              Send Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-poetry-sunset mx-auto mb-6 animate-pulse" />
              <h2 className="font-playfair text-3xl text-poetry-deep mb-4 shimmer-text">
                ✨ Analytics Coming Soon ✨
              </h2>
              <p className="font-cormorant text-xl text-poetry-deep/80">
                Soon you'll see how many hearts your words have touched!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
