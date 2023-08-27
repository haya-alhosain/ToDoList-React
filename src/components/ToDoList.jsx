/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
// Toggle Button
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
// inputs
import TextField from "@mui/material/TextField";
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "./contexts/todosContext";
import { useToast } from "./contexts/ToastContext";
// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDoList() {
  // HOOKS //
  const [titleInput, setTitleInput] = useState("");
  const [todoType, setTodoType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);

  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) ?? []);
  }, []);
  //  Done & Not Done Filteration
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isDone;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isDone;
    });
  }, [todos]);
  // ======================================   HOOKS   ================================== //
  let todosToBeRender = todos;
  if (todoType == "done") {
    todosToBeRender = completedTodos;
  } else if (todoType == "notDone") {
    todosToBeRender = notCompletedTodos;
  } else {
    todosToBeRender = todos;
  }

  const todosList = todosToBeRender.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  // Add Task
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      desc: "",
      isDone: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast("تمت الإضافة بنجاح");
  }
  // ====================================== Delete Todo =====================================//
  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function handleDeleteConfirm() {
    let deleteTodo = todos.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodos(deleteTodo);
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح");
  }
  // ====================================== Delete Todo =====================================//

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function openUpdateDialog(todo) {
    setShowUpdateDialog(true);
    setDialogTodo(todo);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          desc: dialogTodo.desc,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
    showHideToast("تم التحديث بنجاح");
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
            onClick={handleDeleteConfirm}
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
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={dialogTodo?.desc}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, desc: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <div className="flex">
        <Container maxWidth="sm">
          <Card sx={{ minWidth: 275, height: "75vh", overflowY: "scroll" }}>
            <CardContent>
              <Typography variant="h5" style={{ margin: "20px 0 0 0" }}>
                My Tasks
              </Typography>
            </CardContent>
            {/* Buttons */}
            <ToggleButtonGroup
              style={{ margin: "15px 0" }}
              value={todoType}
              onChange={(e) => setTodoType(e.target.value)}
            >
              <ToggleButton className="toggleBtn" value="all">
                all
              </ToggleButton>
              <ToggleButton className="toggleBtn" value="done">
                Done
              </ToggleButton>
              <ToggleButton className="toggleBtn" value="notDone">
                Not done
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Todos */}
            {todosList}

            {/* Inputs */}
            <Grid container spacing={2} sx={{ margin: "0px 15px" }}>
              <Grid xs={8}>
                <TextField
                  id="addInput"
                  label="Add Task"
                  variant="outlined"
                  style={{ width: "100%", height: "100%" }}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={handleAddClick}
                  disabled={titleInput.length == 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </div>
    </>
  );
}
