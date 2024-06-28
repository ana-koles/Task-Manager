import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TodolistDomainType,
  selectTodolists,
  todolistsThunks,
} from "features/TodolistsList/model/todolists.slice";
import { TasksStateType, selectTasks } from "features/TodolistsList/model/tasks.slice";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { AppRootStateType } from "app/model/store";
import s from './TodoliLists.module.scss'

export const TodolistsList = () => {
  //через slice
  const tasks = useSelector<AppRootStateType, TasksStateType>(selectTasks);
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(selectTodolists);
  //через ф-цию selectors
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    addTodolist: addTodolistThunk,
    fetchTodolists,
  } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolist = useCallback((title: string) => {
    return addTodolistThunk(title).unwrap(); //добавляем return чтобы ф-ция addTodolist вернула промис, а не просто вызвала санку
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
