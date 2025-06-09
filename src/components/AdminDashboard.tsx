
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Plus, Edit, Trash2, Eye, BookOpen, Upload, Image, X, Star, Heart } from 'lucide-react';
import WelcomeMessage from './WelcomeMessage';

interface Poem {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  published: boolean;
  image?: string;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('poems');
  const [poems, setPoems] = useState<Poem[]>([
    {
      id: '1',
      title: 'Whispers of Dawn',
      content: 'In the quiet hours before sunrise,\nWhen the world holds its breath,\nI find pieces of my soul\nScattered like morning dew...',
      category: 'Nature',
      date: '2024-01-15',
      published: true
    },
    {
      id: '2',
      title: 'City Dreams',
      content: 'Concrete and steel cannot contain\nThe dreams that dance in my heart,\nUrban symphonies play\nIn the rhythm of my steps...',
      category: 'Urban',
      date: '2024-01-10',
      published: false
    }
  ]);

  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [newPoem, setNewPoem] = useState({
    title: '',
    content: '',
    category: '',
    published: false,
    image: ''
  });

  const [dragOver, setDragOver] = useState(false);

  const handleSavePoem = () => {
    if (editingPoem) {
      setPoems(poems.map(p => p.id === editingPoem.id ? editingPoem : p));
      setEditingPoem(null);
    } else {
      const poem: Poem = {
        id: Date.now().toString(),
        ...newPoem,
        date: new Date().toISOString().split('T')[0]
      };
      setPoems([...poems, poem]);
      setNewPoem({ title: '', content: '', category: '', published: false, image: '' });
    }
  };

  const handleDeletePoem = (id: string) => {
    setPoems(poems.filter(p => p.id !== id));
  };

  const handleImageUpload = (file: File, isEditing: boolean = false) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (isEditing && editingPoem) {
        setEditingPoem({...editingPoem, image: imageUrl});
      } else {
        setNewPoem({...newPoem, image: imageUrl});
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, isEditing: boolean = false) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0], isEditing);
    }
  };

  const removeImage = (isEditing: boolean = false) => {
    if (isEditing && editingPoem) {
      setEditingPoem({...editingPoem, image: ''});
    } else {
      setNewPoem({...newPoem, image: ''});
    }
  };

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
              { id: 'analytics', label: 'Reader Hearts', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 font-cormorant font-semibold ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-poetry-bronze to-poetry-amber text-poetry-cream shadow-lg transform scale-105 magical-glow'
                    : 'text-poetry-deep hover:bg-poetry-cream/50 hover:scale-102'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
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
                    
                    {(editingPoem?.image || newPoem.image) ? (
                      <div className="relative">
                        <img 
                          src={editingPoem?.image || newPoem.image} 
                          alt="Poem visual" 
                          className="w-full h-48 object-cover rounded-xl magical-glow"
                        />
                        <button
                          onClick={() => removeImage(!!editingPoem)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`photo-upload-area ${dragOver ? 'dragover' : ''} rounded-xl p-8 text-center cursor-pointer transition-all duration-300`}
                        onDrop={(e) => handleDrop(e, !!editingPoem)}
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
                        if (file) handleImageUpload(file, !!editingPoem);
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
                {poems.map((poem) => (
                  <div key={poem.id} className="magical-glow book-shadow paper-texture rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {poem.image && (
                          <img 
                            src={poem.image} 
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
                          <span className="px-3 py-1 bg-poetry-honey/30 text-poetry-deep rounded-full text-sm font-cormorant border border-poetry-bronze/20">
                            {poem.category}
                          </span>
                        </div>
                        <p className="font-cormorant text-poetry-deep/80 mb-3 leading-relaxed text-lg">
                          {poem.content.substring(0, 150)}...
                        </p>
                        <p className="text-sm text-poetry-deep/60 font-cormorant italic">{poem.date}</p>
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
