import { useState } from "react";

export default function Grid() {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4MTM0MjIsImlhdCI6MTc0MjY0MDYyMiwianRpIjoiZTdjMTA0YjQtY2UwMy00OTk0LWE1ZmItOWQwZmYzYWExMWE3IiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MmIwOGFiNS0yZmZmLTQ2NDEtYmNjNC0xZGQzZTFiMjdiOTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIxYWQxMmZkZi1mYzI1LTQ3NDQtYTQwZC04NGRiYjFkODBjYjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjFhZDEyZmRmLWZjMjUtNDc0NC1hNDBkLTg0ZGJiMWQ4MGNiOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiJlOGNlZDFhMi0wMWQzLTRhY2QtYTYxNC00OGQ0NTk3YWZiNzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMiLCJnaXZlbl9uYW1lIjoiYXRheSJ9.dknHDd0j1BWG0xdDaMxoZcW_WSsTIrVYakObvRaFlIXW-8WNqlNPsEmyKisMpxZdYQG7T2i8YjH9Nyds3NBLowehn-3p68imCerXmdNHoQCHQ-tNMXy5vvYvf97kdSIFADsOu2LvwBq2IvzHV3_kQP5aqQXgNArnyqn36ktHrWjvoxkVuOm6xlbN-yPOnGOtxsP7X4l9nGxf8KIb84EXff7SRTbt6aJc_AlBWT5MgljsXoTYNiaKDiRS3XvYuOD7Z-0nz57FGkGObmLKmYkO48vo3VcaaarOM0zXOYd3WVyOpSviX5jmvz86NWysRitarAPUgH6r38BnJsqjTazZ7A';
  const [clickedCoords, setClickedCoords] = useState(null);
  const [apiResult, setApiResult] = useState([]);
  const gridSize = 33;

  const fetchData = async (x, y) => {
    try {
      const response = await fetch(
        `http://51.210.117.22:8080/monde/map?x_range=${x},${x}&y_range=${y},${y}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error("Données inattendues reçues de l'API", data);
        setApiResult([]);
        return;
      }

      const extractedData = data.map((item) => ({
        biomeNom: item?.biome?.nom || "Inconnu",
        ressources:
          item?.terrain?.ressourcesPresente?.map((ress) => ({
            nom: ress?.ressource?.nom || "Inconnu",
            type: ress?.ressource?.type || "Inconnu",
            quantite: ress?.quantite || 0,
          })) || [],
      }));

      setApiResult(extractedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      setApiResult([]);
    }
  };

  const handleClick = (x, y) => {
    setClickedCoords({ x, y });
    fetchData(x, y);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Conteneur de la grille */}
      <div className="grid grid-cols-[repeat(33,minmax(20px,1fr))] gap-1">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = Math.floor(index / gridSize);
          const y = index % gridSize;
          return (
            <button
              key={index}
              onClick={() => handleClick(x, y)}
              className="w-8 h-8 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-700"
            >
              {x},{y}
            </button>
          );
        })}
      </div>

      {/* Résultats API */}
      {apiResult.length > 0 && (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white w-80">
          {apiResult.map((item, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {item.biomeNom}
              </h2>
              {item.ressources.length > 0 ? (
                <ul className="space-y-2">
                  {item.ressources.map((ressource, resIndex) => (
                    <li key={resIndex} className="p-2 border rounded bg-gray-100">
                      <span className="font-semibold">{ressource.nom}</span> -{" "}
                      {ressource.type}
                      <span className="ml-2 text-gray-600">
                        (Quantité: {ressource.quantite})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Aucune ressource disponible.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
