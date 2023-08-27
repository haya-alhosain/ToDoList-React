/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
// Buttons Icons
import IconButton from "@mui/material/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "./contexts/todosContext";
import { useToast } from "./contexts/ToastContext";

export default function ToDo({ todo, showDelete, showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    desc: todo.desc,
  });
  //  Done Todo
  function handleCheckClick(id) {
    let updatedTodos = todos.map((t) => {
      if (t.id == id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التعديل بنجاح");
  }
  function DeleteClick() {
    showDelete(todo);
  }
  function UpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
      {/* To Do Section */}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            style={{
              margin: "-10px 15px",
              border: "2px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <Grid xs={8} className="toDo">
              <h3 style={{ marginBottom: "8px" }}>{todo.title}</h3>
              <p style={{ fontSize: "14px" }}>{todo.desc}</p>
            </Grid>
            <Grid
              xs={4}
              className="toDo"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                size="small"
                className="iconButton"
                style={{
                  border: "2px solid #b23c17",
                  color: "#b23c17",
                }}
                onClick={DeleteClick}
              >
                <DeleteOutlineOutlinedIcon className="icon" />
              </IconButton>
              <IconButton
                size="small"
                className="iconButton"
                style={{
                  border: "2px solid #1769aa",
                  color: "#1769aa",
                }}
                onClick={UpdateClick}
              >
                <ModeEditOutlineOutlinedIcon className="icon" />
              </IconButton>
              <IconButton
                size="small"
                className="iconButton"
                style={{
                  border: "2px solid #8bc34a",
                  color: todo.isDone ? "#fff" : "#8bc34a",
                  background: todo.isDone ? "#8bc34a" : "#fff",
                }}
                onClick={() => handleCheckClick(todo.id)}
              >
                <CheckOutlinedIcon className="icon" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
