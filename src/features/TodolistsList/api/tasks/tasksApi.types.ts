import { TaskPriorities, TaskStatuses } from "common/enums";
import { UpdateDomainTaskModel } from "../../model/tasks.slice";


export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModel = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type AddTaskArg = {
  title: string;
  todolistId: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModel;
  todolistId: string;
};

export type RemoveTaskArg = {
  todolistId: string;
  taskId: string;
};