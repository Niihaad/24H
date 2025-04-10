import React, { useState, useEffect } from 'react';

const Grid = () => {
  const gridSize = 33; // Taille de la grille (33x33)
  const cellSize = 30; // Taille de chaque cellule (en pixels)

  const [villagers, setVillagers] = useState([]); // État pour stocker les villageois
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null); // ID du villageois sélectionné

  // Récupérer les villageois depuis l'API
  useEffect(() => {
    const fetchVillagers = async () => {
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4MTM0MjIsImlhdCI6MTc0MjY0MDYyMiwianRpIjoiZTdjMTA0YjQtY2UwMy00OTk0LWE1ZmItOWQwZmYzYWExMWE3IiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MmIwOGFiNS0yZmZmLTQ2NDEtYmNjNC0xZGQzZTFiMjdiOTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIxYWQxMmZkZi1mYzI1LTQ3NDQtYTQwZC04NGRiYjFkODBjYjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjFhZDEyZmRmLWZjMjUtNDc0NC1hNDBkLTg0ZGJiMWQ4MGNiOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiJlOGNlZDFhMi0wMWQzLTRhY2QtYTYxNC00OGQ0NTk3YWZiNzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMiLCJnaXZlbl9uYW1lIjoiYXRheSJ9.dknHDd0j1BWG0xdDaMxoZcW_WSsTIrVYakObvRaFlIXW-8WNqlNPsEmyKisMpxZdYQG7T2i8YjH9Nyds3NBLowehn-3p68imCerXmdNHoQCHQ-tNMXy5vvYvf97kdSIFADsOu2LvwBq2IvzHV3_kQP5aqQXgNArnyqn36ktHrWjvoxkVuOm6xlbN-yPOnGOtxsP7X4l9nGxf8KIb84EXff7SRTbt6aJc_AlBWT5MgljsXoTYNiaKDiRS3XvYuOD7Z-0nz57FGkGObmLKmYkO48vo3VcaaarOM0zXOYd3WVyOpSviX5jmvz86NWysRitarAPUgH6r38BnJsqjTazZ7A";
      const url = "http://51.210.117.22:8080/equipes/e8ced1a2-01d3-4acd-a614-48d4597afb73/villageois";

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVillagers(data); // Mettre à jour l'état avec les villageois récupérés
        console.log(data); // Affichage des villageois dans la console
      } else {
        console.error('Erreur lors de la récupération des villageois');
      }
    };

    fetchVillagers(); // Appeler la fonction pour récupérer les villageois lors du chargement du composant
  }, []);

  // Fonction pour gérer les changements d'état des cases à cocher
  const handleCheckboxChange = (id) => {
    // Si la case est déjà sélectionnée, on la désélectionne
    if (selectedCheckboxId === id) {
      setSelectedCheckboxId(null);
    } else {
      setSelectedCheckboxId(id); // Sinon on la sélectionne
    }
  };

  // Fonction pour générer la grille avec les coordonnées
  const generateGrid = () => {
    let grid = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid.push({ x: i, y: j }); // Inverser ici pour avoir (y, x) au lieu de (x, y)
      }
    }
    return grid;
  };
  

  const [hoveredCell, setHoveredCell] = useState(null);

  // Lorsque la souris passe sur une cellule
  const handleMouseOver = (x, y) => {
    setHoveredCell({ x, y });
  };

  // Lorsque la souris quitte la cellule
  const handleMouseOut = () => {
    setHoveredCell(null);
  };

  const moveVillager = async (direction) => {
    if (!selectedCheckboxId) return; // Si aucun villageois n'est sélectionné, ne rien faire

    const villager = villagers.find(v => v.idVillageois === selectedCheckboxId);

    if (villager) {
      let newX = villager.positionX;
      let newY = villager.positionY;

      // Modifier la position en fonction de la direction
      if (direction === "gauche") newY = Math.max(0, newY - 1);
      if (direction === "droite") newY = Math.min(gridSize - 1, newY + 1);
      if (direction === "haute") newX = Math.max(0, newX - 1);
      if (direction === "bas") newX = Math.min(gridSize - 1, newX + 1);

      // Mettre à jour les coordonnées du villageois localement
      setVillagers(prevVillagers => 
        prevVillagers.map(v => 
          v.idVillageois === selectedCheckboxId 
          ? { ...v, positionX: newX, positionY: newY }
          : v
        )
      );

      // Envoyer la requête POST pour déplacer le villageois
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4MTM0MjIsImlhdCI6MTc0MjY0MDYyMiwianRpIjoiZTdjMTA0YjQtY2UwMy00OTk0LWE1ZmItOWQwZmYzYWExMWE3IiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MmIwOGFiNS0yZmZmLTQ2NDEtYmNjNC0xZGQzZTFiMjdiOTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIxYWQxMmZkZi1mYzI1LTQ3NDQtYTQwZC04NGRiYjFkODBjYjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjFhZDEyZmRmLWZjMjUtNDc0NC1hNDBkLTg0ZGJiMWQ4MGNiOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiJlOGNlZDFhMi0wMWQzLTRhY2QtYTYxNC00OGQ0NTk3YWZiNzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMiLCJnaXZlbl9uYW1lIjoiYXRheSJ9.dknHDd0j1BWG0xdDaMxoZcW_WSsTIrVYakObvRaFlIXW-8WNqlNPsEmyKisMpxZdYQG7T2i8YjH9Nyds3NBLowehn-3p68imCerXmdNHoQCHQ-tNMXy5vvYvf97kdSIFADsOu2LvwBq2IvzHV3_kQP5aqQXgNArnyqn36ktHrWjvoxkVuOm6xlbN-yPOnGOtxsP7X4l9nGxf8KIb84EXff7SRTbt6aJc_AlBWT5MgljsXoTYNiaKDiRS3XvYuOD7Z-0nz57FGkGObmLKmYkO48vo3VcaaarOM0zXOYd3WVyOpSviX5jmvz86NWysRitarAPUgH6r38BnJsqjTazZ7A";
      const url = `http://51.210.117.22:8080/equipes/e8ced1a2-01d3-4acd-a614-48d4597afb73/villageois/${selectedCheckboxId}/demander-action`;

      const body = JSON.stringify({
        action: `DEPLACEMENT_${direction.toUpperCase()}`, 
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body,
      });

      if (response.ok) {
        console.log(`Déplacement du villageois ${selectedCheckboxId} vers ${direction}`);
      } else {
        console.error('Erreur lors de l\'envoi de la requête');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid gap-2 grid-cols-6">
        {/* Colonne pour les cases à cocher */}
        <div className="flex flex-col items-center">
          {villagers.map((villager) => (
            <div key={villager.idVillageois} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedCheckboxId === villager.idVillageois}
                onChange={() => handleCheckboxChange(villager.idVillageois)}
                className="mr-2"
              />
              <span>{villager.nom}</span>
            </div>
          ))}
          
          {/* Affichage de l'ID du villageois sélectionné juste en dessous des cases à cocher */}
          <div className="mt-4">
            {selectedCheckboxId ? (
              <p>Villageois sélectionné : ID = {selectedCheckboxId}</p>
            ) : (
              <p>Aucun villageois sélectionné</p>
            )}
          </div>

          {/* Boutons juste en dessous des cases à cocher */}
          <div className="mt-4">
            <button onClick={() => moveVillager("bas")} className="px-4 py-2 m-1 bg-blue-500 text-white rounded">Bas</button>
            <button onClick={() => moveVillager("haute")} className="px-4 py-2 m-1 bg-blue-500 text-white rounded">Haute</button>
            <button onClick={() => moveVillager("gauche")} className="px-4 py-2 m-1 bg-blue-500 text-white rounded">Gauche</button>
            <button onClick={() => moveVillager("droite")} className="px-4 py-2 m-1 bg-blue-500 text-white rounded">Droite</button>

            <button className="px-4 py-2 m-1 bg-green-500 text-white rounded">Récolter</button>
            <button className="px-4 py-2 m-1 bg-red-500 text-white rounded">Recycler</button>
          </div>
        </div>

        {/* Grille des cellules */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
            maxWidth: `${gridSize * cellSize + 2 * (gridSize - 1)}px`, // Ajuste la largeur de la grille
          }}
        >
          {generateGrid().map((cell, index) => {
            // Vérifier si un villageois se trouve sur cette cellule
            const villager = villagers.find(
              (villager) => villager.positionX === cell.x && villager.positionY === cell.y
            );

            return (
              <div
                key={index}
                className="bg-gray-400 flex justify-center items-center relative"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                onMouseOver={() => handleMouseOver(cell.x, cell.y)} // Affichage des coordonnées au survol
                onMouseOut={handleMouseOut}
              >
                {hoveredCell && hoveredCell.x === cell.x && hoveredCell.y === cell.y && (
                  <span className="text-xs text-black absolute">
                    ({cell.x},{cell.y}) {/* Affiche les coordonnées */}
                  </span>
                )}

                {/* Si un villageois est trouvé à cette position, afficher son image */}
                {villager && (
                  <img
                    src="./assets2D/villagers/villager.png"
                    alt={villager.nom}
                    className={`absolute ${selectedCheckboxId === villager.idVillageois ? 'border-4 border-red-500' : ''}`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grid;
