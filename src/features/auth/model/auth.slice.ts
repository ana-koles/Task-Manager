import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/model/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        //или
        //isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled)
        //или
        isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp)

        //или
        /* (action: UnknownAction)=>{
        if (
          action.type === "auth/login/fulfilled" ||
          action.type === "auth/logout/fulfilled" ||
          action.type === "auth/initializeApp/fulfilled"
          ){
            return true;
          } else {
            return false
          }
      } */, (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(`${slice.name}/login"`, async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(res.data);
    }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
