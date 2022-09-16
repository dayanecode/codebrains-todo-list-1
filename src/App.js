import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  function addTodo() {
    if (!todo) return;
    setTodoList((prev) => [...prev, todo]);
    setTodo("");
  }

  function handleDeleteTodo(position) {
    setTodoList((prev) => prev.filter((todo, i) => position !== i));
  }

  function handleEnter(e) {
    if (e.key === "Enter") addTodo();
  }

  return (
    <section className="main">
      <input
        onChange={(event) => {
          setTodo(event.target.value);
        }}
        onKeyDown={handleEnter}
        type="text"
        placeholder="Coloque aqui seu afazer"
        value={todo}
      />
      <button onClick={addTodo}>Add</button>

      {!todoList.length ? (
        <ul>"Sua lista está vazia"</ul>
      ) : (
        <ul id="todo-list">
          {todoList.map((todo, i) => {
            return (
              <li className="todo-item" key={i}>
                <button
                  className="delete-item"
                  onClick={() => handleDeleteTodo(i)}
                >
                  &#128465;
                </button>
                <label class="todo-label">
                  <input type="checkbox" />
                  <span className="item-desc">{todo}</span>
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
