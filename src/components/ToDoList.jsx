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
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "./contexts/todosContext";

export default function ToDoList() {
  const [titleInput, setTitleInput] = useState("");
  const [todoType, setTodoType] = useState("all");

  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Done & Not Done Filteration
  const completedTodos = todos.filter((t) => {
    return t.isDone;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.isDone;
  });

  let todosToBeRender = todos;
  // eslint-disable-next-line eqeqeq
  if (todoType == "done") {
    todosToBeRender = completedTodos;
    // eslint-disable-next-line eqeqeq
  } else if (todoType == "notDone") {
    todosToBeRender = notCompletedTodos;
  } else {
    todosToBeRender = todos;
  }
  const todosList = todosToBeRender.map((t) => {
    return <ToDo key={t.id} todo={t} />;
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
  }

  return (
    <div className="flex">
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, height: "80vh", overflow: "scroll" }}>
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
                // id="outlined-basic"
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
                // eslint-disable-next-line eqeqeq
                disabled={titleInput.length == 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
