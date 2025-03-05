import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://achieve-goal-back.onrender.com";

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const userId = 1; // ВРЕМЕННО: Нужно заменить на реальный ID пользователя

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/goals/${userId}`);
      setGoals(response.data);
    } catch (error) {
      console.error("Ошибка загрузки целей", error);
    }
  };

  const addGoal = async () => {
    if (!newGoal.trim()) return;
    try {
      await axios.post(`${API_URL}/goals/create`, {
        user_id: userId,
        title: newGoal,
        category: "General",
        deadline: null,
      });
      setNewGoal("");
      fetchGoals();
    } catch (error) {
      console.error("Ошибка добавления цели", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🎯 Трекер целей</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Введите цель..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          onClick={addGoal}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Добавить цель
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {goals.length === 0 ? (
          <p className="text-gray-600 text-center">У вас пока нет целей. Добавьте первую!</p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-3"
            >
              <p className="font-semibold">{goal.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
