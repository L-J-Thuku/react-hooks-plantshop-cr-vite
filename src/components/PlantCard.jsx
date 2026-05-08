import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, price, isSoldOut } = plant;

  const getPlantEmoji = (name) => {
    const emojis = {
      'monstera': '🌿',
      'snake': '🐍',
      'fiddle': '🎻',
      'aloe': '🌵',
      'peace': '🤍',
      'zz': '🍃',
      'pothos': '🍃',
      'jade': '💚',
    };
    
    for (const [key, emoji] of Object.entries(emojis)) {
      if (name.toLowerCase().includes(key)) {
        return emoji;
      }
    }
    return '🌱';
  };

  return (
    <div data-testid="plant-item" className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-2">
            {getPlantEmoji(name)}
          </div>
          <div className="text-white text-opacity-90 text-sm font-medium">
            {name}
          </div>
        </div>
        
        {isSoldOut && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Sold Out
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">${price}</p>
        
        <button 
          onClick={() => onToggleSoldOut(id)}
          className="w-full py-2.5 rounded-xl font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700"
        >
          {isSoldOut ? 'Restock' : 'Add to Cart'}
        </button>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{isSoldOut ? 'Out of stock' : 'In stock'}</span>
            <span className="text-green-600">{isSoldOut ? '❌' : '✅ Available'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;