import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

const TodoList = ({ tasksProgress }) => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  const addTodo = () => {
    const newTodo = {
      id: count,
      text: inputValue,
    };
    if (inputValue.trim() === "") return;
    if (
      todos.some((todo) => todo.text.toLowerCase() === inputValue.toLowerCase())
    ) {
      setError("This tasks already exists");
      return;
    }

    setCount((prevCount) => prevCount + 1);
    setTodos([...todos, newTodo]);
    setInputValue("");
    setError("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTask = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ marginBottom: "20px" }}>
          <TextField
            size="small"
            label="Введите значение"
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <IconButton color="secondary" onClick={addTodo}>
            <AddCircleOutlineIcon />
          </IconButton>
          {error && (
            <Stack sx={{ width: "19%" }} spacing={2}>
              <Alert severity="error">{error}</Alert>
            </Stack>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Чтобы блоки переходили на новую строку при нехватке места
            alignItems: "start", // Выравниваем по верхнему краю
            gap: "20px", // Добавляем расстояние между блоками
          }}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTask={editTask}
              tasksProgress={tasksProgress}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default TodoList;
