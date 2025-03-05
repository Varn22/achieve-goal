import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";  // Подключаем Tailwind

const API_URL = "https://achieve-goal-back.onrender.com/goals";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log("✅ Данные загружены:", response.data);
        setGoals(response.data);
      })
      .catch(error => {
        console.error("❌ Ошибка загрузки целей:", error);
        setError("Ошибка загрузки целей");
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setGoals(goals.filter(goal => goal.id !== id));
      })
      .catch(error => console.error("Ошибка удаления", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Мои цели</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {goals.map(goal => (
          <li key={goal.id} className="border p-2 mt-2 flex justify-between">
            {goal.title} ({goal.category})
            <button onClick={() => handleDelete(goal.id)} className="bg-red-500 text-white px-2 rounded">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

