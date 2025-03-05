import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://achieve-goal-back.onrender.com"; // URL бэкенда

function App() {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/goals/1`) // Запрашиваем данные
      .then(response => {
        console.log("✅ Данные загружены:", response.data);
        setGoals([response.data]); // Оборачиваем в массив для списка
      })
      .catch(error => {
        console.error("❌ Ошибка загрузки целей", error);
        setError("Ошибка загрузки целей");
      });
  }, []);

  return (
    <div>
      <h1>Мои цели</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : goals.length > 0 ? (
        <ul>
          {goals.map((goal) => (
            <li key={goal.goal_id}>{goal.title} ({goal.category})</li>
          ))}
        </ul>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default App;
