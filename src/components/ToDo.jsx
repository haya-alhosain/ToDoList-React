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
// Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodos, setUpdateTodos] = useState({
    title: todo.title,
    desc: todo.desc,
  });
  //  Done Todo
  function handleCheckClick(id) {
    let updatedTodos = todos.map((t) => {
      // eslint-disable-next-line eqeqeq
      if (t.id == id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // Delete Todo
  function handleDeleteConfirm(id) {
    let deleteTodo = todos.filter((t) => {
      // eslint-disable-next-line eqeqeq
      return t.id != id;
    });
    setTodos(deleteTodo);
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
  }
  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  // Update Todo
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      // eslint-disable-next-line eqeqeq
      if (t.id == todo.id) {
        return { ...t, title: updateTodos.title, desc: updateTodos.desc };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setShowUpdateDialog(false);
  }
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to delete the task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You can't undo deleting a task
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: "capitalize" }}
            onClick={handleDeleteClose}
          >
            Close
          </Button>
          <Button
            style={{ color: "red", textTransform: "capitalize" }}
            onClick={() => handleDeleteConfirm(todo.id)}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={showUpdateDialog} onClose={handleUpdateClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            value={updateTodos.title}
            onChange={(e) =>
              setUpdateTodos({ ...updateTodos, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={updateTodos.desc}
            onChange={(e) =>
              setUpdateTodos({ ...updateTodos, desc: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={() => handleUpdateConfirm()}>Confirm</Button>
        </DialogActions>
      </Dialog>

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
                onClick={() => setShowDeleteDialog(true)}
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
                onClick={() => setShowUpdateDialog(true)}
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
