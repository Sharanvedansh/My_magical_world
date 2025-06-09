
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Poetry', path: '/poetry' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-poetry-cream/90 backdrop-blur-sm border-b border-poetry-dusty/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <PenTool className="w-6 h-6 text-poetry-deep group-hover:text-primary transition-colors" />
            <span className="font-dancing text-2xl text-poetry-deep group-hover:text-primary transition-colors">
              Poetry & Dreams
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-cormorant text-lg transition-all duration-300 hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-poetry-deep hover:border-b-2 hover:border-primary/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            to="/admin"
            className="text-sm text-poetry-deep/60 hover:text-primary transition-colors font-cormorant"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
