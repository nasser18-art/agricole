'use client';

import React, { useState } from 'react';
import { Menu, X, Bell, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  username: string;
  handleLogout: () => void;
}

export default function Header({ username, handleLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 h-1"></div>

      <div className="container mx-auto px-4 py-4 max-w-7xl flex justify-between items-center">
        {/* Logo et branding */}
        <div className="flex items-center gap-4">
          <img src="/agricole.webp" alt="Banque Agricole" className="h-10 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Banque Agricole</span>
            <span className="text-xs text-gray-600">Espace personnel</span>
          </div>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition font-medium">
            Accueil
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition font-medium">
            Comptes
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition font-medium">
            Services
          </a>
        </nav>

        {/* Section droite */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-600 rounded-full"></span>
          </button>

          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
            <Settings size={20} className="text-gray-700" />
          </button>

          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{username.split(' ')[0]}</p>
              <p className="text-xs text-gray-500">Client</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition shadow-md hover:shadow-lg"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-3 px-4 pb-4">
          <a href="#" className="block text-sm text-gray-700 hover:text-green-600 font-medium py-2">
            Accueil
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-green-600 font-medium py-2">
            Comptes
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-green-600 font-medium py-2">
            Services
          </a>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-3">{username}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </header>
  );
}