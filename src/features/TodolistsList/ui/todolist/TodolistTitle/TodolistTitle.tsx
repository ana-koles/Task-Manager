import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import React, { useCallback } from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, entityStatus, id } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      changeTodolistTitle({ id, title });
    },
    [id, changeTodolistTitle],
  );

  const removeTodolistCallback = () => {
    removeTodolist(id);
  };

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistCallback} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
