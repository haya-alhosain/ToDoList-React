import "./App.css";
import ToDoList from "./components/ToDoList";
import { TodosContext } from "./components/contexts/todosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

let initialTodos = [
  {
    id: uuidv4(),
    title: "reading",
    desc: "hdhdhhd",
    isDone: false,
  },
  {
    id: uuidv4(),
    title: "Swimming",
    desc: "hdhdhhd",
    isDone: false,
  },
];
export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div className="App">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <ToDoList />
      </TodosContext.Provider>
    </div>
  );
}
