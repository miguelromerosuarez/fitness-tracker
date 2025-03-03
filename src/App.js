import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ProgressChart from "./components/ProgressChart"; // Importamos el gráfico
import "./style.css"; // Asegúrate de que tu archivo CSS esté bien configurado

function App() {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    nombre: "",
    fecha: "",
    peso_kg: "",
    mme_kg: "",
    masa_grasa_kg: "",
    imc: "",
    pgc: "",
    rcc: "",
  });

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "fitness_data"));
      const fetchedData = querySnapshot.docs.map(doc => doc.data()).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setData(fetchedData);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "fitness_data"), newEntry);
    setData([...data, newEntry]);
  };

  return (
    <div>
      <h1>Fitness Tracker</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px", margin: "auto" }}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="date" name="fecha" onChange={handleChange} required />
        <input type="number" name="peso_kg" placeholder="Peso (kg)" onChange={handleChange} required />
        <input type="number" name="mme_kg" placeholder="MME (kg)" onChange={handleChange} required />
        <input type="number" name="masa_grasa_kg" placeholder="Masa Grasa (kg)" onChange={handleChange} required />
        <input type="number" name="imc" placeholder="IMC" onChange={handleChange} required />
        <input type="number" name="pgc" placeholder="PGC (%)" onChange={handleChange} required />
        <input type="number" name="rcc" placeholder="RCC" onChange={handleChange} required />
        <button type="submit" style={{ background: "#28a745", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
          Guardar
        </button>
      </form>

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Historial</h2>
      <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
        {data.map((entry, index) => (
          <li key={index} style={{ background: "#f8f9fa", padding: "10px", margin: "5px", borderRadius: "5px" }}>
            {entry.fecha} - {entry.nombre} - {entry.peso_kg} kg
          </li>
        ))}
      </ul>

      {/* Agregamos el gráfico de progreso */}
      <ProgressChart data={data} />
    </div>
  );
}

export default App;
