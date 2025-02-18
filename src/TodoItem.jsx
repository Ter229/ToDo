import React, { useState, useEffect } from "react";
import { Button, Checkbox, IconButton, Paper, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

const TodoItem = ({ todo, deleteTodo, editTask, tasksProgress }) => {
  const [inputTask, setTaskValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [select, setSelect] = useState("ALL");
  const [count, setCount] = useState(0);
  const [editTaskValue, setEditTaskValue] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const addTask = () => {
    const newTasks = {
      id: count,
      text: inputTask,
      complete: false,
    };

    if (inputTask.trim() === "") return;

    setCount(count + 1);
    setTasks([...tasks, newTasks]);
    setTaskValue("");
  };

  const deleteTodoItem = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const handleSave = () => {
    if (editText.trim() !== "") {
      editTask(todo.id, editText);
    }
    setEditTaskValue(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (select === "ACTIVE") return !task.complete;
    if (select === "COMPLETED") return task.complete;
    return true;
  });

  const countTask = () => {
    const completedTasksCount = tasks.filter((task) => task.complete).length;
    tasksProgress(completedTasksCount);
  };
  useEffect(() => {
    countTask();
  }, [tasks]);
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
        minHeight: "150px", // Фиксируем высоту для одинаковых блоков
        minWidth: "200px",
        maxWidth: "350px",
      }}
      elevation={3}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {editTaskValue ? (
          <TextField
            size="small"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <>
            <div>{todo.text}</div>
          </>
        )}

        <div>
          <IconButton
            onClick={() => {
              setEditTaskValue(!editTaskValue), editTask();
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => deleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ marginBottom: "10px", marginTop: "10px" }}
          size="small"
          label="Введите задачу"
          variant="outlined"
          onChange={(e) => setTaskValue(e.target.value)}
          value={inputTask}
        />
        <IconButton color="secondary" onClick={addTask}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      {filteredTasks.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Checkbox
              color="secondary"
              checked={item.complete}
              onChange={() => {
                toggleComplete(item.id);
              }}
            />
            {item.text}
          </div>
          <IconButton onClick={() => deleteTodoItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
        <Button
          size="small"
          onClick={() => {
            setSelect("ALL");
          }}
          color="secondary"
          sx={{
            backgroundColor:
              select === "ALL"
                ? (theme) =>
                    theme.palette.mode === "dark" ? "#333a40" : "#afb9c9"
                : "transparent",
          }}
        >
          ALL
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setSelect("ACTIVE");
          }}
          sx={{
            backgroundColor:
              select === "ACTIVE"
                ? (theme) =>
                    theme.palette.mode === "dark" ? "#333a40" : "#afb9c9"
                : "transparent",
          }}
        >
          ACTIVE
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setSelect("COMPLETED");
          }}
          sx={{
            backgroundColor:
              select === "COMPLETED"
                ? (theme) =>
                    theme.palette.mode === "dark" ? "#333a40" : "#afb9c9"
                : "transparent",
          }}
        >
          COMPLETED
        </Button>
      </div>
    </Paper>
  );
};

export default TodoItem;
