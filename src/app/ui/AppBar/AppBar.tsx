import { Menu } from "@mui/icons-material";
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { RequestStatusType, selectAppStatus } from "app/model/app.reducer";
import { AppRootStateType } from "app/model/store";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import React  from "react";
import { useSelector } from "react-redux";
import s from './AppBar.module.css'

export const AppBarComponent = () => {
  const status = useSelector<AppRootStateType, RequestStatusType >(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => logout();

  return (
    <AppBar position="static">
      <Toolbar style={{justifyContent: 'space-between'}}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <div className={s.menuWrapper}>
          <Typography variant="h6">Settings</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler} size="medium">
              Log out
            </Button>
          )}
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
  </AppBar>
  )
}
