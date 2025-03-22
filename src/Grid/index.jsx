import React from "react";

const Grid = () => {
  const gridSize = 33;
  const totalCells = gridSize * gridSize;
  const images = Array.from({ length: totalCells }, (_, index) => `https://picsum.photos/40/40?random=${index}`); // Génère des images aléatoires

  return (
    <div className="grid grid-cols-33 w-full max-w-6xl mx-auto p-4 mt-0 ml-0" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '0px' }}>
      {images.map((src, index) => (
        <div key={index} className="w-10 h-10">
          <img src={src} alt={`Cell ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Grid;
