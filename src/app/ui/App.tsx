import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CircularProgress,
  Container,
} from "@mui/material";
import { Login } from "features/auth/ui/login/login";
/* import "./App.css"; */
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";
import {selectIsInitialized } from "app/model/app.reducer";
import { AppRootStateType } from "app/model/store";
import { AppBarComponent } from "./AppBar/AppBar";
import s from './App.module.css'


function App() {
  //через ф-ции из файла selectors
  //const status = useSelector(selectAppStatus);
  //const isInitialized = useSelector(selectIsInitialized);

 //через slice
  const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized)

  const { initializeApp} = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!isInitialized) {
    return (
      <div className={s.progress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBarComponent/>

      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Container>

      </div>
    </BrowserRouter>
  );
}

export default App;
