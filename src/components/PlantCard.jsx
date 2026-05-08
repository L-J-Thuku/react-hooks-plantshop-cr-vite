import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, price, isSoldOut } = plant;

  // Generate a consistent color based on plant name
  const getPlantColor = (name) => {
    const colors = [
      'from-green-400 to-emerald-500',
      'from-emerald-400 to-teal-500',
      'from-teal-400 to-cyan-500',
      'from-cyan-400 to-sky-500',
      'from-sky-400 to-blue-500',
      'from-blue-400 to-indigo-500',
      'from-indigo-400 to-purple-500',
      'from-purple-400 to-pink-500',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Get emoji based on plant name
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
      'spider': '🕷️',
      'rubber': '🌳',
    };
    
    for (const [key, emoji] of Object.entries(emojis)) {
      if (name.toLowerCase().includes(key)) {
        return emoji;
      }
    }
    return '🌱';
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient Image Placeholder */}
      <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${getPlantColor(name)} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-7xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
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
        
        {/* Decorative circles */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-2xl font-bold text-green-600 mb-4">
          ${price.toFixed(2)}
        </p>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onToggleSoldOut(id)}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
              isSoldOut 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isSoldOut ? '📦 Restock' : '🛒 Add to Cart'}
          </button>
        </div>
        
        {/* Stock indicator */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {isSoldOut ? 'Out of stock' : 'In stock'}
            </span>
            <span className="text-green-600">
              {isSoldOut ? '❌' : '✅ Available'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;