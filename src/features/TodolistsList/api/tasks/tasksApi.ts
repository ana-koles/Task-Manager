import { instance } from "common/api";
import { AddTaskArg, GetTasksResponse, RemoveTaskArg, TaskType, UpdateTaskModel } from "./tasksApi.types";
import { BaseResponseType } from "common/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArg) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: AddTaskArg) {
    return instance.post<
      BaseResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
}

