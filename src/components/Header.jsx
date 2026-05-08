import React from 'react';

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plantsy</h1>
              <p className="text-sm text-gray-500">Indoor Plant Shop</p>
            </div>
          </div>
          
          <nav className="flex gap-6">
            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Shop</a>
            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </nav>
          
          <div className="flex gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
