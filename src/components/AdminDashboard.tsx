
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react';
import WelcomeMessage from './WelcomeMessage';

interface Poem {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  published: boolean;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('poems');
  const [poems, setPoems] = useState<Poem[]>([
    {
      id: '1',
      title: 'Whispers of Dawn',
      content: 'In the quiet hours before sunrise...',
      category: 'Nature',
      date: '2024-01-15',
      published: true
    },
    {
      id: '2',
      title: 'City Dreams',
      content: 'Concrete and steel cannot contain...',
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
    published: false
  });

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
      setNewPoem({ title: '', content: '', category: '', published: false });
    }
  };

  const handleDeletePoem = (id: string) => {
    setPoems(poems.filter(p => p.id !== id));
  };

  return (
    <>
      <WelcomeMessage />
      
      <div className="min-h-screen bg-poetry-cream pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-4xl text-poetry-deep mb-2">
                Writing Sanctuary
              </h1>
              <p className="font-cormorant text-lg text-poetry-deep/70">
                Your magical space to create and share
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-cormorant">Logout</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white/50 rounded-lg p-1">
            {[
              { id: 'poems', label: 'Poems', icon: BookOpen },
              { id: 'blog', label: 'Blog Posts', icon: Edit },
              { id: 'analytics', label: 'Analytics', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all font-cormorant ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-poetry-deep hover:bg-white/70'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'poems' && (
            <div className="space-y-6">
              {/* Add New Poem */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h2 className="font-playfair text-2xl text-poetry-deep mb-4 flex items-center">
                  <Plus className="w-6 h-6 mr-2" />
                  {editingPoem ? 'Edit Poem' : 'Create New Poem'}
                </h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Poem title..."
                    value={editingPoem ? editingPoem.title : newPoem.title}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, title: e.target.value})
                      : setNewPoem({...newPoem, title: e.target.value})
                    }
                    className="w-full px-4 py-3 border border-poetry-dusty/30 rounded-lg font-playfair text-xl bg-white/70"
                  />
                  
                  <input
                    type="text"
                    placeholder="Category (e.g., Nature, Love, Life)..."
                    value={editingPoem ? editingPoem.category : newPoem.category}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, category: e.target.value})
                      : setNewPoem({...newPoem, category: e.target.value})
                    }
                    className="w-full px-4 py-3 border border-poetry-dusty/30 rounded-lg font-cormorant bg-white/70"
                  />
                  
                  <textarea
                    placeholder="Write your poem here..."
                    value={editingPoem ? editingPoem.content : newPoem.content}
                    onChange={(e) => editingPoem 
                      ? setEditingPoem({...editingPoem, content: e.target.value})
                      : setNewPoem({...newPoem, content: e.target.value})
                    }
                    rows={8}
                    className="w-full px-4 py-3 border border-poetry-dusty/30 rounded-lg font-cormorant text-lg leading-relaxed bg-white/70"
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingPoem ? editingPoem.published : newPoem.published}
                        onChange={(e) => editingPoem 
                          ? setEditingPoem({...editingPoem, published: e.target.checked})
                          : setNewPoem({...newPoem, published: e.target.checked})
                        }
                        className="rounded border-poetry-dusty"
                      />
                      <span className="font-cormorant text-poetry-deep">Publish immediately</span>
                    </label>
                    
                    <div className="flex space-x-3">
                      {editingPoem && (
                        <button
                          onClick={() => setEditingPoem(null)}
                          className="px-4 py-2 text-poetry-deep border border-poetry-dusty rounded-lg hover:bg-poetry-dusty/20 transition-colors font-cormorant"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={handleSavePoem}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-cormorant"
                      >
                        {editingPoem ? 'Update Poem' : 'Save Poem'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poems List */}
              <div className="space-y-4">
                <h2 className="font-playfair text-2xl text-poetry-deep">Your Poems</h2>
                {poems.map((poem) => (
                  <div key={poem.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-playfair text-xl text-poetry-deep">{poem.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-cormorant ${
                            poem.published ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {poem.published ? 'Published' : 'Draft'}
                          </span>
                          <span className="px-2 py-1 bg-poetry-lavender text-poetry-deep rounded-full text-xs font-cormorant">
                            {poem.category}
                          </span>
                        </div>
                        <p className="font-cormorant text-poetry-deep/70 mb-2">
                          {poem.content.substring(0, 100)}...
                        </p>
                        <p className="text-sm text-poetry-deep/50 font-cormorant">{poem.date}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => setEditingPoem(poem)}
                          className="p-2 text-poetry-deep hover:bg-poetry-dusty/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePoem(poem.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
