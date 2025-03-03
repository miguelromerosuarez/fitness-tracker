import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
      const fetchedData = querySnapshot.docs.map(doc => doc.data());
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="date" name="fecha" onChange={handleChange} required />
        <input type="number" name="peso_kg" placeholder="Peso (kg)" onChange={handleChange} required />
        <input type="number" name="mme_kg" placeholder="MME (kg)" onChange={handleChange} required />
        <input type="number" name="masa_grasa_kg" placeholder="Masa Grasa (kg)" onChange={handleChange} required />
        <input type="number" name="imc" placeholder="IMC" onChange={handleChange} required />
        <input type="number" name="pgc" placeholder="PGC (%)" onChange={handleChange} required />
        <input type="number" name="rcc" placeholder="RCC" onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>
      <h2>Historial</h2>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>{entry.fecha} - {entry.nombre} - {entry.peso_kg} kg</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

