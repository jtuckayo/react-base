import { useState } from "react";
import styles from "./TodoApp.module.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Todo App Practice</h2>
      <div className={styles.inputSection}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addButton}>Add</button>
      </div>
      <ul className={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className={styles.checkbox}
            />
            <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;