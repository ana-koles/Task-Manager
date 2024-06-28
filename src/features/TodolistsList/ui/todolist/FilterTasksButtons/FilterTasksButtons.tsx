import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolists.slice";
import React from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id: todolist.id });
  };
  return (
    <>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
