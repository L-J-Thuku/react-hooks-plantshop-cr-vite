import React, { useState } from 'react';

function ImageGallery({ onSelectImage, currentImageUrl = '' }) {
  const [showGallery, setShowGallery] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Plant data with built-in gradients (no external images needed)
  const plantImages = [
    { name: 'Monstera Deliciosa', price: 45.99, emoji: '🌿', color: 'from-green-400 to-emerald-500' },
    { name: 'Snake Plant', price: 25.99, emoji: '🐍', color: 'from-emerald-400 to-teal-500' },
    { name: 'Fiddle Leaf Fig', price: 65.99, emoji: '🎻', color: 'from-teal-400 to-cyan-500' },
    { name: 'Aloe Vera', price: 19.99, emoji: '🌵', color: 'from-cyan-400 to-sky-500' },
    { name: 'Peace Lily', price: 35.99, emoji: '🤍', color: 'from-sky-400 to-blue-500' },
    { name: 'ZZ Plant', price: 39.99, emoji: '🍃', color: 'from-blue-400 to-indigo-500' },
    { name: 'Pothos', price: 15.99, emoji: '🍃', color: 'from-indigo-400 to-purple-500' },
    { name: 'Jade Plant', price: 22.99, emoji: '💚', color: 'from-purple-400 to-pink-500' },
    { name: 'Spider Plant', price: 18.99, emoji: '🕷️', color: 'from-pink-400 to-rose-500' },
    { name: 'Rubber Plant', price: 42.99, emoji: '🌳', color: 'from-rose-400 to-red-500' },
    { name: 'Boston Fern', price: 24.99, emoji: '🍃', color: 'from-green-500 to-lime-500' },
    { name: 'Cactus', price: 12.99, emoji: '🌵', color: 'from-lime-500 to-yellow-500' },
    { name: 'Orchid', price: 49.99, emoji: '🌸', color: 'from-purple-500 to-fuchsia-500' },
    { name: 'Bonsai', price: 89.99, emoji: '🎋', color: 'from-amber-500 to-orange-500' },
    { name: 'Succulent', price: 8.99, emoji: '🌵', color: 'from-orange-500 to-red-500' },
  ];

  const filteredImages = plantImages.filter(img =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (imageData) => {
    // Create a data URL for the gradient image
    const svgImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%234caf50'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='white' font-size='40'%3E${imageData.emoji}%3C/text%3E%3Ctext x='100' y='140' text-anchor='middle' fill='white' font-size='14'%3E${imageData.name}%3C/text%3E%3C/svg%3E`;
    onSelectImage(svgImage);
    setShowGallery(false);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setShowGallery(true)}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
      >
        <span className="text-xl">📸</span>
        Browse Plant Gallery ({plantImages.length}+ plants)
      </button>

      {showGallery && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Plant Image Gallery 🌿</h3>
                  <p className="text-sm text-gray-600 mt-1">Click any plant to select it</p>
                </div>
                <button 
                  onClick={() => setShowGallery(false)} 
                  className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="🔍 Search plants by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              {searchTerm && (
                <div className="mt-2 text-sm text-gray-500">
                  Found {filteredImages.length} result{filteredImages.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌱</div>
                  <p className="text-gray-500 text-lg">No plants found matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleImageClick(img)}
                      className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className={`aspect-square bg-gradient-to-br ${img.color} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {img.emoji}
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-center text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                          {img.name}
                        </p>
                        <p className="text-center text-xs text-gray-500 mt-1">
                          ${img.price}
                        </p>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-center text-green-600 font-medium">
                            Click to select →
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                💡 Click any plant to add it to your collection
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;