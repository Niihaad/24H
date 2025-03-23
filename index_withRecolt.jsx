import React, { useState, useEffect } from 'react';

const Grid_withRecolt = () => {
  const gridSize = 33; // Taille de la grille (33x33)
  const cellSize = 30; // Taille de chaque cellule (en pixels)

  const [villagers, setVillagers] = useState([]); // État pour stocker les villageois
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null); // ID du villageois sélectionné

  // État pour la quantité et le type de récolte
  const [quantite, setQuantite] = useState(0); // Quantité de récolte
  const [type, setType] = useState(""); // Type de récolte
  // Récupérer les villageois depuis l'API
  useEffect(() => {
    const fetchVillagers = async () => {
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4NjE1MTcsImlhdCI6MTc0MjY4ODcxNywianRpIjoiNzMwZWVmYTQtODQzNS00YjFlLWE0NWMtMzdiNjY5YTRlNTVhIiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlYTY2OTNlNi03MTJjLTRhMjYtYjU0OS05YmRhZTQ4MmJiMjgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiJjYmZkMjIzNS1lMTYzLTQ4Y2YtOTRkMi03MmE0ZDA5MGQ5NWMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImNiZmQyMjM1LWUxNjMtNDhjZi05NGQyLTcyYTRkMDkwZDk1YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiI1OTNhOGNjMS1iYmVjLTRjNGQtYTNhZi1lOTI2YzEzMjRlMzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMtZGV1eCIsImdpdmVuX25hbWUiOiJhdGF5In0.jJ-MRMYihh8gI6BU_1J5KLc_VlyUFHTXt5b2T2D3DnlDkMxO62I4S0tDIr60EqLe_xRI3HwAFTVstnfsQMwefaAHpCmuzn-i333a4OFurTb9AK-P6o0Ptlij7GF58gk0l0iyOfn0W001xVwzCEKxmBfuD3u-9yyTdSGXeaGzxPhSkpJGBGwo7fDcRtLyRKr9UWpkCjg42UUFR3os1pdSqmQWY0HZ9OfJ1Wb9RfK2OXxG42f8hHlMHGemguh7pGuWGqXlditEjqBwDdcdQ_DNxjeRytJrgo_0p7kbZmXsb5gteY6aTHNUvBpTFjopPIF_HtlezvqV1449xvpOa_rlsg";
      const url = "http://51.210.117.22:8080/equipes/593a8cc1-bbec-4c4d-a3af-e926c1324e33/villageois";

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
  // Fonction pour générer la grille avec les coordonnées
  const generateGrid = () => {
    let grid = [];
    // Remplir la grille avec les coordonnées inversées
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Les x (colonnes) vont de 0 à 32, et les y (lignes) vont de 32 à 0
        grid.push({ y: gridSize - 1 - i, x: j });
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
        if (direction === "haute") newY = Math.min(gridSize - 1, newY + 1);  // La direction "haute" diminue en Y, mais ici on l'inverse
        if (direction === "bas") newY = Math.max(0, newY - 1);  // La direction "bas" augmente en Y, mais ici on l'inverse
        if (direction === "gauche") newX = Math.max(0, newX - 1);
        if (direction === "droite") newX = Math.min(gridSize - 1, newX + 1);
      

        villager.positionX = newX;
        villager.positionY = newY;
      
      // Mettre à jour les coordonnées du villageois localement
      setVillagers(prevVillagers => 
        prevVillagers.map(v => 
          v.idVillageois === selectedCheckboxId 
          ? { ...v, positionX: newX, positionY: newY }
          : v
        )
      );

      // Envoyer la requête POST pour déplacer le villageois
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4NjE1MTcsImlhdCI6MTc0MjY4ODcxNywianRpIjoiNzMwZWVmYTQtODQzNS00YjFlLWE0NWMtMzdiNjY5YTRlNTVhIiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlYTY2OTNlNi03MTJjLTRhMjYtYjU0OS05YmRhZTQ4MmJiMjgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiJjYmZkMjIzNS1lMTYzLTQ4Y2YtOTRkMi03MmE0ZDA5MGQ5NWMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImNiZmQyMjM1LWUxNjMtNDhjZi05NGQyLTcyYTRkMDkwZDk1YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiI1OTNhOGNjMS1iYmVjLTRjNGQtYTNhZi1lOTI2YzEzMjRlMzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMtZGV1eCIsImdpdmVuX25hbWUiOiJhdGF5In0.jJ-MRMYihh8gI6BU_1J5KLc_VlyUFHTXt5b2T2D3DnlDkMxO62I4S0tDIr60EqLe_xRI3HwAFTVstnfsQMwefaAHpCmuzn-i333a4OFurTb9AK-P6o0Ptlij7GF58gk0l0iyOfn0W001xVwzCEKxmBfuD3u-9yyTdSGXeaGzxPhSkpJGBGwo7fDcRtLyRKr9UWpkCjg42UUFR3os1pdSqmQWY0HZ9OfJ1Wb9RfK2OXxG42f8hHlMHGemguh7pGuWGqXlditEjqBwDdcdQ_DNxjeRytJrgo_0p7kbZmXsb5gteY6aTHNUvBpTFjopPIF_HtlezvqV1449xvpOa_rlsg";
      const url = `http://51.210.117.22:8080/equipes/593a8cc1-bbec-4c4d-a3af-e926c1324e33/villageois/${selectedCheckboxId}/demander-action`;

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

  const [recolteEnCours, setRecolteEnCours] = useState(false);

  const autoRecolter = async () => {
    if (quantite <= 0 || type === "") {
      alert("Veuillez sélectionner une quantité et un type de récolte.");
      return;
    }
  
    setRecolteEnCours(true); // Indique que la récolte est en cours
  
    for (let i = 0; i < quantite; i++) {
      console.log(`Récolte automatique #${i + 1}`);
      await handleRecolter();
      await new Promise((resolve) => setTimeout(resolve, 12500)); // Attente de 12.5 secondes entre chaque récolte
    }
  
    setRecolteEnCours(false); // Réinitialiser l'état après la fin de la récolte
  };
  
  const handleRecolter = async () => {
    if (selectedCheckboxId && quantite > 0 && type !== "") {
      const villager = villagers.find((v) => v.idVillageois === selectedCheckboxId);
      if (!villager) {
        console.error("Aucun villageois sélectionné.");
        return;
      }
  
      const url = `http://51.210.117.22:8080/equipes/e8ced1a2-01d3-4acd-a614-48d4597afb73/villageois/${villager.idVillageois}/demander-action`;
  
      const body = {
        action: 'RECOLTER',
        reference: type, // Type de ressource (BOIS, FER, etc.)
        details: {
          quantite_recolte: 1, // Ici, on récolte 1 unité par itération
        },
      };
  
      const token = "your-token-here"; // Token should be securely stored or passed dynamically
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const text = await response.text(); // First, read the response as text
          if (text) { // If the response text is not empty
            const result = JSON.parse(text); // Then parse the text as JSON
            console.log('Récolte réussie', result);
          } else {
            console.error('Réponse vide reçue');
          }
        } else {
          console.error('Erreur lors de la récolte, status:', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
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

          <button className="px-4 py-2 m-1 bg-red-500 text-white rounded">Recycler</button>
        </div>
         {/* Champs pour la quantité et le type de récolte */}
         <div className="mt-4">
          <label htmlFor="quantite" className="block">Quantité de récolte :</label>
          <input
            type="number"
            id="quantite"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            className="px-4 py-2 m-1 border rounded"
          />
        </div>

        <div className="mt-4">
<label htmlFor="type" className="block">Type de récolte :</label>
<select
  id="type"
  value={type}
  onChange={(e) => setType(e.target.value)}
  className="px-4 py-2 m-1 border rounded"
>
  <option value="">Sélectionner une ressource...</option>
  <option value="BOIS">BOIS</option>
  <option value="FER">FER</option>
  <option value="CHARBON">CHARBON</option>
  <option value="NOURRITURE">NOURRITURE</option>
  <option value="PIERRE">PIERRE</option>
</select>
</div>



<div className="mt-4">
<button
  onClick={autoRecolter}
  className="px-4 py-2 m-1 bg-blue-500 text-white rounded"
>
  Récolte
</button>
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

export default Grid_withRecolt;
