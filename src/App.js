import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://achieve-goal-back.onrender.com"; // Backend API URL

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [category, setCategory] = useState("General");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch goals from the backend
  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/goals/1`); // Replace with actual user ID
      setGoals(response.data);
    } catch (error) {
      console.error("Ошибка загрузки целей", error);
    }
  };

  // Add a new goal
  const addGoal = async () => {
    if (!newGoal) return;
    try {
      await axios.post(`${API_URL}/goals/create`, {
        user_id: 1, // Replace with actual user ID
        title: newGoal,
        category: category,
        deadline: deadline || null,
      });
      setNewGoal("");
      setCategory("General");
      setDeadline("");
      fetchGoals();
    } catch (error) {
      console.error("Ошибка добавления цели", error);
    }
  };

  // Mark goal as completed
  const markGoalCompleted = async (goalId) => {
    try {
      await axios.post(`${API_URL}/progress/mark`, {
        user_id: 1, // Replace with actual user ID
        goal_id: goalId,
        date: new Date().toISOString().split("T")[0],
      });
      fetchGoals();
    } catch (error) {
      console.error("Ошибка отметки выполнения", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Трекер целей</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Введите цель"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <input
          type="date"
          placeholder="Дедлайн"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <button onClick={addGoal} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Добавить цель
        </button>
      </div>
      <div>
        {goals.map((goal) => (
          <div key={goal.id} className="mb-2 p-4 border rounded flex justify-between">
            <span>{goal.title} ({goal.category}) - Дедлайн: {goal.deadline || "Нет"}</span>
            <button onClick={() => markGoalCompleted(goal.id)} className="bg-green-500 text-white p-2 rounded">
              Выполнено
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
