import { useState, useEffect } from "react";
import "./styles.css";

// 1. ao clicar no item, ele é tido como "done"
// 2. uma linha "line-through" é adicionada, indicando que o item está done
// 3. o controle deve ser via js
export default function App() {
  const defaultTodo = { name: "", isDone: false };
  const [todo, setTodo] = useState(defaultTodo);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log({ todoList });
  }, [todoList]);

  // useEffect(() => {
  //   console.log({ todo });
  //   console.log({ todoList });
  // }, [todo]);

  function addTodo() {
    if (!todo.name) return;
    setTodoList((prev) => [...prev, todo]);
    setTodo(defaultTodo);
  }

  function handleDeleteTodo(position) {
    setTodoList((prev) => prev.filter((todo, i) => position !== i));
  }

  function handleEnter(e) {
    if (e.key === "Enter") addTodo();
  }

  function handleCheckTask(e, taskName) {
    // forma "por extenso"
    // const newTodoList = todoList.map((el) => {
    //   if (el.name === taskName) {
    //     return { ...el, isDone: e.target.checked };
    //   }
    //   return el;
    // });

    // forma "esperta"
    // const newTodoList = todoList.map((el) =>
    //   el.name === taskName ? { ...el, isDone: e.target.checked } : el
    // );

    setTodoList((prev) =>
      prev.map((el) =>
        el.name === taskName ? { ...el, isDone: e.target.checked } : el
      )
    );
  }

  return (
    <main>
      <header>TaskDo</header>

      <section className="pending-task-counter">
        <p>👨🏽‍💻</p>
        <p>4 tasks pending</p>
      </section>

      <input
        className="new-task-input"
        onChange={(event) => {
          setTodo((prev) => {
            return { name: event.target.value, isDone: false };
          });
        }}
        onKeyDown={handleEnter}
        type="text"
        placeholder="Add New Task"
        value={todo.name}
      />
      <button className="new-task-button" onClick={addTodo}>
        +
      </button>

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
                <label className={`todo-label ${todo.isDone ? "is-done" : ""}`}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckTask(e, todo.name)}
                  />
                  <span className="item-desc">{todo.name}</span>
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
