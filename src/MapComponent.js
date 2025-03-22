import React, { useEffect, useState } from 'react';

const MapComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Remplacez 'your_token_here' par le token d'authentification réel
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VG5aX1o4WlM2YTlYczJqckl4RTZLS0lNbjgyaTdxN3Z4cTRtY3dQOE13In0.eyJleHAiOjE3NDI4MTM0MjIsImlhdCI6MTc0MjY0MDYyMiwianRpIjoiZTdjMTA0YjQtY2UwMy00OTk0LWE1ZmItOWQwZmYzYWExMWE3IiwiaXNzIjoiaHR0cDovLzUxLjIxMC4xMTcuMjI6ODA4MS9yZWFsbXMvY29kZWxlbWFucyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MmIwOGFiNS0yZmZmLTQ2NDEtYmNjNC0xZGQzZTFiMjdiOTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b2xvbG8tYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIxYWQxMmZkZi1mYzI1LTQ3NDQtYTQwZC04NGRiYjFkODBjYjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtY29kZWxlbWFucyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjFhZDEyZmRmLWZjMjUtNDc0NC1hNDBkLTg0ZGJiMWQ4MGNiOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYXRheSIsInRlYW1faWQiOiJlOGNlZDFhMi0wMWQzLTRhY2QtYTYxNC00OGQ0NTk3YWZiNzMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsZXMtcHJvdGVjdGV1cnMtZHVyYWJsZXMiLCJnaXZlbl9uYW1lIjoiYXRheSJ9.dknHDd0j1BWG0xdDaMxoZcW_WSsTIrVYakObvRaFlIXW-8WNqlNPsEmyKisMpxZdYQG7T2i8YjH9Nyds3NBLowehn-3p68imCerXmdNHoQCHQ-tNMXy5vvYvf97kdSIFADsOu2LvwBq2IvzHV3_kQP5aqQXgNArnyqn36ktHrWjvoxkVuOm6xlbN-yPOnGOtxsP7X4l9nGxf8KIb84EXff7SRTbt6aJc_AlBWT5MgljsXoTYNiaKDiRS3XvYuOD7Z-0nz57FGkGObmLKmYkO48vo3VcaaarOM0zXOYd3WVyOpSviX5jmvz86NWysRitarAPUgH6r38BnJsqjTazZ7A';
  
  // URL de l'API pour récupérer la carte avec x_range et y_range en paramètre
  const apiUrl = 'http://51.210.117.22:8080/monde/map?x_range=0,32&y_range=0,32'; // Remplace les valeurs de x_range et y_range si nécessaire

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h1>Carte récupérée</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiComponent;
