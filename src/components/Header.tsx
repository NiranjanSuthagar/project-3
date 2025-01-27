import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Zap, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 z-50 flex items-center justify-between px-4 h-16 border-b border-gray-800 backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
          <Menu className="text-gray-400 hover:text-green-400 transition-colors duration-300" size={24} />
        </button>
        <Link to="/" className="flex items-center gap-2 group">
          <Zap className="text-green-500 transform group-hover:rotate-12 transition-transform duration-300" size={32} />
          <span className="text-2xl font-bold laser-text bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            TechTube
          </span>
        </Link>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex group">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-full focus:border-green-500 focus:outline-none text-gray-100 placeholder-gray-500 transition-all duration-300"
          />
          <button className="px-6 py-2 bg-gray-800 border border-l-0 border-gray-700 rounded-r-full hover:bg-gray-700 group-hover:border-green-500 transition-all duration-300">
            <Search className="text-gray-400 group-hover:text-green-400 transition-colors duration-300" size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
          <Bell className="text-gray-400 hover:text-green-400 transition-colors duration-300" size={24} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
          <User className="text-gray-400 hover:text-green-400 transition-colors duration-300" size={24} />
        </button>
      </div>
    </header>
  );
}