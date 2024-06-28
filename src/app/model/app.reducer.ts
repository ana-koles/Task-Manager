import { createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import { authThunks } from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    selectAppStatus: (slice) => slice.status,
    selectIsInitialized: (slice) => slice.isInitialized,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending

      //.addMatcher(isPending(todolistsThunks.addTodolist, tasksThunks.addTask) - если хотим сделать addMatcher для определенных экшенов
        /* (action: UnknownAction) => {
        return action.type.endsWith('/pending')
      } */, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled
        /* (action: UnknownAction) => {
        return action.type.endsWith('/fulfilled')

      } */, (state, action) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected
        /* (action: UnknownAction) => {
        return action.type.endsWith('/rejected')
      } */, (state, action: any) => {
        state.status = 'failed';
        if (action.payload) {
            if (
              action.type === todolistsThunks.addTodolist.rejected.type ||
              action.type === tasksThunks.addTask.rejected.type ||
              action.type === authThunks.initializeApp.rejected.type
              ) {
                return; //чтобы не показывало глобальной ошибки
              }

            state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      })
      .addDefaultCase((state, action) => {

      })
  }
});

export const appReducer = slice.reducer;
export const {selectAppStatus, selectIsInitialized} = slice.selectors;
export const appActions = slice.actions;
